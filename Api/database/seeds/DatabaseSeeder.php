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
        $this->call(SoloTracksTableSeeder::class);
        $this->call(MergedTracksTableSeeder::class);
        $this->call(SoloTrackVotesTableSeeder::class);
        $this->call(MergedTrackVotesTableSeeder::class);
    }
}
