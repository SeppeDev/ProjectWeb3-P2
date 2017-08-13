<?php

namespace App\Http\Controllers;

use App\MergedTrack;
use App\MergedTrackVote;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;

class VoteController extends Controller
{
    /**
     * Contains the authenticated user.
     *
     * @var \App\User
     */
    private $user;

    /**
     * Constructor.
     *
     * Get the authenticated user and save it to the $user variable.
     */
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            try {
                if (!$this->user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
                }
            } catch (TokenExpiredException $e) {
                return response()->json(['token_expired'], $e->getStatusCode());
            } catch (TokenInvalidException $e) {
                return response()->json(['token_invalid'], $e->getStatusCode());
            } catch (JWTException $e) {
                return response()->json(['token_absent'], $e->getStatusCode());
            }

            return $next($request);
        });
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

        $user_vote = $merged_track->votes->where('user_id', $this->user->id)->first();
        if (empty($user_vote)) {
            $vote = new MergedTrackVote();
            $vote->merged_track_id = $request->track_id;
            $vote->user_id = $this->user->id;
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
