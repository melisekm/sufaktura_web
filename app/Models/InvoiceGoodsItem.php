<?php

namespace App\Models;

use Barryvdh\LaravelIdeHelper\Eloquent;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InvoiceGoodsItem
 *
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem query()
 * @mixin Eloquent
 * @property int $id
 * @property int $invoices_id
 * @property string $goods_name
 * @property int $goods_count
 * @property string $goods_item_price
 * @property-read Invoice $invoice
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem whereGoodsCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem whereGoodsItemPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem whereGoodsName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InvoiceGoodsItem whereInvoicesId($value)
 */
class InvoiceGoodsItem extends Model
{

    protected $table = 'invoices_goods';
    public $timestamps = false;
    protected $fillable = [
        "id", "invoices_id", "goods_name", "goods_count", "goods_item_price"
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, "invoices_id");
    }
}
