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
            'songname' => 'In waves',
            'file_url' => '02-trivium-in_waves.mp3',
            'artist_id' => 5
        ]); 

        DB::table('merged_tracks')->insert([
            'songname' => 'Davidian',
            'file_url' => 'Machine Head - Davidian.mp3',
            'artist_id' => 6
        ]); 
    }
}
