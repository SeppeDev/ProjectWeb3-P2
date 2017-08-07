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
        $tracks = MergedTrack::with(['artist', 'users', 'votes'])->get();

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
     * Manipulate and eventually merge the specified tracks.
     *
     * Sox installation:
     * Compile sox with madlib and lame libraries to include mp3 support.
     * View readme for detailed instructions.
     *
     * @todo: Make sure at least 2 tracks are selected to be merged.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tracks = $request->input();

        $concatenated_tracks = "";

        // Manipulate every selected track.
        for ($i = 0; $i < count($tracks); $i++) {
            $track_id           = $tracks[$i]['track_id'];
            $trim_from_start    = $tracks[$i]['trim_amount'];

            $track              = SoloTrack::find($track_id);
            $track_name         = $track->file_url;

            $trimmed_track_name   = uniqid('tmp_', true).'.mp3';

            exec('cd audio ; sox ' . $track_name . ' ' . $trimmed_track_name . ' trim ' . $trim_from_start . ' -0 2>&1', $trim_output, $trim_returncode);

            if ($trim_returncode === 0) {
                $concatenated_tracks .= $trimmed_track_name . " ";
            } else {
                return response()->json([
                    'status' => 'failed',
                    'error' => 'trim'
                ]);
            }
        }

        // Merge multiple tracks.
        $merged_track_name = uniqid('merged_', true).'.mp3';

        exec('cd audio ; sox -m ' . $concatenated_tracks . $merged_track_name . ' 2>&1', $merge_output, $merge_returncode);

        if ($merge_returncode === 0) {
            // When the merge succeeds, remove all temporary files.
            $tmp_tracks = explode(' ', $concatenated_tracks);
            for ($i = 0; $i < count($tmp_tracks) - 1; $i++) {
                exec('cd audio ; rm ' . $tmp_tracks[$i]);
            }

            $mergedtrack = new MergedTrack();

            $mergedtrack->songname = $track->songname;
            $mergedtrack->artist_id = $track->artist_id;
            $mergedtrack->file_url = $merged_track_name;

            $mergedtrack->save();

            for ($i = 0; $i < count($tracks); $i++) {
                $mergedtrack->users()->attach($tracks[$i]['user_id']);
            }

            return response()->json([
                'status' => 'success',
                'mergedfilename' => $merged_track_name
            ]);
        } else {
            return response()->json([
                'status' => 'failed',
                'error' => 'merge'
            ]);
        }
    }
}
