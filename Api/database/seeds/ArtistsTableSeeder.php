<?php

use Illuminate\Database\Seeder;

class ArtistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('artists')->insert([
            'name' => 'Slayer'
        ]);

        DB::table('artists')->insert([
            'name' => 'Iron Maiden'
        ]);

        DB::table('artists')->insert([
            'name' => 'Metallica'
        ]);

        DB::table('artists')->insert([
            'name' => 'AC/DC'
        ]);

        DB::table('artists')->insert([
            'name' => 'Trivium'
        ]);
    }
}
