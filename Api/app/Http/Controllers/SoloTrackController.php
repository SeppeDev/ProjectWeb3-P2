<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SoloTrack;
use App\Artist;

class SoloTrackController extends Controller
{
    /**
     * Fetch all solo tracks with instrument, artist and user info.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tracks = SoloTrack::with('instrument', 'artist', 'user')->get();

        if ($tracks->count()) {
            return response()->json($tracks);
        } else {
            return response()->json([
                'status' => 'No tracks found.'
            ]);
        }
    }

    /**
     * Fetch the specified solo track with instrument, artist and user info.
     *
     * @param  integer $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $track = SoloTrack::find($id)->with('instrument', 'artist', 'user')->get();

        if ($track->count()) {
            return response()->json($track);
        } else {
            return response()->json([
                'status' => 'Track not found'
            ]);
        }
    }

    /**
     * Upload a track and convert it to mp3.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $file_name_array    = explode(".", $request->song->getClientOriginalName());
        $file_extension     = $file_name_array[1];

        $temp_file_name     = uniqid('uploaded_', true) . '.' . $file_extension;
        $file_name          = uniqid('solo_', true) . '.mp3';

        $request->song->storeAs('audio', $temp_file_name, 'upload');

        exec('cd audio ; ffmpeg -i ' . $temp_file_name . ' ' . $file_name . ' 2>&1', $output, $return_code);

        if ($return_code === 0) {
            exec('cd audio ; rm ' . $temp_file_name);

            return response()->json([
                'status' => 'success',
                'name' => $file_name
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'error' => 'convert'
            ]);
        }
    }

    /**
     * Store an uploaded track's information.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $track                     = new SoloTrack();
        $track->songname           = $request->name;
        $track->file_url           = $request->file_url;
        $track->instrument_id      = $request->instrument_id;
        $track->user_id            = $request->user_id;

        $input_artist              = ucfirst(strtolower($request->artist_id));

        $existing_artist = Artist::where('name', 'LIKE', $input_artist)->first();

        if ($existing_artist) {
            $track->artist_id = $existing_artist->id;
        } else {
            $newArtist = new Artist();
            $newArtist->name = $input_artist;
            $newArtist->save();

            $track->artist_id = $newArtist->id;
        }

        $track->save();

        return response()->json([
            'status' => 'ok',
        ]);
    }
}