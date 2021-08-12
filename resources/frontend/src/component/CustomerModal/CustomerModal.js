import React, {Component} from 'react';


export default class CustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "customer": {
                "id": this.props.customer.id,
                "name": this.props.customer.name,
                "address": this.props.customer.address,
                "city": this.props.customer.city,
                "postcode": this.props.customer.postcode
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.saveAndHide = this.saveAndHide.bind(this);
    }

    onFormSubmit(event) {
        const target = event.target;
        this.setState(
            (prevState) => ({
                "customer": {
                    "id": prevState.customer.id,
                    "name": target.name.value,
                    "address": target.address.value,
                    "city": target.city.value,
                    "postcode": target.postcode.value
                }
            }),
            () => this.saveAndHide()
        )
        event.preventDefault()
    }

    saveAndHide() {
        this.props.modalToggle()
        this.props.onSave(this.state.customer)
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
                        <form onSubmit={this.onFormSubmit}>
                            <section className="modal-card-body">

                                <div className="field">
                                    <label className="label">Name</label>
                                    <p className="control has-icons-left">
                                        <input name="name" className="input"
                                               type="text" defaultValue={this.state.customer.name}/>
                                        <span className="icon is-small is-left">
                                          <i className="fas fa-user"/>
                                        </span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="label">Address</label>
                                    <p className="control has-icons-left">
                                        <input name="address" className="input"
                                               type="text" defaultValue={this.state.customer.address}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                </div>

                                <div className="field">
                                    <label className="label">City</label>
                                    <p className="control has-icons-left">
                                        <input name="city" className="input"
                                               type="text" defaultValue={this.state.customer.city}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                </div>


                                <div className="field">
                                    <label className="label">Postcode</label>
                                    <p className="control has-icons-left">
                                        <input name="postcode" className="input"
                                               type="text" defaultValue={this.state.customer.postcode}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                </div>
                            </section>
                            <footer className="modal-card-foot">
                                <button type="submit" className="button is-success">Save changes</button>
                                <button onClick={this.props.modalToggle} className="button">Cancel</button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


}
