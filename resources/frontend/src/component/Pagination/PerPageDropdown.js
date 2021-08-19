import React, {useState} from 'react';
import {Link} from "react-router-dom";
import onClickOutside from 'react-onclickoutside'


const perPageVals = [5, 10, 25, 100]

function PerPageDropdown({first}) {
    const [isDropdownActive, setDropDownActive] = useState(false)
    const [perPage, setPerPage] = useState([false, true, false, false])
    PerPageDropdown.handleClickOutside = () => setDropDownActive(false);

    const changePerPage = (num) => {
        let temp = Array(4).fill(false)
        temp[num] = true
        setDropDownActive(false)
        setPerPage(temp)
    }

    const getDropdownLinks = () => {
        return perPageVals.map(
            (value, index) =>
                <Link key={index} onClick={() => changePerPage(index)}
                      to={{search: `${first}&per_page=${value}`}}
                      className={`dropdown-item ${perPage[index] ? "is-active" : ""}`}>
                    {value}
                </Link>
        )
    }


    return (
        <div className="columns is-fullhd">
            <div className="column" style={{textAlign: "right"}}>
                <div className={`dropdown ${isDropdownActive ? "is-active" : ""}`}>
                    <div className="dropdown-trigger">
                        <button onClick={() => setDropDownActive(!isDropdownActive)} className="button dropdownBtn"
                                aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Per Page</span>
                            <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"/>
                        </span>
                        </button>
                    </div>
                    <div className="dropdown-menu has-text-centered " id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            {getDropdownLinks()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => PerPageDropdown.handleClickOutside
};

export default onClickOutside(PerPageDropdown, clickOutsideConfig);
