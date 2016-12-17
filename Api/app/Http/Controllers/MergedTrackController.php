<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Merged_track;

class MergedTrackController extends Controller
{
    public function index()
    {
    	$tracks = Merged_track::with('artist')->get();

    	// Json staat op /api/mergedtracks
    	if($tracks->count())
    	{
    		return response()->json($tracks);
    	}
    	else {
    		return response()->json(['status', 'No tracks found.']);
    	}
    }

    public function show($id)
    {
    	$track = Merged_track::where('id', $id)->with('artist')->get();

    	// Json staat op /api/mergedtracks/1
    	if($track->count())
        {
            return response()->json($track);
        }
        else
        {
            return response()->json(['status', 'Track not found.']);
        }
    }
}
