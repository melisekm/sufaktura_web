import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";

export default class Goods extends React.Component {
    goodsData = [
        ["1", "CPU FX-6300", "Procesor", "111.15 €"],
        ["2", "RAM 4GB", "Random Access Memory", "25.15 €"],
        ["3", "GPU 7790HD", "Graficka na hranie", "99.69 €"]
    ]

    render() {
        const goodsTableItems = this.goodsData.map(
            (goodsInfo) => <TableItem key={goodsInfo[0]} data={goodsInfo}/>
        )
        return (
            <div>
                <ContentPage title="Goods" description="Here you can find the comprehensive list of goods."
                             tableData={goodsTableItems}
                             tableColumns={["ID", "Name", "Description", "Price", "Details"]}/>
            </div>
        )
    }
}