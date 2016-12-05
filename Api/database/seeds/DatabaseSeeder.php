<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(InstrumentsTableSeeder::class);
        $this->call(ArtistsTableSeeder::class);
        $this->call(Single_tracksTableSeeder::class);
        $this->call(Merged_tracksTableSeeder::class);
        $this->call(Single_track_votesTableSeeder::class);
        $this->call(Merged_track_votesTableSeeder::class);
        $this->call(User_Merged_trackTableSeeder::class);
        $this->call(User_InstrumentTableSeeder::class);
    }
}
