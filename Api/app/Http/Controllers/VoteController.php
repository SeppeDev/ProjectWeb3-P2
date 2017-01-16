<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Merged_track_vote;
use DB;

class VoteController extends Controller
{
    public function store(Request $request) 
    {
    	$userHasVotedForThis = DB::table('merged_track_votes')
                ->where('merged_track_id', '=', $request->track_id)
                ->where('user_id', '=', $request->user_id)
                ->exists();

    	if(!$userHasVotedForThis)
    	{
    		$vote = new Merged_track_vote();

	    	$vote->merged_track_id 	= $request->track_id;
	    	$vote->user_id 			= $request->user_id;

	    	$vote->save();

	    	return response()->json(['status' => 'OK']);
    	}
    	else
    	{
    		return response()->json(['status' => 'EXISTS']);
    	}
    }
}
