<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuthExceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        return response()->json($user);
    }

    public function update(Request $request)
    {
    	$user 			= JWTAuth::parseToken()->authenticate();

    	$user->username = $request->username;
    	$user->email 	= $request->email;

    	$user->save();

    	return response()->json(['status' => 'OK'], 200);
    }
}
