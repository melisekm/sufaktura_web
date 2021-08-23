import React, {useEffect} from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import {setPaginationName} from "../../redux/slices/pagination";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {getInvoices} from "../../redux/thunks/invoicesThunks";
import {activateServerErrorNotification} from "../../redux/slices/app";


const invoicesColumns = ["ID", "Date", "Customer", "Total", "Details"]

const Invoices = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const invoices = useSelector(state => state.invoices.invoices)

    useEffect(() => {
        dispatch(getInvoices(location.search))
            .then(() => dispatch(setPaginationName("invoices")))
            .catch(() => dispatch(activateServerErrorNotification()))
    }, [dispatch, location])

    const openCreatePage = () => {
        history.push("invoices/create")
    }

    const openInfoPage = (payload) => {
        history.push(`invoices/${payload.selectedItem.id}`)
    }

    const getTableItems = () => {
        return invoices.map(
            (invoice) => <TableItem key={invoice.id} data={invoice} edit
                                    tableCell={[invoice.id, invoice.date_of_issue, invoice.customer_name, `${invoice.total_price} €`]}
                                    onEditClick={openInfoPage}/>
        )
    }

    return (
        <div>
            <ContentPage title="Invoices" description="Here you can find the comprehensive list of invoices."
                         tableData={getTableItems(invoices)}
                         tableColumns={invoicesColumns}
                         toggleCreate={openCreatePage}
                         columnInternalNames={["id","date_of_issue","customer_name","total_price"]}
            />
        </div>
    )
};

export default Invoices;
