<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Single_track;
use App\Artist;

class SingleTrackController extends Controller
{
    public function index()
    {
    	$tracks = Single_track::with('instrument', 'artist', 'user')->get();

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

        if($track->count())
        {
            return response()->json($track);
        }
        else
        {
            return response()->json(['status' => 'Track not found.']);
        }
    }

    public function upload(Request $request)
    {   
        $fileNameArray      = explode(".", $request->song->getClientOriginalName());
        $extension          = $fileNameArray[1];
        $tempFileName       = uniqid('uploaded_', true) . '.' . $extension;

        $path               = $request->song->storeAs('audio', $tempFileName,'upload');
        
        $fileName           = uniqid('solo_', true) . '.mp3';

        exec('cd audio ; ffmpeg -i ' . $tempFileName . ' ' . $fileName . ' 2>&1',  $output, $returncode);

        if($returncode === 0)
        {
            exec('cd audio ; rm ' . $tempFileName);

            return response()->json([
                'status'        => 'success',
                'name'          => $fileName
            ]);
        }
        else
        {
            return response()->json([
                'status'            => 'failed',
                'error_location'    => 'convert'
            ]);
        } 
    }

    public function store(Request $request)
    {   
        $track                     = new Single_track();

        $track->songname           = $request->name;             
        $track->file_url           = $request->file_url;
        $track->instrument_id      = $request->instrument_id;
        $track->user_id            = $request->user_id;

        $input_artist              = ucfirst(strtolower($request->artist_id));

        $existingArtist            = Artist::where('name', 'LIKE', $input_artist)->first();

        if($existingArtist)
        {
            $track->artist_id      = $existingArtist->id;
        }
        else
        {
            $newArtist = new Artist();

            $newArtist->name = $input_artist;

            $newArtist->save();

            $track->artist_id      = $newArtist->id;
        }

        $track->save();
    }
}