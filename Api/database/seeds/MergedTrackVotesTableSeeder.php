<?php

use Illuminate\Database\Seeder;

class MergedTrackVotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('merged_track_votes')->insert([
            'user_id' => 1,
            'merged_track_id' => 1
        ]);

        DB::table('merged_track_votes')->insert([
            'user_id' => 2,
            'merged_track_id' => 1
        ]);
    }
}
