import React, {Component} from 'react';
import Notification from "../Notification/Notification";


export default class CustomerModalWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "errors": {
                "name": false,
                "address": false,
                "city": false,
                "postcode": false
            },
            "isNotificationActive": false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.hideNotification = this.hideNotification.bind(this);
    }

    async onFormSubmit(event) {
        event.preventDefault()

        const target = event.target;
        const customer = {
            "id": this.props.customer.id,
            "name": target.name.value,
            "address": target.address.value,
            "city": target.city.value,
            "postcode": target.postcode.value
        }
        await this.props.onSave(customer, this.props.requestMethod, this.props.onSuccess, this.props.sucessStatus).then(() => {
            this.props.toggleEditModal(customer.id)
            console.log("toggle")

        }).catch(error => {
            if (error.data && error.status !== 500) {
                error = error.data
                this.setState({
                    "errors": {
                        "name": error.name,
                        "address": error.address,
                        "city": error.city,
                        "postcode": error.postcode
                    }
                })
            } else {
                this.setState({
                    "isNotificationActive": true
                })
            }
        })
    }

    hideNotification() {
        this.setState({
            "isNotificationActive": false
        })
    }

    getNotification() {
        if (this.state.isNotificationActive) {
            return <Notification design="is-danger"
                                 hideNotification={this.hideNotification}>
                <b>INTERNAL SERVER ERROR, TRY AGAIN LATER</b>
            </Notification>
        }
        return null
    }

    render() {
        const delBtn = this.props.hasDeleteBtn ?
            <button className="button is-danger ml-auto">Delete Customer</button> : null
        return (
            <React.Fragment>
                <form onSubmit={this.onFormSubmit}>
                    <div className={`modal ${this.props.isActive ? "is-active" : ""}`}>
                        {this.getNotification()}
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
                                        <input name="name"
                                               className={`input ${this.state.errors.name ? "is-danger" : ""}`}
                                               type="text" defaultValue={this.props.customer.name}/>
                                        <span className="icon is-small is-left">
                                          <i className="fas fa-user"/>
                                        </span>
                                    </p>
                                    {this.state.errors.name ?
                                        <p className="help is-danger">{this.state.errors.name}</p> : null}
                                </div>

                                <div className="field">
                                    <label className="label">Address</label>
                                    <p className="control has-icons-left">
                                        <input name="address"
                                               className={`input ${this.state.errors.address ? "is-danger" : ""}`}
                                               type="text" defaultValue={this.props.customer.address}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                    {this.state.errors.address ?
                                        <p className="help is-danger">{this.state.errors.address}</p> : null}
                                </div>

                                <div className="field">
                                    <label className="label">City</label>
                                    <p className="control has-icons-left">
                                        <input name="city"
                                               className={`input ${this.state.errors.city ? "is-danger" : ""}`}
                                               type="text" defaultValue={this.props.customer.city}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                    {this.state.errors.city ?
                                        <p className="help is-danger">{this.state.errors.city}</p> : null}
                                </div>

                                <div className="field">
                                    <label className="label">Postcode</label>
                                    <p className="control has-icons-left">
                                        <input name="postcode"
                                               className={`input ${this.state.errors.postcode ? "is-danger" : ""}`}
                                               type="text" defaultValue={this.props.customer.postcode}/>
                                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                                    </p>
                                    {this.state.errors.postcode ?
                                        <p className="help is-danger">{this.state.errors.postcode}</p> : null}
                                </div>

                            </section>
                            <footer className="modal-card-foot">
                                <button type="submit" className="button is-success">Save changes</button>
                                <button onClick={this.props.modalToggle} className="button">Cancel</button>
                                {delBtn}
                            </footer>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

