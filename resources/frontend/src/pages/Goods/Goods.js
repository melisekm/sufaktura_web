import React, {useEffect} from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import {setPaginationName} from "../../redux/slices/pagination";
import {useDispatch, useSelector} from "react-redux";
import {getGoods} from "../../redux/thunks/goodsThunks";
import {useHistory, useLocation} from "react-router-dom";
import {activateServerErrorNotification} from "../../redux/slices/app";


const emptyGoodsitem = {
    "selectedItem": {
        "category": "",
        "name": "",
        "description": "",
        "price": ""
    },
    "submitMethod": "CREATE"
}

const goodsColumns = ["ID", "Category", "Name", "Description", "Price", "Details"]


const Goods = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const goods = useSelector(state => state.goods.goods)


    useEffect(() => {
        dispatch(getGoods(location.search))
            .then(() => dispatch(setPaginationName("goods")))
            .catch(() => dispatch(activateServerErrorNotification()))
    }, [dispatch, location]);

    const openCrudPage = (payload) => {
        history.push(`/goods/${payload.selectedItem.id}`)
    }
    const openCrudCreatePage = () => {
        history.push(`/goods/create`)
    }


    const getTableItems = () => {
        return goods.map(
            (goodsItem) =>
                <TableItem key={goodsItem.id}
                           data={goodsItem}
                           tableCell={
                               [
                                   goodsItem.id,
                                   goodsItem.category,
                                   goodsItem.name,
                                   goodsItem.description,
                                   `${goodsItem.price} €`
                               ]
                           }
                           onEditClick={openCrudPage}
                />
        )
    }

    return (
        <div>
            <ContentPage title="Goods" description="Here you can find the comprehensive list of goods."
                         tableData={getTableItems(goods)}
                         tableColumns={goodsColumns}
                         toggleCreate={openCrudCreatePage}
                         emptySelectedItem={emptyGoodsitem}
            />
        </div>
    )
};

export default Goods;
