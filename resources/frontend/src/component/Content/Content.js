import React from "react";
import {Route, Switch} from "react-router-dom";

import Customers from "../../pages/Customers/Customers";
import Goods from "../../pages/Goods/Goods";
import Invoices from "../../pages/Invoices/Invoices";
import NotFound from "../../pages/NotFound/NotFound";

export default class Content extends React.Component {
    render() {
        return (
            <div className="container has-background-link-light p-6">
                <Switch>
                    <Route exact path="/customers" component={Customers}/>
                    <Route exact path="/goods" component={Goods}/>
                    <Route exact path="/invoices" component={Invoices}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}
