<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $city
 * @property string $postcode
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePostcode($value)
 *  @mixin Builder
 */
class Customer extends Model
{
    protected $table = 'customers';
    public $timestamps = false;
    protected $fillable = [
        "id", "name", "address", "city", "postcode"
    ];
}
