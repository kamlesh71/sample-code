<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'first_name', 'last_name', 'nickname', 'gender', 'dob', 'location', 'occupation', 'education', 'location_coords'
    ];

    protected $touches = [
        'user'
    ];

    protected $casts = [
        'dob' => 'datetime'
    ];

    public function setDobAttribute($value)
    {
        return Carbon::createFromFormat('d/m/Y', $value)->format('Y-m-d');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
