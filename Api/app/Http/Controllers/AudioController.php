<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudioController extends Controller
{
    public function index($track)
    {
    	return response()->file(public_path() . '/audio/' . $track);
    }
}
