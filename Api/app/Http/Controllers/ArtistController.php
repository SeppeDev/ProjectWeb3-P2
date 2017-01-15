<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Artist;

class ArtistController extends Controller
{
    public function index() 
    {
    	$artists = Artist::all();

    	return response()->json($artists);
    }

    public function store(Request $request)
    {
    	dd($request);
    	$artist = new Artist();

    	$artist->name = $request->name;

    	$artist->save();
    }
}
