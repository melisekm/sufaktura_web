<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
/**
 * App\Models\Goods
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $price
 * @property string $category
 * @method static \Illuminate\Database\Eloquent\Builder|Goods newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Goods newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Goods query()
 * @method static \Illuminate\Database\Eloquent\Builder|Goods whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goods whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goods whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goods wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Goods whereCategory($value)
 *  @mixin Builder
 */

class Goods extends Model
{
    protected $table = 'goods';
    public $timestamps = false;
    protected $fillable = [
        "id", "name", "description", "price", "category"
    ];
}
