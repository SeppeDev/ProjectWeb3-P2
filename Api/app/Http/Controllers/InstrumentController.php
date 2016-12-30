<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Instrument;

class InstrumentController extends Controller
{
    public function index() 
    {
    	$instruments = Instrument::all();

    	return response()->json($instruments);
    }
}
