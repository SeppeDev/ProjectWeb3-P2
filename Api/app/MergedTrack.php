<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MergedTrack extends Model
{
    /**
     * A merged track has many users.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_merged_track', 'merged_track_id', 'user_id');
    }

    /**
     * A merged track belongs to an artist.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function artist()
    {
        return $this->belongsTo('App\Artist');
    }

    /**
     * A merged track has many votes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function votes()
    {
        return $this->hasMany('App\MergedTrackVote');
    }
}
