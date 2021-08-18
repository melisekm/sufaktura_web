import React from 'react';
import Table from "../Table/Table";
import LoadingButton from "../Button/LoadingButton";
import {useDispatch} from "react-redux";
import Pagination from "../Pagination/Pagination";


const getLoadingOrTable = (isLoading, tableColumns, tableData) => {
    if (isLoading === "loading") {
        return <LoadingButton isCentered={true}/>
    } else {
        return <Table columns={tableColumns}>{tableData}</Table>
    }
};

const ContentPage = (props) => {
    const dispatch = useDispatch()
    return (
        <div className="content">
            <h3 className="title is-3">{props.title}</h3>
            <div className="box">
                <div className="container section">
                    <div className="columns is-vcentered">
                        <div className="column">
                            <p className="subtitle is-5">{props.description}</p>
                            <p className="subtitle is-6">Found {props.tableData.length} records</p>
                        </div>
                        <button onClick={(e) => dispatch(props.toggleCreate(props.emptyModalWindow))}
                                className="button is-primary ml-auto">Create...
                        </button>
                    </div>
                </div>
                {getLoadingOrTable(props.isLoading, props.tableColumns, props.tableData)}
                <Pagination method={props.paginationMethod}/>
            </div>
        </div>
    );
};

export default ContentPage;
