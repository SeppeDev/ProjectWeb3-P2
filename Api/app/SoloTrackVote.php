<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SoloTrackVote extends Model
{
    /**
     * A solo track vote belongs to a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * A solo track vote belongs to a solo track.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function soloTrack()
    {
        return $this->belongsTo('App\SoloTrack');
    }
}
