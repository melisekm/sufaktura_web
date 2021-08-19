import React from 'react';

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
    const dataRef = props.data
    return (
        <tr>
            {getDataCells(props.tableCell)}
            <td>
                <button onClick={() => props.onEditClick({
                    "selectedItem": dataRef,
                    "submitMethod": "EDIT"
                })}
                        className="button is-small is-text">
                    <p><i className="fas fa-edit"/></p>
                </button>
            </td>
        </tr>
    );
};

export default TableItem;
