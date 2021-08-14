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
            "isNotificationActive": false,
            "selectedCustomer": null,
            "customers": [],
            "isLoading": true
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
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

    toggleModal(rowInfo) {
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


    updateCustomer(updatedCustomer) {
        return new Promise((resolve, reject) => {
            RequestService.put("/customer", updatedCustomer)
                .then(response => {
                    console.log("s")
                    if (response.status === 204) {
                        let customers = [...this.state.customers]
                        customers[updatedCustomer.id - 1] = updatedCustomer
                        this.setState({
                            "customers": customers,
                            "isNotificationActive": true,
                            "isEditModalActive": !this.state.isEditModalActive,
                        })
                        resolve("asdf")
                    } else {
                        console.log("w")
                        throw response.statusText
                    }
                })
                .catch(error => {
                        reject(error.response.data)
                    }
                )
        })
    }

    getTableItems() {
        return this.state.customers.map(
            (customer) => <TableItem key={customer.id}
                                     data={[customer.id, customer.name, `${customer.address}, ${customer.city} ${customer.postcode}`]}
                                     modalToggle={this.toggleModal}/>
        )
    }

    getModalEditWindow() {
        if (this.state.isEditModalActive) {
            return <CustomerModal isActive={this.state.isEditModalActive} modalToggle={this.toggleModal}
                                  onSave={this.updateCustomer}
                                  customer={this.state.selectedCustomer}/>
        }
        return null
    }

    getNotification() {
        if (this.state.isNotificationActive) {
            return <Notification isCentered={true}
                                 hideNotification={this.hideNotification}>
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
                />
                {this.getModalEditWindow()}
            </React.Fragment>
        )
    }
}
