<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Single_track;

class SingleTrackController extends Controller
{
    public function index()
    {
    	$singletracks = Single_track::with('instrument', 'artist', 'user')->get();

    	// Json staat op /api/tracks
    	return response()->json($singletracks);
    }
}
