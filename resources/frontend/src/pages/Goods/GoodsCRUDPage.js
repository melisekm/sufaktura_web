import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingButton from "../../component/LoadingButton/LoadingButton";
import {getGoods, getGoodsItem} from "../../redux/thunks/goodsThunks";
import {setPaginationName} from "../../redux/slices/pagination";
import {activateServerErrorNotification} from "../../redux/slices/app";

const initialEditPageErrors = {
    "name": false,
    "description": false,
    "price": false,
    "category": false
}

const GoodsCRUDPage = () => {
    const dispatch = useDispatch()
    const goodsId = useParams().id
    const errors = useState(initialEditPageErrors)
    const isLoading = useSelector(state => state.goods.crudPage.loading)
    // const propsItem = useSelector(state => state.goods.crudPage.selectedGoodItem)
    // let [goodsItem, setgoodsItem] = useState()
    //
    // useEffect(() => {
    //     dispatch(getGoodsItem(goodsId)).then(()=>setgoodsItem(propsItem))
    //         .catch(() => dispatch(activateServerErrorNotification()))
    // }, [dispatch, goodsId]);
    //
    // const handleInputChange = () => {
    //     console.log("lol")
    // }
    //
    // if(goodsItem === null) return null

    if (isLoading === "loading") return <LoadingButton isCentered={true}/>
    return (
        <div className="content">
            <h3 className="title is-3 is-family-code">Item Details</h3>
            <div className="box">
                <div className="field">
                    <label className="label">Category</label>
                    <p className="control has-icons-left">
                        <input name="name"
                               className={`input ${errors.category ? "is-danger" : ""}`}
                               type="text" value={goodsItem.category} onChange={handleInputChange}/>
                        <span className="icon is-small is-left">
                                          <i className="fas fa-user"/>
                                        </span>
                    </p>
                    {errors.category ?
                        <p className="help is-danger">{errors.category}</p> : null}
                </div>

                <div className="field">
                    <label className="label">Name</label>
                    <p className="control has-icons-left">
                        <input name="address"
                               className={`input ${errors.name ? "is-danger" : ""}`}
                               type="text" value={goodsItem.name} onChange={handleInputChange}/>
                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                    </p>
                    {errors.name ?
                        <p className="help is-danger">{errors.name}</p> : null}
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <p className="control has-icons-left">
                        <input name="city"
                               className={`input ${errors.description ? "is-danger" : ""}`}
                               type="text" value={goodsItem.description} onChange={handleInputChange}/>
                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                    </p>
                    {errors.description ?
                        <p className="help is-danger">{errors.description}</p> : null}
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <p className="control has-icons-left">
                        <input name="postcode"
                               className={`input ${errors.price ? "is-danger" : ""}`}
                               type="text" value={goodsItem.price} onChange={handleInputChange}/>
                        <span className="icon is-small is-left">
                                        <i className="fas fa-home"/>
                                    </span>
                    </p>
                    {errors.price ?
                        <p className="help is-danger">{errors.price}</p> : null}
                </div>
            </div>
        </div>
    );
};

export default GoodsCRUDPage;
