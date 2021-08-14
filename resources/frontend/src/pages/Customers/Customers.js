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
            "notification": {
                "active": false,
            },
            "selectedCustomer": null,
            "customers": [],
            "isLoading": true
        }
        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleCreateModal = this.toggleCreateModal.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);
        this.updateCustomerInTable = this.updateCustomerInTable.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
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
            "notification": {
                "active":false
            }
        })
    }

    refreshPage(newCustomer) {
        this.setState(prevState => ({
            "customers": [...prevState.customers, newCustomer],
            "notification": {
                "active": true,
                "text": "Sucessfully created new customer."
            },
            "isCreateModalActive": !prevState.isCreateModalActive,
        }))
    }

    updateCustomerInTable(updatedCustomer) {
        let customers = [...this.state.customers]
        customers[updatedCustomer.id - 1] = updatedCustomer
        this.setState({
            "customers": customers,
            "notification": {
                "active": true,
                "text": "Sucessfuly edited customer."
            },
            "isEditModalActive": !this.state.isEditModalActive,
        })
    }


    submitCustomer(customer, requestMethod, onSucessMethod, sucessStatus) {
        return new Promise((resolve, reject) => {
            requestMethod("/customer", customer)
                .then(response => {
                    if (response.status === sucessStatus) {
                        onSucessMethod(response.data)
                        resolve()
                    } else {
                        throw response.statusText
                    }
                })
                .catch(error => {
                        console.log(error)
                        console.log(error.response)
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
        if (this.state.notification.active) {
            return <Notification design="is-primary" hideNotification={this.hideNotification}>
                {this.state.notification.text}
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
                {this.getModalWindow(this.state.isEditModalActive, this.toggleEditModal, this.updateCustomerInTable, 201, RequestService.put)}
                {this.getModalWindow(this.state.isCreateModalActive, this.toggleCreateModal, this.refreshPage, 201, RequestService.post)}

            </React.Fragment>
        )
    }
}
