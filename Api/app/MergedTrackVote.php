<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MergedTrackVote extends Model
{
    /**
     * A merged track vote belongs to a user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * A merged track vote belongs to an artist.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function mergedTrack()
    {
        return $this->belongsTo('App\MergedTrack');
    }
}
