import React, {useEffect, useState} from 'react';
import "./Table.css"

//TODO spravit toto cez redux aby menil stavy len na zaklade klikov a initial state
// pretoze ak nieco spravim na goods tak sa to resetuje.
// proste snazit sa aby si to pamatalo ze podla coho ma sortovat.
const Table = ({columns, columnInternalNames, edit, children}) => {
    const [sortAsc, setSortAsc] = useState(true)
    const [rows, setRows] = useState(children)
    const sortByCol = (col, index) => {
        col = col.toLowerCase()
        if (col === "details") return
        setSortAsc(!sortAsc)

        function compare(a, b) {
            if (col.includes("price")) {
                a = parseFloat(a.props.data[columnInternalNames[index]])
                b = parseFloat(b.props.data[columnInternalNames[index]])
            } else {
                a = a.props.data[columnInternalNames[index]]
                b = b.props.data[columnInternalNames[index]]
                if (typeof a == "string") {
                    a = a.toLowerCase()
                    b = b.toLowerCase()
                }
            }
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }

        if (sortAsc) {
            setRows([...rows].sort(compare))
        } else {
            setRows([...rows].sort(compare).reverse())
        }
    }

    const sortIconDesign = () => {
        if (sortAsc) {
            return <i className="fas fa-sort-up" style={{position: "relative", top: "5px"}}/>
        }
        return <i className="fas fa-sort-down" style={{position: "relative", top: "-1px"}}/>
    }

    const columnDesign = (col) => {
        if (edit && col === "Details") {
            return <strong>{col}</strong>
        } else {
            return (
                <strong>
                    {col} {sortIconDesign()}
                </strong>
            )
        }
    }

    const listProps = columns.map(
        (col, index) => {
            return <th onClick={() => sortByCol(col, index)} key={col}>{columnDesign(col)}</th>
        }
    )
    // kedze menime z vonku props children tak musime zmenit aj interne rows, nestaci init state.
    // eqvivalent componentwillrecieveprops alebo componentwillupdate
    useEffect(() => {
        setRows([...children])
    }, [children]);


    return (
        <div className="table-container">
            <table className="table is-bordered is-striped is-hoverable is-fullwidth has-text-centered">
                <thead>
                <tr>{listProps}</tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
};

export default Table;
