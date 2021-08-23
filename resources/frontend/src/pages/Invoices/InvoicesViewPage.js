import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInvoiceItem} from "../../redux/thunks/invoicesThunks";
import {useHistory, useParams} from "react-router-dom";
import Table from "../../component/Table/Table";
import TableItem from "../../component/TableItem/TableItem";
import Spinner from "../../component/Spinner/Spinner";
import InvalidPage from "../../component/Pagination/InvalidPage";


const initialInvoiceState = {
    "date_of_issue": "",
    "customer_name": "",
    "customer_address": "",
    "total_price": "",
    "items": []
}

const InvoicesViewPage = () => {
    const dispatch = useDispatch()
    const invoiceId = useParams().id
    const history = useHistory()
    const [invoice, setInvoice] = useState(initialInvoiceState)
    const [customerDetails, setCustomerDetails] = useState("")
    const loading = useSelector(state => state.app.tableLoadingStatus)
    const [invalidPage, setInvalidPage] = useState(false)

    useEffect(() => {
        dispatch(getInvoiceItem(invoiceId)).then((data) => {
            setInvoice(data)
            setCustomerDetails(`Name: ${data.customer_name}\nAddress: ${data.customer_address}\nCity: ${data.customer_city}\nPostcode: ${data.customer_postcode}`)
        }).catch(() => setInvalidPage(true))
    }, [dispatch, invoiceId]);

    if (invalidPage) {
        return <InvalidPage/>
    }

    const getGoodsAsTableItems = () => {
        return invoice.items.map(
            (item) => <TableItem key={item.id} data={item} edit={false}
                                 tableCell={[item.goods_name, item.goods_count,
                                     `${item.goods_item_price} €`, `${item.goods_item_total_price} €`]}
            />
        )
    }

    const redirectBack = () => {
        history.push("/invoices")
    }

    if (loading === "loading") {
        return <Spinner isCentered={true}/>
    }

    return (
        <div className="box">
            <h1 className="title is=2">Faktura ID {invoice.id}</h1>
            <div className="columns">
                <div className="column is-7">
                    <h2 className="subtitle is-3">Customer</h2>

                </div>
                <div className="column is-3">
                    <h2 className="subtitle is-3">Date of issue</h2>
                </div>
            </div>
            <div className="columns">
                <div className="column is-7">
                    <textarea className="textarea is-link" readOnly value={customerDetails}/>
                </div>
                <div className="column is-3">
                    {invoice.date_of_issue}
                </div>
            </div>
            <h3 className="subtitle is-4">Items</h3>
            <Table edit={false}
                   columnInternalNames={["goods_name", "goods_count", "goods_item_price", "goods_item_total_price"]}
                   columns={["Name", "Count", "Price per item", "Price total"]}>
                {getGoodsAsTableItems()}
            </Table>
            <button onClick={redirectBack} className="button">Back</button>

        </div>
    );
};

export default InvoicesViewPage;
