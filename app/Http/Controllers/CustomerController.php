<?php

namespace App\Http\Controllers;

use App\Models\Customer;

class CustomerController extends Controller
{
    public function getAllCustomers()
    {
        return Customer::all();
    }
}
