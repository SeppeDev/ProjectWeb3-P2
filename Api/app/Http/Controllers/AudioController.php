<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AudioController extends Controller
{
    /**
     * Fetch the specified file.
     *
     * @param string  $path
     * @return \Illuminate\Http\Response
     */
    public function index($path)
    {
        return response()->file(public_path() . '/audio/' . $path);
    }
}
