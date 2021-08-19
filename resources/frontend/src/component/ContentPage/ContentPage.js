import React from 'react';
import Table from "../Table/Table";
import LoadingButton from "../LoadingButton/LoadingButton";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";
import Notification from "../Notification/Notification";
import {closeNotification} from "../../redux/slices/app";


const getLoadingOrTable = (isLoading, tableColumns, tableData) => {
    if (isLoading === "loading") {
        return <LoadingButton isCentered={true}/>
    } else {
        return <Table columns={tableColumns}>{tableData}</Table>
    }
}

const getNotification = (isNotificationActive, notificationText, notificationDesign) => {
    if (isNotificationActive) {
        return (
            <Notification design={notificationDesign} hideNotification={closeNotification}>
                {notificationText}
            </Notification>
        )
    } else {
        return null
    }
}

const ContentPage = (props) => {
    const dispatch = useDispatch()
    const isTableLoading = useSelector(state => state.app.tableLoadingStatus)
    const isNotificationActive = useSelector(state => state.app.notification.isActive)
    const notificationText = useSelector(state => state.app.notification.text)
    const notificationDesign = useSelector(state => state.app.notification.design)
    const pagination = useSelector(state => state.pagination.pagination)
    return (
        <React.Fragment>
            {getNotification(isNotificationActive, notificationText, notificationDesign)}
            <div className="content">
                <h3 className="title is-3 is-family-code">{props.title}</h3>
                <div className="box">
                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-5 ">{props.description}</p>
                            <p className="subtitle is-6">Found {pagination ? pagination.total : ".."} records</p>
                        </div>
                        <div className="column mt-auto" style={{textAlign: "right"}}>
                            <button onClick={() => dispatch(props.toggleCreate(props.emptySelectedItem))}
                                    style={{width: "7rem"}}
                                    className="button is-primary createBtn">Create...
                            </button>
                        </div>
                    </div>
                    {getLoadingOrTable(isTableLoading, props.tableColumns, props.tableData)}
                    <Pagination/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ContentPage;
