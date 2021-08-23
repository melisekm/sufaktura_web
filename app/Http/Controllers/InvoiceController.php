<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
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
            "total_price" => "required|regex:/^[0-9]+\.?[0-9]{0,2}$/",
        ]);
        $invoice = new Invoice($request->all());
        $invoice->save();
        return response($invoice, 201);
    }

    public function deleteInvoice($id)
    {
        $deleted = Invoice::destroy($id);
        if ($deleted) {
            return response(null, 200);
        }
        return response(["id" => $id, "error" => "This invoice doesn't exist."], 404);
    }
    //TODO vytvorit funkciu na vratenie itemov na zaklade faktury
}
