import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import CustomerModal from "../../component/CustomerModal/CustomerModal";
import Notification from "../../component/Notification/Notification";
import RequestService from '../../utils/request-service';

export default class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.customerColumns = ["ID", "Name", "Address", "Details"]
        this.state = {
            "isEditModalActive": false,
            "isCreateModalActive": false,
            "isNotificationActive": false,
            "selectedCustomer": null,
            "customers": [],
            "isLoading": true
        }
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);
        this.updateCustomerInTable = this.updateCustomerInTable.bind(this);
    }

    componentDidMount() {
        RequestService.get("/customers").then(r => {
                this.setState({
                    "customers": r.data,
                    "isLoading": false
                })
            }
        )
    }

    toggleCreateModal() {
        this.setState({
            "isCreateModalActive": !this.state.isCreateModalActive,
            "selectedCustomer": {
                "name": "",
                "address": "",
                "city": "",
                "postcode": ""
            }
        })
    }

    toggleEditModal(rowInfo) {
        const selectedCustomer = rowInfo ? this.state.customers[rowInfo[0] - 1] : null
        this.setState({
            "isEditModalActive": !this.state.isEditModalActive,
            "selectedCustomer": selectedCustomer
        })
    }

    hideNotification() {
        this.setState({
            "isNotificationActive": false
        })
    }

    refreshPage(){
        window.location.reload()
    }

    updateCustomerInTable(updatedCustomer) {
        let customers = [...this.state.customers]
        customers[updatedCustomer.id - 1] = updatedCustomer
        this.setState({
            "customers": customers,
            "isNotificationActive": true,
            "isEditModalActive": !this.state.isEditModalActive,
        })
    }


    submitCustomer(updatedCustomer, requestMethod, onSucessMethod, sucessStatus) {
        return new Promise((resolve, reject) => {
            requestMethod("/customer", updatedCustomer)
                .then(response => {
                    if (response.status === sucessStatus) {
                        onSucessMethod(updatedCustomer)
                        resolve()
                    } else {
                        throw response.statusText
                    }
                })
                .catch(error => {
                    console.log(error)
                        if (error.response) {
                            reject(error.response)
                        } else {
                            reject(error)
                        }
                    }
                )
        })
    }

    getTableItems() {
        return this.state.customers.map(
            (customer) => <TableItem key={customer.id}
                                     data={[customer.id, customer.name, `${customer.address}, ${customer.city} ${customer.postcode}`]}
                                     modalToggle={this.toggleEditModal}/>
        )
    }

    getModalWindow(isModalActive, toggleModal, onSuccessMethod, expectedSucessStatus, requestMethod) {
        if (isModalActive) {
            return <CustomerModal isActive={isModalActive}
                                  modalToggle={toggleModal}
                                  onSave={this.submitCustomer}
                                  customer={this.state.selectedCustomer}
                                  requestMethod={requestMethod}
                                  onSuccess={onSuccessMethod}
                                  sucessStatus={expectedSucessStatus}
            />
        }
        return null
    }


    getNotification() {
        if (this.state.isNotificationActive) {
            return <Notification design="is-primary" hideNotification={this.hideNotification}>
                Sucessfuly edited customer
            </Notification>
        }
        return null
    }

    render() {
        return (
            <React.Fragment>
                {this.getNotification()}
                <ContentPage title="Customers" description="Here you can find the comprehensive list of customers."
                             tableData={this.getTableItems()}
                             tableColumns={this.customerColumns}
                             isLoading={this.state.isLoading}
                             toggleCreate={this.toggleCreateModal}
                />
                {this.getModalWindow(this.state.isEditModalActive, this.toggleEditModal, this.updateCustomerInTable, 204, RequestService.put)}
                {this.getModalWindow(this.state.isCreateModalActive, this.toggleCreateModal, this.refreshPage, 201, RequestService.post)}

            </React.Fragment>
        )
    }
}
