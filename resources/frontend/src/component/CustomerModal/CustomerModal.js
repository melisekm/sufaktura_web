import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {toggleModal, toggleNotification} from "../../redux/slices/customers";
import {createCustomer, updateCustomer} from "../../redux/thunks/customerThunks";

const createSubmitDetails = (customerId, modalSubmitMethodType) => {
    let submitDetails
    if (modalSubmitMethodType === "EDIT") {
        submitDetails = {
            "requestMethod": updateCustomer,
            "sucessStatus": 201,
            "id": customerId,
            "notification": {
                "text": "Customer sucessfully edited.",
                "design": "is-primary"
            }
        }
    } else if (modalSubmitMethodType === "CREATE") {
        submitDetails = {
            "requestMethod": createCustomer,
            "sucessStatus": 201,
            "notification": {
                "text": "Customer sucessfully created.",
                "design": "is-primary"
            }
        }
    }
    return submitDetails
}

const onFormSubmit = (event, dispatch, submitDetails) => {
    event.preventDefault()
    const target = event.target;

    const customer = {
        "id": submitDetails.id,
        "name": target.name.value,
        "address": target.address.value,
        "city": target.city.value,
        "postcode": target.postcode.value
    }
    if (customer.id === null) {
        delete customer.id
    }

    dispatch(submitDetails.requestMethod(customer))
        .then(() => {
            dispatch(toggleModal())
            dispatch(toggleNotification(submitDetails.notification))
        })
        .catch(error => {
            console.log("CM", error)
            if (error.data && error.status !== 500) {
                console.log("N500", error.data)
            } else {
                console.log("500", error.data)
                const notification = {
                    "text": "Internal Server Error, Try again later.",
                    "design": "is-danger",
                }
                dispatch(toggleNotification(notification))
            }
        })
}

const deleteCustomer = (event) => {
    event.preventDefault()
    console.log("del pressed")
}

const CustomerModalWindow = () => {
    const dispatch = useDispatch()
    const isModalActive = useSelector(state => state.customers.modal.isActive)
    const customer = useSelector(state => state.customers.modal.selectedCustomer)
    const modalSubmitMethodType = useSelector(state => state.customers.modal.submitMethod)
    const loading = useSelector(state => state.customers.modalLoadingStatus)
    const errors = useSelector(state => state.customers.modalErrors)
    const submitDetails = createSubmitDetails(customer.id, modalSubmitMethodType)


    const delBtn = modalSubmitMethodType === "EDIT" ?
        <button onClick={(e) => deleteCustomer(e)} className="button is-danger ml-auto">Delete Customer</button> : null
    return (
        <React.Fragment>
            <form onSubmit={(e) => onFormSubmit(e, dispatch, submitDetails)}>
                <div className={`modal ${isModalActive ? "is-active" : ""}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Customer details</p>
                            <button onClick={(e) => dispatch(toggleModal())} className="delete" aria-label="close"/>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <label className="label">Name</label>
                                <p className="control has-icons-left">
                                    <input name="name"
                                           className={`input ${errors.name ? "is-danger" : ""}`}
                                           type="text" defaultValue={customer.name}/>
                                    <span className="icon is-small is-left">
                                          <i className="fas fa-user"/>
                                        </span>
                                </p>
                                {errors.name ?
                                    <p className="help is-danger">{errors.name}</p> : null}
                            </div>

                            <div className="field">
                                <label className="label">Address</label>
                                <p className="control has-icons-left">
                                    <input name="address"
                                           className={`input ${errors.address ? "is-danger" : ""}`}
                                           type="text" defaultValue={customer.address}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                                {errors.address ?
                                    <p className="help is-danger">{errors.address}</p> : null}
                            </div>

                            <div className="field">
                                <label className="label">City</label>
                                <p className="control has-icons-left">
                                    <input name="city"
                                           className={`input ${errors.city ? "is-danger" : ""}`}
                                           type="text" defaultValue={customer.city}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                                {errors.city ?
                                    <p className="help is-danger">{errors.city}</p> : null}
                            </div>

                            <div className="field">
                                <label className="label">Postcode</label>
                                <p className="control has-icons-left">
                                    <input name="postcode"
                                           className={`input ${errors.postcode ? "is-danger" : ""}`}
                                           type="text" defaultValue={customer.postcode}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                                {errors.postcode ?
                                    <p className="help is-danger">{errors.postcode}</p> : null}
                            </div>

                        </section>
                        <footer className="modal-card-foot">
                            {
                                loading === "loading" ? <button className="button is-loading is-link">Loading</button> :
                                    <button type="submit" className="button is-success">Save changes</button>
                            }
                            <button onClick={(e) => dispatch(toggleModal())} className="button">Cancel</button>
                            {delBtn}
                        </footer>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
}

export default CustomerModalWindow;
