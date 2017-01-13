<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Merged_track;
use App\Single_track;

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
    public function store(Request $request)
    {
        // header("Access-Control-Allow-Origin: *");
        
        $tracks = $request->input();

        // Sox installation: sudo apt-get install sox
        // Lame installation: sudo apt-get install lame
        // Ffmpeg installation: sudo apt-get install ffmpeg

        // Gebruik ffmpeg om mp3 naar wav te converteren!

        $trackstring = "";

        // Trim tracks, geef aantal sec.msec mee om te trimmen vanaf begin en vanaf einde
        for ($i = 0; $i < count($tracks); $i++) { 
            $track_id       = $tracks[$i]['track_id'];
            $trimBegining   = $tracks[$i]['trim_amount'];
            $track          = Single_track::find($track_id); 
            $trackname      = $track->file_url;

            $trimmedTrackName = uniqid('trimmed_temp_', true).'.wav';

            exec('cd audio ; sox ' . $trackname . ' ' . $trimmedTrackName . ' trim ' . $trimBegining . ' -0 2>&1', $trim_output, $trim_returncode);
            if($trim_returncode === 0)
            {
                $trackstring .= $trimmedTrackName . " ";
            }
            else
            {
                // Remove cmd-output in production! 
                return response()->json([
                    'status'            => 'failed',
                    'error_location'    => 'trim',
                    'error_code'        => $trim_returncode,
                    'cmd-output'        => $trim_output
                ]);
            }
        }

        // Merge meerdere tracks + convert to mp3
        $tempFileName = uniqid('tmp_', true).'.wav';

        exec('cd audio ; sox -m ' . $trackstring . $tempFileName . ' 2>&1', $merge_output, $merge_returncode);

        if($merge_returncode === 0)
        {
            exec('cd audio ; soxi -D ' . $tempFileName . ' 2>&1',  $tracklength, $length_returncode);

            if($length_returncode === 0)
            {
                $fileName = uniqid('merged_', true).'.mp3';
                exec('cd audio ; lame '. $tempFileName .' ' . $fileName . ' 2>&1', $convert_output, $convert_returncode);

                if($convert_returncode === 0)
                {
                    // Verwijder alle temp files
                    exec('cd audio ; rm ' . $tempFileName);
                    $tempTrimmedTracksArray = explode(' ', $trackstring);
                    for ($i = 0; $i < count($tempTrimmedTracksArray) - 1; $i++) { 
                        exec('cd audio ; rm ' . $tempTrimmedTracksArray[$i]);
                    }

                    $mergedtrack                = new Merged_track();

                    $mergedtrack->songname      = "Temp_songname";
                    $mergedtrack->artist_id     = 1;
                    $mergedtrack->track_length  = $tracklength[0];
                    $mergedtrack->file_url      = $fileName;
                    
                    $mergedtrack->save();

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
                    'error_location'    => 'length',
                    'error_code'        => $length_returncode,
                    'cmd-output'        => $tracklength
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