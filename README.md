# Discoverband

## Back end
* cd Api
* composer install
* cp .env.example .env
* Edit .env
* php artisan key:generate
* php artisan migrate --seed
* chown -R www-data:www-data storage/
* Set up apache to host "Api/public" as "discoverband.api"

## Front end
* cd Web
* npm install
* gulp init
* Set up apache to host "Web" as "discoverband.local"

## Compile sox with mp3 support (Ubuntu 16.04 LTS)

Download the latest source for libmad, lame and sox (.tar.gz or .tar.bz2)

> https://sourceforge.net/projects/mad/files/libmad/  
> https://sourceforge.net/projects/lame/files/lame/  
> https://sourceforge.net/projects/sox/files/sox/  

#### Unpack archives
e.g. tar -xzvf archive.tar.gz

#### Lame
1. ./configure
2. make
3. sudo make install

#### Libmad
1. ./configure
2. Remove ‘-fforce-mem’ from ‘makefile’
3. make
4. sudo make install

#### Sox
1. ./configure
2. check OPTIONAL FILE FORMATS: 

    > mp2/mp3: yes  
    > lame: yes  
    > mad: yes  
    
3. make -s
4. sudo make install
5. sudo ldconfig