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

    // POST naar /api/mergedtracks/create
    public function store()
    {
        // Sox installation: sudo apt-get install sox
        // Lame installation: sudo apt-get install lame
        // Ffmpeg installation: sudo apt-get install ffmpeg

        // Gebruik ffmpeg om mp3 naar wav te converteren!

        $tracks  = array(
            "guitar.wav" => array(
                "begin" => 0,
                "end" => 0,
            ),
            "drum.wav" => array(
                "begin" => 0.2,
                "end" => 0,
            )
        );

        // Trim tracks, geef aantal sec.msec om te trimmen begin en einde

        $trackstring = "";

        foreach ($tracks as $track => $timestamps) {
            $trimBegining = $timestamps["begin"];
            $trimEnding   = $timestamps["end"];

            $trimmedTrackName = uniqid('trimmed_temp_', true).'.wav';

            exec('cd audio ; sox ' . $track . ' ' . $trimmedTrackName . ' trim ' . $trimBegining . ' -' . $trimEnding);
            $trackstring .= $trimmedTrackName . " ";
        }

        // Merge meerdere tracks + convert to mp3

        $tempFileName   = uniqid('tmp_', true).'.wav';

        exec('cd audio ; sox -m ' . $trackstring . $tempFileName . ' 2>&1', $merge_output, $merge_returncode);

        if($merge_returncode === 0)
        {
            $fileName   = uniqid('merged_', true).'.mp3';
            exec('cd audio ; lame '. $tempFileName .' ' . $fileName . ' 2>&1', $convert_output, $convert_returncode);

            if($convert_returncode === 0)
            {
                // Verwijder alle temp files
                exec('cd audio ; rm ' . $tempFileName);
                $tempTrimmedTracksArray = explode(' ', $trackstring);
                for ($i = 0; $i < count($tempTrimmedTracksArray) - 1; $i++) { 
                    exec('cd audio ; rm ' . $tempTrimmedTracksArray[$i]);
                }
                
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