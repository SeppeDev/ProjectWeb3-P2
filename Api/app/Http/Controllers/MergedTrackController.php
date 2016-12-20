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
    		return response()->json(['status' => 'No tracks found.']);
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
            return response()->json(['status' => 'Track not found.']);
        }
    }

    public function store()
    {
        // Sox installation: sudo apt-get install sox
        // Lame installation: sudo apt-get install lame

        // Merge 2 tracks using sox + convert to mp3
        $track1         = "guitar.wav";
        $track2         = "drum.wav";

        $tempFileName   = uniqid('tmp_', true).'.wav';

        exec('cd audio ; sox -m ' . $track1 . ' ' . $track2 . ' ' . $tempFileName . ' 2>&1', $merge_output, $merge_returncode);

        if($merge_returncode === 0)
        {
            $fileName   = uniqid('merged_', true).'.mp3';
            exec('cd audio ; lame '. $tempFileName .' ' . $fileName . ' 2>&1', $convert_output, $convert_returncode);

            if($convert_returncode === 0)
            {
                return response()->json([
                    'status'            => 'success',
                    'mergedfilename'    => $fileName,
                ]);
            }
            else
            {
                // Remove cmd-output in production! 
                return response()->json([
                    'status'            => 'failed',
                    'error_location'    => 'convert',
                    'error_code'        => $convert_returncode,
                    'cmd-output'        => $convert_output
                ]);
            }
        }
        else
        {
            // Remove cmd-output in production! 
            return response()->json([
                'status'            => 'failed',
                'error_location'    => 'merge',
                'error_code'        => $merge_returncode,
                'cmd-output'        => $merge_output
            ]);
        }
    }
}