import React from "react";
import {Route, Switch} from "react-router-dom";
import Goods from "../../pages/Goods/Goods";
import Invoices from "../../pages/Invoices/Invoices";
import NotFound from "../../pages/NotFound/NotFound";
import Customers from "../../pages/Customers/Customers";
import GoodsCRUDPage from "../../pages/Goods/GoodsCRUDPage";
import Notification from "../Notification/Notification";
import {closeNotification} from "../../redux/slices/app";
import {useSelector} from "react-redux";
import InvoicesViewPage from "../../pages/Invoices/InvoicesViewPage";
import InvoicesCreatePage from "../../pages/Invoices/InvoicesCreatePage";

const Content = () => {
    const isNotificationActive = useSelector(state => state.app.notification.isActive)
    const notificationText = useSelector(state => state.app.notification.text)
    const notificationDesign = useSelector(state => state.app.notification.design)

    const getNotification = () => {
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

    return (
        <div className="container has-background-white-ter p-6">
            {getNotification(isNotificationActive, notificationText, notificationDesign)}
            <Switch>
                <Route exact path="/customers" component={Customers}/>
                <Route exact path="/goods" component={Goods}/>
                <Route exact path="/goods/:id" component={GoodsCRUDPage}/>
                <Route exact path="/goods/create" component={GoodsCRUDPage}/>
                <Route exact path="/invoices" component={Invoices}/>
                <Route exact path="/invoices/create" component={InvoicesCreatePage}/>
                <Route exact path="/invoices/:id" component={InvoicesViewPage}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
};

export default Content;
