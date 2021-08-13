<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    public function getAllCustomers()
    {
        return Customer::orderBy("id", "ASC")->get();
    }

    public function updateCustomer(Request $request): \Illuminate\Http\Response
    {
        try {
            $request->validate([
                "id" => "required",
                "name" => "required",
                "address" => "required",
                "city" => "required",
                "postcode" => "required",
            ]);
        } catch (ValidationException $e) {
            return response(422, $e->getMessage());
        }
        $customer = Customer::find($request->input("id"));
        $customer->update($request->all());

        return response(null, 204); // TODO
    }

    public function createCustomer(Request $request)
    {
        try {
            $request->validate([
                "name" => "required",
                "address" => "required",
                "city" => "required",
                "postcode" => "required",
            ]);
        } catch (ValidationException $e) {
            return response(422, $e->getMessage());
        }
        (new Customer($request->all()))->save();
        return response(null, 201);
    }
}
