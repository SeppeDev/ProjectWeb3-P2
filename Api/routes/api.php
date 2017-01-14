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

Route::get('tracks', 'SingleTrackController@index');
Route::get('tracks/{id}', 'SingleTrackController@show');
Route::get('mergedtracks', 'MergedTrackController@index');
Route::get('mergedtracks/{id}', 'MergedTrackController@show');
Route::get('mergedtracks/{id}/download', 'MergedTrackController@download');
Route::get('instruments', 'InstrumentController@index');
Route::get('artists', 'ArtistController@index');

Route::post('mergedtracks/create', 'MergedTrackController@store');
Route::post('tracks/create', 'SingleTrackController@store');
Route::post('upload', 'SingleTrackController@upload');

Route::get('user', 'UserController@index');
Route::post('user', 'UserController@update');
Route::post('login', 'AuthenticateController@login');
Route::post('register', 'AuthenticateController@register');

Route::get('audio/{file}', 'AudioController@index');