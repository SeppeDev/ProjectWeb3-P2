<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Merged_track extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function Artist()
    {
        return $this->belongsTo('App\Artist');
    }

    public function merged_track_votes()
    {
        return $this->hasMany('App\Merged_track_vote');
    }
}
