import React, {useEffect} from 'react';
import ContentPage from "../../component/ContentPage/ContentPage";
import {useDispatch, useSelector} from "react-redux";
import {getCustomers} from "../../redux/thunks/customers-thunks";
import TableItem from "../../component/TableItem/TableItem";
import {toggleModal, closeNotification} from "../../redux/slices/customers";
import CustomerModal from "../../component/CustomerModal/CustomerModal";
import Notification from "../../component/Notification/Notification";

const getTableItems = (customers, modalToggleFunc) => {
    return customers.map(
        (customer) => <TableItem key={customer.id}
                                 data={customer}
                                 tableCell={[customer.id, customer.name, `${customer.address}, ${customer.city} ${customer.postcode}`]}
                                 modalToggle={toggleModal}
        />
    )
}

const getModalWindow = (isModalActive) => {
    if (isModalActive) {
        return <CustomerModal/>
    }
    return null
}


const emptyCustomer = {
    "selectedCustomer": {
        "name": "",
        "address": "",
        "city": "",
        "postcode": ""
    },
    "submitMethod": "CREATE"
}
const customerColumns = ["ID", "Name", "Address", "Details"]

const getNotification = (isNotificationActive, notificationText, notificationDesign) => {
    if (isNotificationActive) {
        return <Notification design={notificationDesign} hideNotification={closeNotification}>
            {notificationText}
        </Notification>
    } else {
        return null
    }
}

const CustomersPage = () => {
    const dispatch = useDispatch()
    const isTableLoading = useSelector(state => state.customers.tableLoadingStatus)
    const customers = useSelector(state => state.customers.customers)
    const isModalActive = useSelector(state => state.customers.isModalActive)
    const isNotificationActive = useSelector(state => state.customers.isNotificationActive)
    const notificationText = useSelector(state => state.customers.notificationText)
    const notificationDesign = useSelector(state => state.customers.notificationDesign)


    useEffect(() => {
        dispatch(getCustomers())
    }, [dispatch]);


    return (
        <div>
            {getNotification(isNotificationActive, notificationText, notificationDesign)}
            <ContentPage title="Customers" description="Here you can find the comprehensive list of customers."
                         tableData={getTableItems(customers)}
                         tableColumns={customerColumns}
                         isLoading={isTableLoading}
                         toggleCreate={toggleModal}
                         emptyModalWindow={emptyCustomer}
            />
            {getModalWindow(isModalActive)}
        </div>
    );
};

export default CustomersPage;
