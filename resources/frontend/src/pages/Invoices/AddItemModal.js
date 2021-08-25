import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addItemToInvoice, toggleAddItemModal} from "../../redux/slices/invoices";
import SelectSearch from "react-select-search";
import RequestService from "../../utils/request-service";


const perPageItemsResults = 3

const AddItemModal = () => {
    const dispatch = useDispatch()
    const [selectedItem, setSelectedItem] = useState()
    const [totalPrice, setTotalPrice] = useState(0)
    const [count, setCount] = useState(1)
    const [unsetItemError, setUnsetItemError] = useState(false)

    const onConfirm = () => {
        if (selectedItem == null) {
            setUnsetItemError(true)
            return
        }
        const selectedItemInfo = {
            "data": selectedItem,
            "count": count,
            "totalPrice": parseFloat(totalPrice)
        }
        dispatch(addItemToInvoice(selectedItemInfo))
        dispatch(toggleAddItemModal())
    }

    const setItem = (value, option) => {
        const price = (option.obj.price * count)
        setSelectedItem(option.obj)
        setTotalPrice(price)
    }

    const calculateTotalPrice = (event) => {
        const input = parseInt(event.target.value)
        if (!Number.isInteger(input)) {
            event.preventDefault()
        } else {
            setCount(input)
            if (selectedItem == null) {
                setTotalPrice(0)
            } else {
                const price = (selectedItem.price * input)
                setTotalPrice(price)
            }
        }
    }

    const formatItemDetails = () => {
        if (selectedItem == null) return ""
        return `Category: ${selectedItem.category}\nName: ${selectedItem.name}\nDescription: ${selectedItem.description}\nPrice per item: ${selectedItem.price}€`
    }

    return (
        <React.Fragment>
            <div className="modal is-active ">
                <div className="modal-background"/>
                <div className="modal-card ">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            <i className="fas fa-info-circle"/> Choose item
                        </p>
                        <button onClick={() => dispatch(toggleAddItemModal())} className="delete" aria-label="close"/>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <SelectSearch
                                onChange={setItem}
                                search
                                placeholder="Search by name or id"
                                emptyMessage="No items found"
                                options={[]}
                                getOptions={(query) => {
                                    return new Promise((resolve, reject) => {
                                        RequestService.get(`/query/goods?query=${query}&limit=${perPageItemsResults}`)
                                            .then((res) => {
                                                const result = res.data.map((item) => ({
                                                    value: item.id,
                                                    name: `ID:${item.id} ${item.category} ${item.name}`,
                                                    obj: item
                                                }))
                                                if (query === "") {
                                                    result.push({disabled: true, value: 0, name: "..."})
                                                }
                                                resolve(result)
                                            })
                                            .catch((err) => reject(err))
                                    })
                                }}
                            />
                            <p className="help">Can't find your item? Try to enter it's full name.</p>
                        </div>
                        <div className="field">
                            <textarea readOnly value={formatItemDetails()} placeholder="Item description..."
                                      className="textarea is-link"/>
                        </div>
                        <div className="field">
                            <label className="label">Count</label>
                            <div className="control">
                                <input className="input"
                                       onChange={calculateTotalPrice} type="number" min="1" step="1"
                                       value={count} placeholder="Enter a number"/>
                            </div>
                            <p className="help">How many items do you need?</p>
                        </div>
                        <div>
                            Total price: <strong>{totalPrice.toFixed(2)} €</strong>
                        </div>
                        {unsetItemError ? <p className="help is-danger">Please choose an item</p> : null}
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={onConfirm} className="button is-link">Confirm</button>
                        <button onClick={() => dispatch(toggleAddItemModal())} className="button ml-auto">Cancel
                        </button>
                    </footer>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddItemModal;
