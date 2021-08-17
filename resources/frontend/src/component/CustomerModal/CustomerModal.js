import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    toggleModal,
    openNotification,
    activateServerErrorNotification,
    toggleDeleteModal
} from "../../redux/slices/customers";
import {createCustomer, updateCustomer} from "../../redux/thunks/customerThunks";
import DeleteCustomerModal from "./DeleteCustomerModal";

const updateCustomerSubmitDetails = {
    "requestMethod": updateCustomer,
    "sucessStatus": 201,
    "notification": {
        "text": "Customer sucessfully edited.",
        "design": "is-primary"
    }
}

const createCustomerSubmitDetails = {
    "requestMethod": createCustomer,
    "sucessStatus": 201,
    "notification": {
        "text": "Customer sucessfully created.",
        "design": "is-primary"
    }
}

const createSubmitDetails = (customerId, modalSubmitMethodType) => {
    if (modalSubmitMethodType === "EDIT") {
        updateCustomerSubmitDetails.id = customerId
        return updateCustomerSubmitDetails
    } else if (modalSubmitMethodType === "CREATE") {
        return createCustomerSubmitDetails
    }
}

const submitForm = (event, dispatch, submitDetails, customer) => {
    event.preventDefault()
    if (customer.id === null) {
        delete customer.id
    }
    dispatch(submitDetails.requestMethod(customer))
        .then(() => {
            dispatch(toggleModal())
            dispatch(openNotification(submitDetails.notification))
        })
        .catch(error => {
            console.log("CM", error)
            if (error.data && error.status !== 500) {
                console.log("N500", error.data)
            } else {
                console.log("500", error.data)
                dispatch(activateServerErrorNotification())
            }
        })
}


const CustomerModalWindow = () => {
    const dispatch = useDispatch()
    const propsCustomer = useSelector(state => state.customers.modal.selectedCustomer)
    let [customer, setCustomer] = useState(propsCustomer)
    const modalSubmitMethodType = useSelector(state => state.customers.modal.submitMethod)
    const loading = useSelector(state => state.customers.modalLoadingStatus)
    const errors = useSelector(state => state.customers.modalErrors)
    const isDeleteModalActive = useSelector(state => state.customers.deleteModal.isActive)
    const submitDetails = createSubmitDetails(propsCustomer.id, modalSubmitMethodType)


    const closeModal = (event) => {
        event.preventDefault()
        dispatch(toggleModal())
    }

    const openDeleteModal = (event) => {
        event.preventDefault()
        dispatch(toggleDeleteModal())
    }

    const handleInputChange = (event) => {
        let target = event.target
        let value = target.value
        let name = target.name
        setCustomer(
            {
                ...customer,
                [name]: value,
            }
        )
    }

    let buttons
    if (loading === "loading") {
        buttons = {
            "close": <button className="delete is-disabled" aria-label="close"/>,
            "cancel": <button className="button is-disabled">Cancel</button>,
            "confirm": <button className="button is-loading is-link">Loading</button>,
            "delete": modalSubmitMethodType === "EDIT" ?
                <button className="button is-danger is-disabled ml-auto">Delete Customer</button> : null
        }
    } else {
        buttons = {
            "close": <button onClick={closeModal} className="delete" aria-label="close"/>,
            "cancel": <button onClick={closeModal} className="button">Cancel</button>,
            "confirm": <button onClick={(e) => submitForm(e, dispatch, submitDetails, customer)}
                               className="button is-success">Save changes</button>
            ,
            "delete": modalSubmitMethodType === "EDIT" ?
                <button onClick={(e) => openDeleteModal(e)} className="button is-danger ml-auto">Delete
                    Customer</button> : null,
        }
    }


    return (
        <React.Fragment>
            <div className={`modal is-active`}>
                <div className="modal-background"/>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Customer details</p>
                        {buttons.close}
                    </header>
                    <section className="modal-card-body">

                        <div className="field">
                            <label className="label">Name</label>
                            <p className="control has-icons-left">
                                <input name="name"
                                       className={`input ${errors.name ? "is-danger" : ""}`}
                                       type="text" value={customer.name} onChange={handleInputChange}/>
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
                                       type="text" value={customer.address} onChange={handleInputChange}/>
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
                                       type="text" value={customer.city} onChange={handleInputChange}/>
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
                                       type="text" value={customer.postcode} onChange={handleInputChange}/>
                                <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                            </p>
                            {errors.postcode ?
                                <p className="help is-danger">{errors.postcode}</p> : null}
                        </div>

                    </section>
                    <footer className="modal-card-foot">
                        {buttons.confirm}
                        {buttons.cancel}
                        {buttons.delete}
                    </footer>
                </div>
            </div>
            {isDeleteModalActive ? <DeleteCustomerModal/> : null}
        </React.Fragment>
    );
}

export default CustomerModalWindow;
