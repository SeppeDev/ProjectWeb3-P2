<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Merged_track extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_merged_track', 'merged_track_id', 'user_id');
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
