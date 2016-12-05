<?php

use Illuminate\Database\Seeder;

class Single_track_votesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('single_track_votes')->insert([
        	'user_id' => 1,
            'single_track_id' => 1
        ]); 

        DB::table('single_track_votes')->insert([
        	'user_id' => 2,
            'single_track_id' => 2
        ]); 
    }
}
