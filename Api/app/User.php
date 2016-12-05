<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function instruments()
    {
        return $this->belongsToMany('App\Instrument');
    }

    public function single_tracks()
    {
        return $this->hasMany('App\Single_track');
    }

    public function merged_tracks()
    {
        return $this->belongsToMany('App\Merged_track');
    }

    public function single_track_votes()
    {
        return $this->hasMany('App\Single_track_vote');
    }

    public function merged_track_votes()
    {
        return $this->hasMany('App\Merged_track_vote');
    }
}
