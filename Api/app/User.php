<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * A user belongs to many instruments.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function instruments()
    {
        return $this->belongsToMany('App\Instrument');
    }

    /**
     * A user has many solo tracks.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function soloTracks()
    {
        return $this->hasMany('App\SoloTrack');
    }

    /**
     * A user belongs to many merged tracks.
     *
     * @return \Illuminate\Database\Eloquent\Relations\belongsToMany
     */
    public function mergedTracks()
    {
        return $this->belongsToMany('App\Mergedtrack');
    }

    /**
     * A user has many solo track votes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function singleTrackVotes()
    {
        return $this->hasMany('App\SoloTrackVote');
    }

    /**
     * A user has many merged track votes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\hasMany
     */
    public function mergedTrackVotes()
    {
        return $this->hasMany('App\MergedTrackVote');
    }
}
