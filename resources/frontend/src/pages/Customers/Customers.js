import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import CustomerModal from "../../component/CustomerModal/CustomerModal";
import RequestService from '../../utils/request-service';

export default class Customers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "isModalActive": false,
            "selectedCustomer": null,
            "customers": [],
            "isLoading": true
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
    }

    saveCustomer(updatedCustomer) {
        RequestService.put("/customer", updatedCustomer).then(r => {
            if (r.status === 204) {
                let customers = [...this.state.customers]
                customers[updatedCustomer.id - 1] = updatedCustomer
                this.setState({"customers": customers})
            } else {
                // TODO
            }
        })

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
            "isModalActive": !this.state.isModalActive,
            "selectedCustomer": selectedCustomer
        })
    }

    render() {
        const customersTableItems = this.state.customers.map(
            (customer) => <TableItem key={customer.id}
                                     data={[customer.id, customer.name, `${customer.address}, ${customer.city} ${customer.postcode}`]}
                                     modalToggle={this.toggleModal}/>
        )
        let modalWindow;
        if (this.state.isModalActive) {
            modalWindow = <CustomerModal isActive={this.state.isModalActive} modalToggle={this.toggleModal}
                                         onSave={this.saveCustomer}
                                         customer={this.state.selectedCustomer}/>
        } else {
            modalWindow = null
        }
        return (
            <div>
                <ContentPage title="Customers" description="Here you can find the comprehensive list of customers."
                             tableData={customersTableItems}
                             tableColumns={["ID", "Name", "Address", "Details"]}
                             isLoading={this.state.isLoading}
                />
                {modalWindow}
            </div>
        )
    }
}
