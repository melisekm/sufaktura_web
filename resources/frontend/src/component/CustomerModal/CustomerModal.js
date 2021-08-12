import React, {Component} from 'react';


export default class CustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "name": this.props.selectedCustomer.name,
            "address": this.props.selectedCustomer.address
        }
    }

    render() {
        return (
            <div>
                <div className={`modal ${this.props.isActive ? "is-active" : ""}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Customer details</p>
                            <button onClick={this.props.modalToggle} className="delete" aria-label="close"/>
                        </header>
                        <section className="modal-card-body">

                            <div className="field">
                                <label className="label">Name</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="text" defaultValue={this.state.name}/>
                                    <span className="icon is-small is-left">
                                          <i className="fas fa-user"/>
                                        </span>
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">Address</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="text" defaultValue={this.state.address}/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                            </div>

                            <div className="field">
                                <label className="label">City</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="text" defaultValue="Nové Zámky"/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                            </div>


                            <div className="field">
                                <label className="label">Postcode</label>
                                <p className="control has-icons-left">
                                    <input className="input" type="text" defaultValue="94002"/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                </p>
                            </div>

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success">Save changes</button>
                            <button onClick={this.props.modalToggle} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}