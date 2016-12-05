<?php

use Illuminate\Database\Seeder;

class User_InstrumentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
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
