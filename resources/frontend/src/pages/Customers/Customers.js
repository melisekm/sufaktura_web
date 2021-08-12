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
            "selectedCustomer": null
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        RequestService.get("/customers").then(r => {
                this.setState({
                    "dog": r.data
                })
                console.log(this.state.dog)
            }
        )
    }


    toggleModal(rowInfo) {
        this.setState({
            "isModalActive": !this.state.isModalActive,
            "selectedCustomer": {
                "name": rowInfo[1],
                "address": rowInfo[2],
            }
        })
    }

    customersData = [
        ["1", "Martin Novy", "Ilkovska 2, Bratislava 137 02"],
        ["2", "Peter Stary", "B.Nemcovej 10, Kosice 854 42"],
        ["3", "Ivan Vladimirovic", "Ruska 9, Moskva 201 02"]
    ]


    render() {
        const customersTableItems = this.customersData.map(
            (customerInfo, index) => <TableItem key={customerInfo[0]} data={customerInfo}
                                                modalToggle={this.toggleModal}/>
        )
        let modalWindow;
        if (this.state.isModalActive) {
            modalWindow = <CustomerModal isActive={this.state.isModalActive} modalToggle={this.toggleModal}
                                         selectedCustomer={this.state.selectedCustomer}/>
        } else {
            modalWindow = null
        }
        return (
            <div>
                <ContentPage title="Customers" description="Here you can find the comprehensive list of customers."
                             tableData={customersTableItems}
                             tableColumns={["ID", "Name", "Address", "Details"]}
                />
                {modalWindow}
            </div>
        )
    }
}