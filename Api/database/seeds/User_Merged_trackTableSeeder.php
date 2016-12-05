<?php

use Illuminate\Database\Seeder;

class User_Merged_trackTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
