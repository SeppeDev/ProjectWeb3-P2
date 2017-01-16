<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Merged_track;
use App\Single_track;

class MergedTrackController extends Controller
{
    public function index()
    {
    	$tracks = Merged_track::with('artist', 'users', 'merged_track_votes')->get();

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

    	if($track->count())
        {
            return response()->json($track);
        }
        else
        {
            return response()->json(['status' => 'Track not found.']);
        }
    }

    public function download($id)
    {
        $track = Merged_track::find($id);

        $url    = $track->file_url;

        return response()->download(public_path() . "/audio/" . $url);
    }

    public function store(Request $request)
    {  
        $tracks = $request->input();
        // Sox installation: sudo apt-get install sox
        // Lame installation: sudo apt-get install lame
        // Ffmpeg installation: sudo apt-get install ffmpeg

        $trackstring    = "";
        $wavtrackstring = "";

        for ($i = 0; $i < count($tracks); $i++) { 
            $track_id           = $tracks[$i]['track_id'];
            $trimBegining       = $tracks[$i]['trim_amount'];

            $track              = Single_track::find($track_id); 
            $trackname          = $track->file_url;

            $wavTrackName       = uniqid('wav_', true).'.wav';
            $trimmedTrackName   = uniqid('trimmed_temp_', true).'.wav';

            exec('cd audio ; ffmpeg -i ' . $trackname . ' ' . $wavTrackName . ' 2>&1', $convertToWav_output, $convertToWav_returncode);

            if($convertToWav_returncode === 0)
            {
                exec('cd audio ; sox ' . $wavTrackName . ' ' . $trimmedTrackName . ' trim ' . $trimBegining . ' -0 2>&1', $trim_output, $trim_returncode);

                if($trim_returncode === 0)
                {
                    $trackstring .= $trimmedTrackName . " ";
                    $wavtrackstring .= $wavTrackName . " ";
                }
                else
                {
                    return response()->json([
                        'status'            => 'failed',
                        'error_location'    => 'trim'
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'status'            => 'failed',
                    'error_location'    => 'convert to wav'
                ]);
            }
        }

        // Merge meerdere tracks + convert to mp3
        $tempFileName = uniqid('tmp_', true).'.wav';

        exec('cd audio ; sox -m ' . $trackstring . $tempFileName . ' 2>&1', $merge_output, $merge_returncode);

        if($merge_returncode === 0)
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

                $tempWavTracksArray = explode(' ', $wavtrackstring);
                for ($i = 0; $i < count($tempWavTracksArray) - 1; $i++) { 
                    exec('cd audio ; rm ' . $tempWavTracksArray[$i]);
                }

                $mergedtrack                = new Merged_track();

                $mergedtrack->songname      = $track->songname;
                $mergedtrack->artist_id     = $track->artist_id;
                $mergedtrack->file_url      = $fileName;
                
                $mergedtrack->save();

                for ($i = 0; $i < count($tracks); $i++) { 
                    $mergedtrack->users()->attach($tracks[$i]['user_id']);
                }

                return response()->json([
                    'status'            => 'success',
                    'mergedfilename'    => $fileName,
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
        else
        {
            return response()->json([
                'status'            => 'failed',
                'error_location'    => 'merge'
            ]);
        }
    }
}