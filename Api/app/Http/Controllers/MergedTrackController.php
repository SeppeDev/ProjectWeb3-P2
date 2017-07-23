<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MergedTrack;
use App\SoloTrack;

class MergedTrackController extends Controller
{
    /**
     * Fetch all merged tracks with votes, artist- and user info.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tracks = MergedTrack::with('artist', 'users', 'votes')->get();

        if ($tracks->count()) {
            return response()->json($tracks);
        } else {
            return response()->json([
                'status' => 'No tracks found'
            ]);
        }
    }

    /**
     * Fetch the specified merged track with artist info.
     *
     * @param  integer $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $track = MergedTrack::where('id', $id)->with('artist')->get();

        if ($track->count()) {
            return response()->json($track);
        } else {
            return response()->json([
                'status' => 'Track not found'
            ]);
        }
    }

    /**
     * Download the specified file.
     *
     * @param \App\MergedTrack  $merged_track
     * @return \Illuminate\Http\Response
     */
    public function download(MergedTrack $merged_track)
    {
        $url = $merged_track->file_url;

        return response()->download(public_path() . "/audio/" . $url);
    }

    /**
     * Download the specified file.
     *
     * @todo: Compile sox with mp3 and simplify the merging process.
     * @todo: Make sure at least 2 tracks are selected to be merged.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

            $track              = SoloTrack::find($track_id);
            $trackname          = $track->file_url;

            $wavTrackName       = uniqid('wav_', true).'.wav';
            $trimmedTrackName   = uniqid('trimmed_temp_', true).'.wav';

            exec('cd audio ; ffmpeg -i ' . $trackname . ' ' . $wavTrackName . ' 2>&1', $convertToWav_output, $convertToWav_returncode);

            if ($convertToWav_returncode === 0) {
                exec('cd audio ; sox ' . $wavTrackName . ' ' . $trimmedTrackName . ' trim ' . $trimBegining . ' -0 2>&1', $trim_output, $trim_returncode);

                if ($trim_returncode === 0) {
                    $trackstring .= $trimmedTrackName . " ";
                    $wavtrackstring .= $wavTrackName . " ";
                } else {
                    return response()->json([
                        'status'            => 'failed',
                        'error_location'    => 'trim'
                    ]);
                }
            } else {
                return response()->json([
                    'status'            => 'failed',
                    'error_location'    => 'convert to wav'
                ]);
            }
        }

        // Merge multiple tracks + convert to mp3
        $tempFileName = uniqid('tmp_', true).'.wav';

        exec('cd audio ; sox -m ' . $trackstring . $tempFileName . ' 2>&1', $merge_output, $merge_returncode);

        if ($merge_returncode === 0) {
            $fileName = uniqid('merged_', true).'.mp3';
            exec('cd audio ; lame '. $tempFileName .' ' . $fileName . ' 2>&1', $convert_output, $convert_returncode);

            if ($convert_returncode === 0) {
                // Remove all temporary files.
                exec('cd audio ; rm ' . $tempFileName);

                $tempTrimmedTracksArray = explode(' ', $trackstring);
                for ($i = 0; $i < count($tempTrimmedTracksArray) - 1; $i++) {
                    exec('cd audio ; rm ' . $tempTrimmedTracksArray[$i]);
                }

                $tempWavTracksArray = explode(' ', $wavtrackstring);
                for ($i = 0; $i < count($tempWavTracksArray) - 1; $i++) {
                    exec('cd audio ; rm ' . $tempWavTracksArray[$i]);
                }

                $mergedtrack                = new MergedTrack();

                $mergedtrack->songname      = $track->songname;
                $mergedtrack->artist_id     = $track->artist_id;
                $mergedtrack->file_url      = $fileName;
                
                $mergedtrack->save();

                for ($i = 0; $i < count($tracks); $i++) {
                    $mergedtrack->users()->attach($tracks[$i]['user_id']);
                }

                return response()->json([
                    'status'            => 'success',
                    'mergedfilename'    => $fileName
                ]);
            } else {
                return response()->json([
                    'status'            => 'failed',
                    'error_location'    => 'convert'
                ]);
            }
        } else {
            return response()->json([
                'status'            => 'failed',
                'error_location'    => 'merge'
            ]);
        }
    }
}
