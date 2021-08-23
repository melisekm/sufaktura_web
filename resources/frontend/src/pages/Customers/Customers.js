import React, {useEffect} from 'react';
import ContentPage from "../../component/ContentPage/ContentPage";
import {useDispatch, useSelector} from "react-redux";
import {getCustomers} from "../../redux/thunks/customerThunks";
import TableItem from "../../component/TableItem/TableItem";
import {toggleModal} from "../../redux/slices/customers";
import CustomerModal from "./CustomerModal";
import {useLocation} from "react-router-dom";
import {setPaginationName} from "../../redux/slices/pagination";
import {activateServerErrorNotification} from "../../redux/slices/app";


const emptyCustomer = {
    "selectedItem": {
        "name": "",
        "address": "",
        "city": "",
        "postcode": ""
    },
    "submitMethod": "CREATE"
}
const customerColumns = ["ID", "Name", "Address", "Details"]


const CustomersPage = () => {
    const dispatch = useDispatch()
    const customers = useSelector(state => state.customers.customers)
    const isModalActive = useSelector(state => state.customers.modal.isActive)
    const location = useLocation()

    useEffect(() => {
        dispatch(getCustomers(location.search))
            .then(() => dispatch(setPaginationName("customers")))
            .catch(() => dispatch(activateServerErrorNotification()))
    }, [dispatch, location]);

    const toggleCustomersModal = (payload) => {
        dispatch(toggleModal(payload))
    }

    const getTableItems = () => {
        return customers.map(
            (customer) =>
                <TableItem key={customer.id} edit
                           data={customer}
                           tableCell={
                               [
                                   customer.id,
                                   customer.name,
                                   `${customer.address}, ${customer.city} ${customer.postcode}`
                               ]
                           }
                           onEditClick={toggleCustomersModal}
                />
        )
    }


    return (
        <div>
            <ContentPage title="Customers" description="Here you can find the comprehensive list of customers."
                         tableData={getTableItems(customers)}
                         tableColumns={customerColumns}
                         toggleCreate={toggleCustomersModal}
                         emptySelectedItem={emptyCustomer}
                         columnInternalNames={["id","name","address"]}
            />
            {isModalActive ? <CustomerModal/> : null}
        </div>
    );
};

export default CustomersPage;
