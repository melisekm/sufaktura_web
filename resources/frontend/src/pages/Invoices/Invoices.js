import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import {editInvoices} from "../../redux/slices/invoices";

const invoicesData = [
    ["1", "10.08.2021", "Martin Novy", "6074.78 €"],
    ["2", "11.08.2021", "Peter Stary", "5694.96 €"],
    ["3", "12.08.2021", "Ivan Vladimirovic", "9761.15 €"]
]

const Invoices = () => {
    const invoicesTableItems = invoicesData.map(
        (invoicesInfo) => <TableItem key={invoicesInfo[0]} data={invoicesInfo} tableCell={invoicesInfo}
                                     modalToggle={editInvoices}/>
    )
    return (
        <div>
            <ContentPage title="Invoices" description="Here you can find the comprehensive list of invoices."
                         tableData={invoicesTableItems}
                         tableColumns={["ID", "Date", "Customer", "Total", "Details"]}
                         toggleCreate={editInvoices}/>
        </div>
    )
};

export default Invoices;
