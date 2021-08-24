import React, {useState} from 'react';
import Table from "../../component/Table/Table";
import DatePicker from "react-datepicker";
import SelectSearch from 'react-select-search';
import RequestService from "../../utils/request-service";

import "react-datepicker/dist/react-datepicker.css";
import "./SelectSearch.css"

const perPageCustomerResults = 3

const InvoicesCreatePage = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [selectedCustomer, setSelectedCustomer] = useState("")

    const redirectToInvoices = () => {
        history.push("/invoices")
    }

    const saveInvoice = (e) => {
        e.preventDefault()
        alert("saving shit")
        // history.push("/invoices")
    }

    const formatCustomerDetails = () => {
        if (selectedCustomer === "") return ""
        return `Name: ${selectedCustomer.name}\nAddress: ${selectedCustomer.address}\nCity: ${selectedCustomer.city}\nPostcode: ${selectedCustomer.postcode}`
    }

    const getCustomer = (value, option) => {
        setSelectedCustomer(option.obj)
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
                                onChange={getCustomer}
                                search
                                placeholder="Search by name or id"
                                emptyMessage="No customers found"
                                options={[]}
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
                        </div>
                        <div className="field">
                            <textarea readOnly value={formatCustomerDetails()} className="textarea is-link"/>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button onClick={null} className="button is-info">Add a new item</button>
                            </div>
                        </div>
                        <h3 className="subtitle is-4 mt-3">Items</h3>

                    </div>
                    <div className="column is-5">
                        <h2 className="subtitle is-3">Date of issue</h2>
                        <div className="has-text-centered">
                            <DatePicker fixedHeight inline useShortMonthInDropdown
                                        selected={startDate} onChange={(date) => setStartDate(date)}/>
                        </div>
                    </div>
                </div>
                <Table edit={false}
                       columnInternalNames={["goods_name", "goods_count", "goods_item_price", "goods_item_total_price"]}
                       columns={["Name", "Count", "Price per item", "Price total"]}>
                    {[]}
                </Table>
            </div>

            <footer className="modal-card-foot">

                <button onClick={(e) => saveInvoice(e)} className="button is-primary">
                    Create
                </button>
                <button onClick={redirectToInvoices} className="button">Back</button>
            </footer>
        </React.Fragment>
    );
};

export default InvoicesCreatePage;
