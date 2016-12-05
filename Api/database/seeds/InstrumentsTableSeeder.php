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
            'name' => 'Guitar',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Drum',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Bass',
        ]);

        DB::table('instruments')->insert([
            'name' => 'Piano',
        ]);
    }
}
