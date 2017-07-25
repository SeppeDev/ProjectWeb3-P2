<?php

namespace App\Http\Controllers;

use App\MergedTrack;
use App\MergedTrackVote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Fetch specified merged track's votes.
     *
     * @param  \App\MergedTrack  $merged_track
     * @return \Illuminate\Http\Response
     */
    public function index(MergedTrack $merged_track)
    {
        $votes = $merged_track->votes()->get();

        return response()->json($votes);
    }

    /**
     * Store a vote for the specified track.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $merged_track = MergedTrack::find($request->track_id);

        if (!$merged_track->votes->where('user_id', $request->user_id)->first()) {
            $vote = new MergedTrackVote();
            $vote->merged_track_id = $request->track_id;
            $vote->user_id = $request->user_id;
            $vote->save();

            return response()->json([
                'status' => 'OK'
            ]);
        } else {
            return response()->json([
                'status' => 'Duplicate'
            ]);
        }
    }
}
