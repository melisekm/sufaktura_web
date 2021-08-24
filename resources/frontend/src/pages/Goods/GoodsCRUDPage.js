import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../../component/Spinner/Spinner";
import {createGoods, deleteGoods, getGoodsItem, updateGoods} from "../../redux/thunks/goodsThunks";
import {activateServerErrorNotification, openNotification, toggleDeleteModal} from "../../redux/slices/app";
import DeleteItemModal from "../../component/Modal/DeleteItemModal";
import InvalidPage from "../../component/Pagination/InvalidPage";
import {goodsCrudErrorsClear} from "../../redux/slices/goods";

const initialItem = {
    "name": "",
    "description": "",
    "price": "",
    "category": ""
}

const editSubmitDetails = {
    "submitMethodType": "EDIT",
    "requestMethod": updateGoods,
    "notification": {
        "text": "Item successfully edited.",
        "design": "is-primary"
    }
}

const createSubmitDetails = {
    "submitMethodType": "CREATE",
    "requestMethod": createGoods,
    "notification": {
        "text": "Item successfully created",
        "design": "is-primary"
    }
}

const GoodsCRUDPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const goodsId = useParams().id
    const errors = useSelector(state => state.goods.crudPage.errors)
    const loading = useSelector(state => state.goods.crudPage.loading)
    const isDeleteModalActive = useSelector(state => state.app.deleteModal.isActive)
    const [invalidPage, setInvalidPage] = useState(false)
    let [goodsItem, setGoodsItem] = useState(initialItem)
    const submitDetails = goodsId !== "create" ? editSubmitDetails : createSubmitDetails

    useEffect(() => {
        dispatch(goodsCrudErrorsClear())
        if (goodsId !== "create") {
            dispatch(getGoodsItem(goodsId))
                .then((data) => {
                    setGoodsItem(data)
                })
                .catch(() => setInvalidPage(true))
        }
    }, [dispatch, goodsId]);

    if (invalidPage) {
        return <InvalidPage/>
    }

    const redirectToGoods = () => {
        history.push("/goods")
    }

    const submitForm = (event) => {
        event.preventDefault()
        dispatch(submitDetails.requestMethod(goodsItem))
            .then(() => {
                redirectToGoods()
                dispatch(openNotification(submitDetails.notification))
            })
            .catch(error => {
                if (error.status === 500) {
                    dispatch(activateServerErrorNotification())
                }
            })
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setGoodsItem({...goodsItem, [name]: value});
    }

    const openDeleteModal = (event) => {
        event.preventDefault()
        dispatch(toggleDeleteModal())
    }

    let buttons
    if (loading === "loading") {
        return <Spinner isCentered={true}/>
    } else {
        buttons = {
            "confirm": <button onClick={submitForm}
                               className="button is-success">Save changes</button>
            ,
            "cancel": <button onClick={redirectToGoods} className="button">Cancel</button>,
            "delete": submitDetails.submitMethodType === "EDIT"
                ? <button onClick={(e) => openDeleteModal(e)} className="button is-danger ml-auto">
                    Delete Item</button>
                : null
        }
    }

    return (
        <React.Fragment>
            <div className="content">
                <h3 className="title is-3 is-family-code">Item Details</h3>
                <div className="box">
                    <div className="field">
                        <label className="label">Category</label>
                        <p className="control has-icons-left">
                            <input name="category"
                                   className={`input ${errors.category ? "is-danger" : ""}`}
                                   type="text" value={goodsItem.category} onChange={handleInputChange}/>
                            <span className="icon is-small is-left">
                                          <i className="fas fa-list"/>
                                        </span>
                        </p>
                        {errors.category ?
                            <p className="help is-danger">{errors.category}</p> : null}
                    </div>

                    <div className="field">
                        <label className="label">Name</label>
                        <p className="control has-icons-left">
                            <input name="name"
                                   className={`input ${errors.name ? "is-danger" : ""}`}
                                   type="text" value={goodsItem.name} onChange={handleInputChange}/>
                            <span className="icon is-small is-left">
                                        <i className="fas fa-file-signature"/>
                                    </span>
                        </p>
                        {errors.name ?
                            <p className="help is-danger">{errors.name}</p> : null}
                    </div>

                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea name="description"
                                      className={`textarea ${errors.description ? "is-danger" : ""} `}
                                      value={goodsItem.description} onChange={handleInputChange}/>
                        </div>
                        {errors.description ?
                            <p className="help is-danger">{errors.description}</p> : null}
                    </div>

                    <div className="field">
                        <label className="label">Price</label>
                        <p className="control has-icons-left">
                            <input name="price"
                                   className={`input ${errors.price ? "is-danger" : ""}`}
                                   type="text" value={goodsItem.price} onChange={handleInputChange}/>
                            <span className="icon is-small is-left">
                                        <i className="fas fa-tags"/>
                                    </span>
                        </p>
                        {errors.price ?
                            <p className="help is-danger">{errors.price}</p> : null}
                    </div>
                </div>
                <footer className="modal-card-foot">
                    {buttons.confirm}
                    {buttons.cancel}
                    {buttons.delete}
                </footer>


            </div>
            {isDeleteModalActive
                ? <DeleteItemModal deleteMethod={deleteGoods} toggleParentComponent={redirectToGoods}
                                   successNotification={{"text": "Item successfully deleted."}} itemId={goodsId}
                                   name="Item">
                    <p>
                        Are you sure you want to delete this item?
                        All data of this item will be permanently deleted. This action cannot be
                        undone.
                    </p>
                </DeleteItemModal>
                : null}
        </React.Fragment>
    );
};

export default GoodsCRUDPage;
