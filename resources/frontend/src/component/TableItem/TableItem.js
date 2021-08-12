import React, {Component} from 'react';
// import "../Table/Table.css"

export default class TableItem extends Component {
    render() {
        const listProps = this.props.data.map((prop, index) =>
            <td key={index}>{prop}</td>
        );
        return (
            <React.Fragment>
                <tr>
                    {listProps}
                    <td>
                        <button onClick={(e)=>this.props.modalToggle(this.props.data)} className="button is-small is-text">
                            <p><i className="fas fa-edit"/></p>
                        </button>
                    </td>
                </tr>

            </React.Fragment>
        );
    }
}