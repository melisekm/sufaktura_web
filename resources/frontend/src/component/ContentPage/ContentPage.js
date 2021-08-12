import React, {Component} from 'react';
import Table from "../Table/Table";
import LoadingButton from "../Button/LoadingButton";

export default class ContentPage extends Component {
    render() {
        let loadingTable
        if (this.props.isLoading) {
            loadingTable = <LoadingButton isCentered={true}/>
        } else {
            loadingTable =
                <Table columns={this.props.tableColumns}>
                    {this.props.tableData}
                </Table>
        }
        return (
            <div className="content">
                <h3 className="title is-3">{this.props.title}</h3>
                <div className="box">
                    <div className="container section">
                        <div className="columns is-vcentered">
                            <div className="column">
                                <p className="subtitle is-5">{this.props.description}</p>
                                <p className="subtitle is-6">Found {this.props.tableData.length} records</p>
                            </div>
                            <div className="column">
                                <div className="field has-addons is-pulled-right">
                                    <div className="control">
                                        <button className="button is-primary">Create...</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loadingTable}
                </div>
            </div>
        );
    }
}
