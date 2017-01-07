<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Single_track;

class SingleTrackController extends Controller
{
    public function index()
    {
    	$tracks = Single_track::with('instrument', 'artist', 'user')->get();

        // Json staat op /api/tracks
    	if($tracks->count())
        { 
            return response()->json($tracks);
        }
        else 
        {
            return response()->json(['status' => 'No tracks found.']);
        }
        
    }

    public function show($id)
    {
    	$track = Single_track::where('id', $id)->with('instrument', 'artist', 'user')->get();

        // Json staat op /api/mergedtracks/1
        if($track->count())
        {
            return response()->json($track);
        }
        else
        {
            return response()->json(['status' => 'Track not found.']);
        }
    }

    public function store(Request $request)
    {
        $track                      = new Single_track();

        $track->songname           = 'Temp_songname';
        // $path                    = $request->file->store('audio', 'upload'); 
        // $tracks->file_url        = basename($path);
        $track->file_url           = 'temp_url.mp3';
        $track->track_length       = 100.000001;
        $track->instrument_id      = 1;
        $track->artist_id          = 1;
        $track->user_id            = 1;

        $track->save();

        return response()->json(['status' => 'Track saved.']);
    }
}