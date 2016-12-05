<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Merged_track_vote extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function merged_tracks()
    {
        return $this->belongsTo('App\Merged_track');
    }
}
