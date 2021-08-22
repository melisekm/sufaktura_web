<?php

namespace App\Http\Controllers;

use App\Models\Goods;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GoodsController extends Controller
{

    public function getGoodsItem($id)
    {
        $goodsItem = Goods::find($id);
        if ($goodsItem == null) {
            return response(null, 404);
        }
        return $goodsItem;
    }

    public function getGoods(Request $request)
    {
        $per_page = (int)$request->query("per_page", 10);
        return Goods::orderBy("id", "ASC")->paginate($per_page);
    }

    public function createGoods(Request $request)
    {
        $request->validate([
            "category" => "required",
            "name" => "required",
            "description" => "required",
            "price" => "required|regex:/^[0-9]+\.?[0-9]{0,2}$/",
        ]);
        $goods = new Goods($request->all());
        $goods->save();
        return response($goods, 201);
    }

    public function updateGoods(Request $request)
    {
        $request->validate([
            "id" => "required",
            "category" => "required",
            "name" => "required",
            "description" => "required",
            "price" => "required|regex:/^[0-9]+\.?[0-9]{0,2}$/",
        ]);

        $goods = Goods::find($request->input("id"));
        $goods->update($request->all());
        return response($goods, 201);
    }

    public function deleteGoods($id)
    {
        $deleted = Goods::destroy($id);
        if ($deleted) {
            return response(null, 200);
        }
        return response(["id" => $id, "error" => "This goodsItem doesn't exist."], 404);
    }
}
