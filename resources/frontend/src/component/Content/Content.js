import React from "react";
import {Route, Switch} from "react-router-dom";
import Goods from "../../pages/Goods/Goods";
import Invoices from "../../pages/Invoices/Invoices";
import NotFound from "../../pages/NotFound/NotFound";
import CustomersPage from "../../pages/Customers/CustomersPage";


const Content = () => {
    return (
        <div className="container has-background-link-light p-6">
            <Switch>
                <Route exact path="/customers" component={CustomersPage}/>
                <Route exact path="/goods" component={Goods}/>
                <Route exact path="/invoices" component={Invoices}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    );
};

export default Content;
