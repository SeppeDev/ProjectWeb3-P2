<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuthExceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

class AuthenticateController extends Controller
{
	public function __construct()
   	{
       	$this->middleware('jwt.auth', ['except' => ['login', 'register']]);
   	}

    public function login(Request $request)
    {
        $this->validate($request, [
            'email'     => 'required|max:255|email',
            'password'  => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }

    public function register(Request $request) 
    {
        $this->validate($request, [
            'username'  => 'required|max:18',
            'email'     => 'required|max:255|email|unique:users',
            'password'  => 'required|min:3|max:18',
        ]);

        $user = new User();

        $user->username = $request->username;
        $user->email    = $request->email;
        $user->password = bcrypt($request->password);

        $user->save();

        return response()->json(['status' => 'OK'], 200);
    }
}
