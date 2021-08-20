import React, {useEffect, useState} from 'react';
import "./Table.css"

//TODO spravit toto cez redux aby menil stavy len na zaklade klikov a initial state
// pretoze ak nieco spravim na goods tak sa to resetuje.
// proste snazit sa aby si to pamatalo ze podla coho ma sortovat.
const Table = (props) => {
    const [sortAsc, setSortAsc] = useState(true)
    const [rows, setRows] = useState(props.children)
    const sortByCol = (event) => {
        setSortAsc(!sortAsc)
        const col = event.toLowerCase()

        function compare(a, b) {
            if (col === "price") {
                a = parseFloat(a.props.data.price)
                b = parseFloat(b.props.data.price)
            } else {
                a = a.props.data[col]
                b = b.props.data[col]
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

    const columnDesign = (prop) => {
        if (prop === "Details") {
            return <strong>{prop}</strong>
        } else {
            return (
                <button className="btn" onClick={() => sortByCol(prop)} type="button">
                    <strong>
                        {prop} {sortIconDesign()}
                    </strong>
                </button>
            )
        }
    }

    const listProps = props.columns.map(
        (prop) => {
            return <th key={prop}>{columnDesign(prop)}</th>
        }
    )
    // kedze menime z vonku props children tak musime zmenit aj interne rows, nestaci init state.
    // eqvivalent componentwillrecieveprops alebo componentwillupdate
    useEffect(() => {
        setRows([...props.children])
    }, [props.children]);


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
