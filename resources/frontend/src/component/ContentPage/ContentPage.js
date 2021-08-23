import React from 'react';
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import {useSelector} from "react-redux";
import Pagination from "../Pagination/Pagination";


const getLoadingOrTable = (isLoading, tableColumns, tableData, columnInternalNames) => {
    if (isLoading === "loading") {
        return <Spinner isCentered={true}/>
    } else {
        return <Table columnInternalNames={columnInternalNames} edit columns={tableColumns}>{tableData}</Table>
    }
}

const ContentPage = ({
                         title,
                         description,
                         toggleCreate,
                         emptySelectedItem,
                         tableColumns,
                         tableData,
                         columnInternalNames
                     }) => {
    const isTableLoading = useSelector(state => state.app.tableLoadingStatus)
    const pagination = useSelector(state => state.pagination.pagination)

    return (
        <React.Fragment>
            <div className="content">
                <h3 className="title is-3 is-family-code">{title}</h3>
                <div className="box">
                    <div className="columns">
                        <div className="column">
                            <p className="subtitle is-5 ">{description}</p>
                            <p className="subtitle is-6">Found {pagination ? pagination.total : ".."} records</p>
                        </div>
                        <div className="column mt-auto" style={{textAlign: "right"}}>
                            <button onClick={() => toggleCreate(emptySelectedItem)}
                                    style={{width: "7rem"}}
                                    className="button is-primary createBtn">Create...
                            </button>
                        </div>
                    </div>
                    {getLoadingOrTable(isTableLoading, tableColumns, tableData, columnInternalNames)}
                    <Pagination/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ContentPage;
