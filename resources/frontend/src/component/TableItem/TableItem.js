import React from 'react';

const truncate = (str, n) => (str.length > n) ? str.substr(0, n - 1) + '...' : str;

const getDataCells = (data) => {
    let listProps = []
    for (const key in data) {
        listProps.push(
            <td key={key}>{truncate(data[key], 35)}</td>
        )
    }
    return listProps
}

const TableItem = ({data, tableCell, onEditClick, edit}) => {
    const dataRef = data
    return (
        <tr>
            {getDataCells(tableCell)}
            {edit ?
                <td>

                    <button onClick={() => onEditClick({
                        "selectedItem": dataRef,
                        "submitMethod": "EDIT"
                    })}
                            className="button is-small is-text">
                        <p><i className="fas fa-edit"/></p>
                    </button>
                </td>
                : null
            }
        </tr>
    );
};

export default TableItem;
