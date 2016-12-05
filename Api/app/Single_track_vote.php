<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Single_track_vote extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function single_tracks()
    {
        return $this->belongsTo('App\Single_track');
    }
}
