<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
    /**
     * An artist has many solo tracks.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function soloTracks()
    {
        return $this->hasMany('App\SoloTrack');
    }

    /**
     * An artist has many merged tracks.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function mergedTracks()
    {
        return $this->hasMany('App\MergedTrack');
    }
}
