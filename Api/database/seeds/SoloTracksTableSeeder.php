<?php

use Illuminate\Database\Seeder;

class SoloTracksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('solo_tracks')->insert([
            'songname' => 'Enter sandman',
            'file_url' => 'drum.mp3',
            'artist_id' => 3,
            'user_id' => 2,
            'instrument_id' => 3
        ]);

        DB::table('solo_tracks')->insert([
            'songname' => 'Enter sandman',
            'file_url' => 'guitar.mp3',
            'artist_id' => 3,
            'user_id' => 1,
            'instrument_id' => 1
        ]);
    }
}
