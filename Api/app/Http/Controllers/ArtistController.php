<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Artist;

class ArtistController extends Controller
{
    /**
     * Fetch all artists.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $artists = Artist::all();

        return response()->json($artists);
    }

    /**
     * Fetch all artist names.
     *
     * @return \Illuminate\Http\Response
     */
    public function names()
    {
        $artists = Artist::all(['name']);

        $artists_array = [];

        foreach ($artists as $artist) {
            array_push($artists_array, $artist->name);
        }

        return response()->json($artists_array);
    }
}
