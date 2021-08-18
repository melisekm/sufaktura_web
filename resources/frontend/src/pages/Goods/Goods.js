import React, {useEffect} from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import {editGoods} from "../../redux/slices/goods";
import {setPaginationName} from "../../redux/slices/pagination";
import {useDispatch} from "react-redux";

const goodsData = [
    ["1", "CPU FX-6300", "Procesor", "111.15 €"],
    ["2", "RAM 4GB", "Random Access Memory", "25.15 €"],
    ["3", "GPU 7790HD", "Graficka na hranie", "99.69 €"]
]


const Goods = () => {
    const dispatch = useDispatch()

    const goodsTableItems = goodsData.map(
        (goodsInfo) => <TableItem key={goodsInfo[0]} data={goodsInfo} tableCell={goodsInfo}
                                  modalToggle={editGoods}/>
    )
    useEffect(() => {
        dispatch(setPaginationName("goods"))
    }, [dispatch]);

    return (
        <div>
            <ContentPage title="Goods" description="Here you can find the comprehensive list of goods."
                         tableData={goodsTableItems}
                         tableColumns={["ID", "Name", "Description", "Price", "Details"]}
                         toggleCreate={editGoods}
            />
        </div>
    )
};

export default Goods;
