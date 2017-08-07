<?php

namespace App\Http\Controllers;

use App\MergedTrack;
use App\MergedTrackVote;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class VoteController extends Controller
{
    /**
     * Store a vote for the specified track.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $merged_track = MergedTrack::find($request->track_id);

        $user_vote = $merged_track->votes->where('user_id', $request->user_id)->first();
        if (empty($user_vote)) {
            $vote = new MergedTrackVote();
            $vote->merged_track_id = $request->track_id;
            $vote->user_id = $request->user_id;
            $vote->save();

            return response()->json([
                'status' => 'OK'
            ]);
        } else {
            $user_vote->delete();

            return response()->json([
                'status' => 'Duplicate'
            ]);
        }
    }
}
