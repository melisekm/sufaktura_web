import React from 'react';
import {
    activateServerErrorNotification,
    openNotification,
    toggleDeleteModal,
    toggleModal
} from "../../redux/slices/customers";
import {useDispatch, useSelector} from "react-redux";
import {deleteCustomer} from "../../redux/thunks/customerThunks";

const successNotification = {
    "text": "Customer sucessfully deleted.",
    "design": "is-primary"
}

const onConfirm = (id, dispatch) => {
    dispatch(deleteCustomer(id)).then(() => {
        dispatch(toggleDeleteModal())
        dispatch(toggleModal())
        dispatch(openNotification(successNotification))
    }).catch(() => {
        dispatch(activateServerErrorNotification())
    })
}

const DeleteCustomerModal = () => {
    const dispatch = useDispatch()
    const customerId = useSelector(state => state.customers.modal.selectedCustomer.id)
    const loading = useSelector(state => state.customers.modalLoadingStatus)

    let buttons
    if (loading === "loading") {
        buttons = {
            "close": <button className="delete is-disabled" aria-label="close"/>,
            "cancel": <button className="button ml-auto is-disabled">Cancel</button>,
            "confirm": <button className="button is-loading is-link">Loading</button>
        }
    } else {
        buttons = {
            "close": <button onClick={() => dispatch(toggleDeleteModal())} className="delete" aria-label="close"/>,
            "cancel": <button onClick={() => dispatch(toggleDeleteModal())} className="button ml-auto">Cancel</button>,
            "confirm": <button onClick={() => onConfirm(customerId, dispatch)}
                               className="button is-danger">Confirm</button>
        }
    }

    return (
        <React.Fragment>
            <div className="modal is-active ">
                <div className="modal-background"/>
                <div className="modal-card ">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <i className="fas fa-exclamation-triangle has-text-danger"/> Delete customer
                        </p>
                        {buttons.close}
                    </header>
                    <section className="modal-card-body">
                        <p>
                            Are you sure you want to delete this customer?
                            All of this customer's data will be permanently removed. This action cannot be
                            undone.
                        </p>
                    </section>
                    <footer className="modal-card-foot">
                        {buttons.confirm}
                        {buttons.cancel}
                    </footer>
                </div>
            </div>
        </React.Fragment>
    )
};

export default DeleteCustomerModal;
