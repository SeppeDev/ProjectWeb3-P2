<?php

use Illuminate\Database\Seeder;

class InstrumentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('instruments')->insert([
            'name' => 'Leadguitar',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Rhythmguitar',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Drum',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Bass',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Vocals',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Piano',
        ]);


        DB::table('user_instrument')->insert([
            'user_id' => 2,
            'instrument_id' => 3
        ]);

        DB::table('user_instrument')->insert([
            'user_id' => 2,
            'instrument_id' => 2
        ]);

        DB::table('user_instrument')->insert([
            'user_id' => 1,
            'instrument_id' => 1
        ]);
    }
}
