<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Artist extends Model
{
	public function single_tracks()
    {
        return $this->hasMany('App\Single_track');
    }

    public function merged_tracks()
    {
        return $this->hasMany('App\Merged_track');
    }
}
