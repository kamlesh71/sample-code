<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class User extends Authenticatable implements HasMedia
{
    use Notifiable, HasApiTokens, InteractsWithMedia;

    protected $fillable = [
        'email', 'fb_id', 'fb_access_token'
    ];

    protected $hidden = [
        'fb_id', 'fb_access_token',
    ];

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function preference()
    {
        return $this->hasOne(Preference::class);
    }

    public function interests()
    {
        return $this->belongsToMany(Interest::class);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatar')
            ->singleFile();

        // you can define as many collections as needed
        $this->addMediaCollection('photos')
            ->registerMediaConversions(function (Media $media) {

                $this->addMediaConversion('medium')
                    ->crop('crop-center', 300, 400);

                $this->addMediaConversion('thumb')
                    ->crop('crop-center', 300, 400);
            });

    }
}
