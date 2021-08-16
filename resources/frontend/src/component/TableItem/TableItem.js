import React from 'react';
import {useDispatch} from "react-redux";

const getDataCells = (data) => {
    let listProps = []
    for (const key in data) { // this.props.data je object
        const value = data[key]  // ktory ma "key" value preto nemozme iterovat cez map
        listProps.push(
            <td key={value}>{value}</td>
        )
    }
    return listProps
}

const TableItem = (props) => {
    const dispatch = useDispatch()
    const dataRef = props.data
    return (
        <tr>
            {getDataCells(props.tableCell)}
            <td>
                <button onClick={(e) => dispatch(props.modalToggle({
                    "selectedItem": dataRef,
                    "submitMethod": "EDIT"
                }))}
                        className="button is-small is-text">
                    <p><i className="fas fa-edit"/></p>
                </button>
            </td>
        </tr>
    );
};

export default TableItem;
