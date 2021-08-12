import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";

export default class Invoices extends React.Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
    }

    invoicesData = [
        ["1", "10.08.2021", "Martin Novy", "6074.78 €"],
        ["2", "11.08.2021", "Peter Stary", "5694.96 €"],
        ["3", "12.08.2021", "Ivan Vladimirovic", "9761.15 €"]
    ]

    toggleModal(rowInfo) {

    }

    render() {
        const invoicesTableItems = this.invoicesData.map(
            (invoicesInfo) => <TableItem key={invoicesInfo[0]} data={invoicesInfo} modalToggle={this.toggleModal}/>
        )
        return (
            <div>
                <ContentPage title="Invoices" description="Here you can find the comprehensive list of invoices."
                             tableData={invoicesTableItems}
                             tableColumns={["ID", "Date", "Customer", "Total", "Details"]}/>
            </div>
        )
    }
}
