<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMergedTracksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merged_tracks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('songname');
            $table->string('file_url');
            $table->double('track_length');

            $table->integer('artist_id')->unsigned();
            $table->foreign('artist_id')->references('id')->on('artists');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('merged_tracks');
    }
}
