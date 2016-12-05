<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function Single_tracks()
    {
        return $this->hasMany('App\Single_track');
    }
}
