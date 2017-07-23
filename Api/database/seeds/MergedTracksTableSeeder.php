<?php

use Illuminate\Database\Seeder;

class MergedTracksTableSeeder extends Seeder
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


        DB::table('user_merged_track')->insert([
            'user_id' => 1,
            'merged_track_id' => 1
        ]);

        DB::table('user_merged_track')->insert([
            'user_id' => 2,
            'merged_track_id' => 1
        ]);

        DB::table('user_merged_track')->insert([
            'user_id' => 1,
            'merged_track_id' => 2
        ]);

        DB::table('user_merged_track')->insert([
            'user_id' => 2,
            'merged_track_id' => 2
        ]);
    }
}
