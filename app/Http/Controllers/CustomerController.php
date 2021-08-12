<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function getAllCustomers()
    {
        return Customer::orderBy("id", "ASC")->get();
    }

    public function updateCustomer(Request $request)
    {
        $request->validate([
            "id" => "required",
            "name" => "required",
            "address" => "required",
            "city" => "required",
            "postcode" => "required",
        ]);
        $customer = Customer::find($request->input("id"));
        $customer->update($request->all());
        return response()->noContent();
    }
}
