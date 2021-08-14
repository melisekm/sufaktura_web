<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
            "name" => "required|min:2|max:20",
            "address" => "required",
            "city" => "required",
            "postcode" => "required",
        ]);

        $customer = Customer::find($request->input("id"));
        $customer->update($request->all());
        return response($customer, 201);
    }

    public function createCustomer(Request $request)
    {
        $request->validate([
            "name" => "required|min:2|max:20",
            "address" => "required",
            "city" => "required",
            "postcode" => "required",
        ]);
        $customer = new Customer($request->all());
        $customer->save();
        return response($customer, 201);
    }
}
