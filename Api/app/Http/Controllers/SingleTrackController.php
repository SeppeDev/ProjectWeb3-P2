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
        // $path       = $request->file->store('audio', 'upload');
        $path       = 'drum.mp3';
        $fileName   = uniqid('solo_', true) . '.wav';

        exec('cd audio ; ffmpeg -i ' . basename($path) . ' ' . $fileName . ' 2>&1',  $output, $returncode);
        exec('cd audio ; soxi -D ' . $fileName . ' 2>&1',  $tracklength, $length_returncode);

        if($returncode === 0 && $length_returncode === 0)
        {
            $track                     = new Single_track();

            $track->songname           = 'Temp_songname';             
            $track->file_url           = $fileName;
            $track->track_length       = $tracklength[0];
            $track->instrument_id      = 1;
            $track->artist_id          = 1;
            $track->user_id            = 1;

            $track->save();

            return response()->json([
                'status'        => 'success',
                'trackname'     => $fileName,
                'tracklength'   => $tracklength[0]
            ]);
        }
        else
        {
            // Remove cmd-output in production! 
            return response()->json([
                'status'            => 'failed',
                'error_location'    => 'convert',
                'error_code'        => $returncode,
                'cmd-output'        => $output
            ]);
        } 
    }
}