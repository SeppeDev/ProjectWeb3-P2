<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Instrument;

class InstrumentController extends Controller
{
    /**
     * Fetch all instruments.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $instruments = Instrument::all();

        return response()->json($instruments);
    }
}
