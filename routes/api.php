<?php

use App\Http\Controllers\GoodsController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('v1/customers', [CustomerController::class, 'getCustomers']);
Route::put("v1/customer", [CustomerController::class, "updateCustomer"]);
Route::post("v1/customer", [CustomerController::class, "createCustomer"]);
Route::delete("v1/customer/{id}", [CustomerController::class, "deleteCustomer"]);

Route::get('v1/goods', [GoodsController::class, 'getGoods']);
Route::get('v1/goods/{id}', [GoodsController::class, 'getGoodsItem']);
Route::put("v1/goods", [GoodsController::class, "updateGoods"]);
Route::post("v1/goods", [GoodsController::class, "createGoods"]);
Route::delete("v1/goods/{id}", [GoodsController::class, "deleteGoods"]);

Route::get('v1/invoices', [InvoiceController::class, 'getInvoices']);
Route::get('v1/invoices/{id}', [InvoiceController::class, 'getInvoice']);
Route::post("v1/invoices", [InvoiceController::class, "createInvoice"]);
Route::delete("v1/invoices/{id}", [InvoiceController::class, "deleteInvoice"]);


Route::get('v1/query/customers', [CustomerController::class, 'getCustomersByQuery']);
Route::get('v1/query/goods', [GoodsController::class, 'getGoodsByQuery']);
