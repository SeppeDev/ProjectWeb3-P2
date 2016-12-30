<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('tracks', 'SingleTrackController@index');
Route::get('tracks/{id}', 'SingleTrackController@show');
Route::get('mergedtracks', 'MergedTrackController@index');
Route::get('mergedtracks/{id}', 'MergedTrackController@show');

Route::post('mergedtracks/create', 'MergedTrackController@store');

Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
Route::post('authenticate', 'AuthenticateController@authenticate');
Route::get('user', 'AuthenticateController@getUser');