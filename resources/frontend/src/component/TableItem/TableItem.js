import React, {Component} from 'react';

export default class TableItem extends Component {

    componentDidUpdate(prevProps){
        if(this.props !== prevProps){

        }
    }

    render() {
        let listProps = []
        for(const key in this.props.data){
            const value = this.props.data[key]
            listProps.push(
                <td key={value}>{value}</td>
            )
        }
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
