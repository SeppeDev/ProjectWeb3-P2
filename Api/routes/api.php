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

Route::get('tracks', 'SoloTrackController@index');
Route::get('tracks/{id}', 'SoloTrackController@show');
Route::get('mergedtracks', 'MergedTrackController@index');
Route::get('mergedtracks/{merged_track}', 'MergedTrackController@show');
Route::get('mergedtracks/{merged_track}/download', 'MergedTrackController@download');
Route::get('instruments', 'InstrumentController@index');
Route::get('artists', 'ArtistController@index');
Route::get('votes/{merged_track}', 'VoteController@index');

Route::post('mergedtracks/create', 'MergedTrackController@store');
Route::post('tracks/create', 'SoloTrackController@store');
Route::post('vote/create', 'VoteController@store');
Route::post('upload', 'SoloTrackController@upload');

Route::get('user', 'UserController@index');
Route::post('user', 'UserController@update');
Route::post('login', 'AuthenticateController@login');
Route::post('register', 'AuthenticateController@register');

Route::get('audio/{file}', 'AudioController@index');