<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SoloTrack extends Model
{
    /**
     * A solo track belongs to a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * A solo track belongs to an instrument.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function instrument()
    {
        return $this->belongsTo('App\Instrument');
    }

    /**
     * A solo track belongs to an artist.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function artist()
    {
        return $this->belongsTo('App\Artist');
    }

    /**
     * A solo track has many votes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function votes()
    {
        return $this->hasMany('App\SoloTrackVote');
    }
}
