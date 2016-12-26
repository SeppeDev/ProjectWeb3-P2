<?php

use Illuminate\Database\Seeder;

class Merged_tracksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merged_tracks')->insert([
            'songname' => 'Raining blood',
            'file_url' => 'placeholder.mp3',
            'track_length' => 254.121456,
            'artist_id' => 1
        ]); 

        DB::table('merged_tracks')->insert([
            'songname' => 'Angel of Death',
            'file_url' => 'placeholder.mp3',
            'track_length' => 254.121456,
            'artist_id' => 1
        ]); 
    }
}
