<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceGoodsItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InvoiceController extends Controller
{
    public function getInvoice($id)
    {
        $invoice = Invoice::with("items")->find($id);
        if ($invoice == null) {
            return response(null, 404);
        }
        return $invoice;
    }

    public function getInvoices(Request $request)
    {
        $per_page = (int)$request->query("per_page", 10);
        return Invoice::orderBy("id", "ASC")->paginate($per_page);
    }

    public function createInvoice(Request $request)
    {
        $request->validate([
            "date_of_issue" => "required",
            "customer_name" => "required",
            "customer_address" => "required",
            "customer_city" => "required",
            "customer_postcode" => "required",
            "items" => "required",
            "total_price" => "required|regex:/^[0-9]+\.?[0-9]{0,2}$/",
        ]);
        $invoiceRequest = $request->all();
        unset($invoiceRequest["items"]);
        $items = $request->input("items");
        $itemsDB = [];
        foreach ($items as $item) {
            $itemDB = new InvoiceGoodsItem($item);
            $itemsDB[] = $itemDB;
        }
        $invoice = new Invoice($invoiceRequest);
        $invoice->save();
        $invoice->items()->saveMany($itemsDB);
        return response($invoice, 201);
    }

    public function deleteInvoice($id)
    {
        $invoice = Invoice::find($id);
        $invoice->items()->delete();
        if ($invoice->delete()) {
            return response(null, 200);
        }
        return response(["id" => $id, "error" => "This invoice doesn't exist."], 404);
    }
}
