import React, {Component} from 'react';

export default class TableItem extends Component {

    getDataCells() {
        let listProps = []
        for (const key in this.props.data) { // this.props.data je object
            const value = this.props.data[key]  // ktory ma "key" value preto nemozme iterovat cez map
            listProps.push(
                <td key={value}>{value}</td>
            )
        }
        return listProps
    }

    render() {
        return (
            <tr>
                {this.getDataCells()}
                <td>
                    <button onClick={(e) => this.props.modalToggle(this.props.data)}
                            className="button is-small is-text">
                        <p><i className="fas fa-edit"/></p>
                    </button>
                </td>
            </tr>
        );
    }
}
