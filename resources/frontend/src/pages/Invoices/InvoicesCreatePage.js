import React, {useEffect, useState} from 'react';
import Table from "../../component/Table/Table";
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import RequestService from "../../utils/request-service";
import {useDispatch, useSelector} from "react-redux";
import AddItemModal from "./AddItemModal";

import "react-datepicker/dist/react-datepicker.css";
import "./SelectSearch.css"
import {clearItemsInInvoice, toggleAddItemModal} from "../../redux/slices/invoices";
import TableItem from "../../component/TableItem/TableItem";
import {createInvoice} from "../../redux/thunks/invoicesThunks";
import {useHistory} from "react-router-dom";
import {activateServerErrorNotification, openNotification} from "../../redux/slices/app";

const perPageCustomerResults = 3

const successNotification = {
    "text": "Invoice successfully created.",
    "design": "is-primary"
}

const InvoicesCreatePage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [dateOfIssue, setDateOfIssue] = useState(new Date())
    const [selectedCustomer, setSelectedCustomer] = useState("")
    const items = useSelector(state => state.invoices.newInvoice.itemsInInvoice)
    const isAddItemModalActive = useSelector(state => state.invoices.isAddItemModalActive)
    const totalPrice = useSelector(state => state.invoices.newInvoice.totalPrice)
    const errors = useSelector(state => state.invoices.newInvoice.errors)

    useEffect(() => {
        dispatch(clearItemsInInvoice())
    }, []);

    const redirectToInvoices = () => {
        history.push("/invoices")
    }

    const saveInvoice = () => {
        const invoice = {
            "date_of_issue": dateOfIssue,
            "customer_name": selectedCustomer.name,
            "customer_address": selectedCustomer.address,
            "customer_city": selectedCustomer.city,
            "customer_postcode": selectedCustomer.postcode,
            "total_price": totalPrice,
            "items": items.map((item) => {
                return {
                    "goods_name": `${item.data.category} ${item.data.name}`,
                    "goods_count": item.count,
                    "goods_item_price": item.data.price,
                    "goods_item_total_price": item.totalPrice
                }
            })
        }
        dispatch(createInvoice(invoice)).then(() => {
            history.push("/invoices")
            dispatch(openNotification(successNotification))
        }).catch((err) => {
            if (err.status === 500) {
                dispatch(activateServerErrorNotification())
            }
        })
    }

    const formatCustomerDetails = () => {
        if (selectedCustomer === "") return ""
        return `Name: ${selectedCustomer.name}\nAddress: ${selectedCustomer.address}\nCity: ${selectedCustomer.city}\nPostcode: ${selectedCustomer.postcode}`
    }

    const getCustomer = (value, option) => {
        setSelectedCustomer(option.obj)
    }

    const generateTableItems = () => {
        return items.map((item) => {
            return <TableItem key={item.data.id} edit={false} data={item}
                              tableCell={
                                  [
                                      item.data.name, item.count, parseFloat(item.data.price).toFixed(2),
                                      parseFloat(item.totalPrice).toFixed(2)
                                  ]
                              }
            />
        })
    }

    return (
        <React.Fragment>
            <div className="box">
                <h1 className="title is=2">Create a new Invoice</h1>
                <div className="columns">
                    <div className="column is-7">
                        <h2 className="subtitle is-3">Customer</h2>
                        <div className="field">
                            <SelectSearch
                                onChange={getCustomer} search placeholder="Search by name or id" options={[]}
                                emptyMessage="No customers found"
                                getOptions={(query) => {
                                    return new Promise((resolve, reject) => {
                                        RequestService.get(`/query/customers?query=${query}&limit=${perPageCustomerResults}`)
                                            .then((res) => {
                                                const result = res.data.map((customer) => ({
                                                    value: customer.id,
                                                    name: `ID:${customer.id} Name: ${customer.name}`,
                                                    obj: customer
                                                }))
                                                if (query === "") {
                                                    result.push({disabled: true, value: 0, name: "..."})
                                                }
                                                resolve(result)
                                            })
                                            .catch((err) => reject(err))
                                    })
                                }}
                            />
                            {errors.customer_name ? <p className="help is-danger">Please choose a customer</p> : null}
                        </div>
                        <div className="field">
                    <textarea placeholder="Customer details" readOnly value={formatCustomerDetails()}
                              className="textarea is-link"/>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button onClick={() => dispatch(toggleAddItemModal())}
                                        className="button is-info">Add a new item
                                </button>
                            </div>
                        </div>
                        <h3 className="subtitle is-4 mt-3">Items</h3>
                        {errors.items ? <p className="help is-danger">Please choose items</p> : null}
                        {errors.errs.length > 0 ? <p className="help is-danger">Something went wrong.</p> : null}
                    </div>
                    <div className="column is-5">
                        <h2 className="subtitle is-3">Date of issue</h2>
                        <div className="has-text-centered">
                            <DatePicker fixedHeight inline useShortMonthInDropdown
                                        selected={dateOfIssue} onChange={(date) => setDateOfIssue(date)}/>
                        </div>
                    </div>
                </div>
                <Table edit={false} columns={["Name", "Count", "Price per item", "Price total"]}
                       columnInternalNames={["goods_name", "goods_count", "goods_item_price", "goods_item_total_price"]}>
                    {generateTableItems()}
                </Table>
                <div>
                    Celkovo {totalPrice.toFixed(2)} €
                </div>
            </div>
            <footer className="modal-card-foot">
                <button onClick={saveInvoice} className="button is-primary">
                    Create
                </button>
                <button onClick={redirectToInvoices} className="button">Back</button>
            </footer>
            {isAddItemModalActive ? <AddItemModal/> : null}
        </React.Fragment>
    );
};

export default InvoicesCreatePage;
