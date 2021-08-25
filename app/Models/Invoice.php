<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Invoice
 *
 * @property int $id
 * @property string $date_of_issue
 * @property string $customer_name
 * @property string $customer_address
 * @property string $total_price
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice query()
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCustomerAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereCustomerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereDateOfIssue($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Invoice whereTotalPrice($value)
 * @mixin Eloquent
 * @property-read Collection|InvoiceGoodsItem[] $items
 * @property-read int|null $items_count
 */
class Invoice extends Model
{
    protected $table = 'invoices';
    public $timestamps = false;
    protected $fillable = [
        "id", "date_of_issue", "customer_name", "customer_address", "total_price", "customer_city", "customer_postcode"
    ];

    public function items() // Invoice::with("items")->find($id)
    {
        return $this->hasMany(InvoiceGoodsItem::class, 'invoices_id');
    }
}
