<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Single_track extends Model
{
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function Instrument()
    {
        return $this->belongsTo('App\Instrument');
    }

    public function Artist()
    {
        return $this->belongsTo('App\Artist');
    }

    public function single_track_votes()
    {
        return $this->hasMany('App\Single_track_vote');
    }
}
