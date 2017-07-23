<?php

use Illuminate\Database\Seeder;

class SoloTrackVotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('solo_track_votes')->insert([
            'user_id' => 1,
            'solo_track_id' => 1
        ]);

        DB::table('solo_track_votes')->insert([
            'user_id' => 2,
            'solo_track_id' => 2
        ]);
    }
}
