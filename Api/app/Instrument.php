<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Instrument extends Model
{
    /**
     * An instrument belongs to many users.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * An instrument has many merged solo tracks.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function soloTrack()
    {
        return $this->hasMany('App\SoloTrack');
    }
}
