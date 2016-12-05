<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'robindh',
            'email' => 'robin.deherdt@student.kdg.be',
            'password' => bcrypt('123456'),
        ]);

        DB::table('users')->insert([
            'username' => 'seppe G',
            'email' => 'seppe.goossens@student.kdg.be',
            'password' => bcrypt('123456'),
        ]);
    }
}
