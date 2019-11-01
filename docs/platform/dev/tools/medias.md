---
title: Medias
---

# Medias

## Image Magick

```bash
apt install imagemagick
apt update
apt install build-essential
apt build-dep imagemagick
./configure
```

but you might need some special parameters (check the installation docs for details on all the configurations available parameters) for ex.:

./configure --with-perl=no --with-magick-plus-plus=no --enable-shared --with-gs-font-dir=/usr/share/fonts/type1/gsfonts --x-includes=/usr/include/X11 --x-libraries=/usr/lib/X11

Now we can proceed with the actual compilation:

make
and if there are no errors with the installation:
make install
(this will install the files under /usr/local, since we have not overwritten the default prefix).
As a reminder that older software might not compile on newer and modern OSs (compilers, libraries, etc) the compilation fails on recent Debian Etch versions with:
png.c: In function 'WriteOneJNGImage':
png.c:7639: warning: dereferencing type-punned pointer will break strict-aliasing rules
png.c:7705: warning: dereferencing type-punned pointer will break strict-aliasing rules
make[1]: *** [png.lo] Error 1
make[1]: Leaving directory `/usr/local/src/ImageMagick-5.5.7/coders'
make: *** [all-recursive] Error 1
This is caused by newer versions of libpng12, and in order to compile imagemagick successfully I had to install version 1.2.8rel-7
(opposed to the latest version that is currently installed on etch 1.2.13-4)

Once the installation is completed we can verify the version we installed is working fine with:

/usr/local/bin/identify -version
Version: ImageMagick 5.5.7 12/21/06 Q16 http://www.imagemagick.org
Copyright: Copyright (C) 2003 ImageMagick Studio LLC

or

/usr/local/bin/convert -version
Version: ImageMagick 5.5.7 12/21/06 Q16 http://www.imagemagick.org
Copyright: Copyright (C) 2003 ImageMagick Studio LLC
and to get the listing of which image formats are supported on our system:
identify -list format
Format  Mode  Description
8BIM*  rw-  Photoshop resource format
8BIMTEXT*  rw-  Photoshop resource text format
8BIMWTEXT*  rw-  Photoshop resource wide text format
APP1*  rw-  Raw application information
APP1JPEG*  rw-  Raw JPEG binary data

convert picture.png picture.jpg 

## JMagick

apt install jmagick
Download source from :
+ http://www.yeo.id.au/jmagick/
+ http://www.jmagick.org/download.html
jMagick 6.2.4-1 for ImageMagick 6.2.4, 6.2.5
apt install libmagick++9-dev
./configure
./make

cp libJMagick.so /usr/lib
scp /usr/lib/libJMagick.so root@172.16.1.206:/usr/lib/
OR apt install jmagick ??? => UselibJMagick.so from apt !?!
cp /usr/lib/jni/libJMajick.so /usr/lib

## ffmpeg

+ MPG > MP3: ffmpeg -i video.flv -acodec copy audio.mp3
+ MPG > OGG: ffmpeg -i 1.mp4 -acodec libvorbis -vcodec libtheora -f ogg output.ogg
+ MPG > FLV; ffmpeg -i video.mpg -ar 22050 -ab 32 -f flv -s 320x240 -aspect 4:3 -y video.flv
+ AVI > FLV: ffmpeg -i video.avi -acodec mp3 -ar 22050 -ab 32 -f flv -s 320x240 video.flv
+ FLV Metadata: flvtool2 -U video.flv
+ Thumbnail: ffmpeg -y -i video.mpg -vframes 1 -ss 00:00:02 -an -vcodec png -f rawvideo -s 320x240 video.jpg
+ Play: ffplay video.flv

+ mp4 > animated gif
ffmpeg -i video.mp4  -r 5 'frames/frame-%03d.jpg'
# -r 5 stands for FPS value, for better quality choose bigger number
# %03d gives sequential filename number in decimal form
cd frames
convert -delay 20 -loop 0 *.jpg myimage.gif

screenrecorder: ffmpeg -y -f alsa -ac 2 -i pulse -f x11grab -r 25 -s 1920x1080 -i :0.0 -vcodec libx264 -vpre lossless_ultrafast -crf 22 -acodec libmp3lame -ar 44100 -ab 126k -threads 3 ~/Desktop/screencast.mkv

Add in /etc/apt/sources.list

deb http://packages.medibuntu.org/ feisty free non-free
deb-src http://packages.medibuntu.org/ feisty free non-free

apt update
apt install ffmpeg
apt install libavcodec0d ?
apt install w32codecs ?
apt install libavformat0d ?
apt install libpostproc0d ?
apt install mpg123 ?
apt install avifile-mjpeg-plugin ?
apt install libavifile-0.7c2 ?
apt install libswfdec0.3 ?

ffmpeg is a multiplatform, open-source library for video and audio files. I have compiled 19 useful and amazing commands covering almost all needs: video conversion, sound extraction, encoding file for iPod or PSP, and more.

Getting infos from a video file
ffmpeg -i video.avi

Turn X images to a video sequence
ffmpeg -f image2 -i image%d.jpg video.mpg

This command will transform all the images from the current directory (named image1.jpg, image2.jpg, etc…) to a video file named video.mpg.

Turn a video to X images
ffmpeg -i video.mpg image%d.jpg

This command will generate the files named image1.jpg, image2.jpg, …
The following image formats are also availables : PGM, PPM, PAM, PGMYUV, JPEG, GIF, PNG, TIFF, SGI.
Encode a video sequence for the iPpod/iPhone
ffmpeg -i source_video.avi input -acodec aac -ab 128kb -vcodec mpeg4 -b 1200kb -mbd 2 -flags +4mv+trell -aic 2 -cmp 2 -subcmp 2 -s 320x180 -title X final_video.mp4

Explanations :
    Source : source_video.avi
    Audio codec : aac
    Audio bitrate : 128kb/s
    Video codec : mpeg4
    Video bitrate : 1200kb/s
    Video size : 320px par 180px
    Generated video : final_video.mp4

Encode video for the PSP

ffmpeg -i source_video.avi -b 300 -s 320x240 -vcodec xvid -ab 32 -ar 24000 -acodec aac final_video.mp4

Explanations :
    Source : source_video.avi
    Audio codec : aac
    Audio bitrate : 32kb/s
    Video codec : xvid
    Video bitrate : 1200kb/s
    Video size : 320px par 180px
    Generated video : final_video.mp4

Extracting sound from a video, and save it as Mp3

ffmpeg -i source_video.avi -vn -ar 44100 -ac 2 -ab 192 -f mp3 pom.xmlsound.mp3

Explanations :
    Source video : source_video.avi
    Audio bitrate : 192kb/s
    output format : mp3
    Generated sound : sound.mp3

Convert a wav file to Mp3

ffmpeg -i son_origine.avi -vn -ar 44100 -ac 2 -ab 192 -f mp3 son_final.mp3

Convert .avi video to .mpg
ffmpeg -i video_origine.avi video_finale.mpg

Convert .mpg to .avi
ffmpeg -i video_origine.mpg video_finale.avi

Convert .avi to animated gif(uncompressed)
ffmpeg -i video_origine.avi gif_anime.gif

Mix a video with a sound file
ffmpeg -i son.wav -i video_origine.avi video_finale.mpg

Convert .avi to .flv
ffmpeg -i video_origine.avi -ab 56 -ar 44100 -b 200 -r 15 -s 320x240 -f flv video_finale.flv

Convert .avi to dv
ffmpeg -i video_origine.avi -s pal -r pal -aspect 4:3 -ar 48000 -ac 2 video_finale.dv

Or:
ffmpeg -i video_origine.avi -target pal-dv video_finale.dv

Convert .avi to mpeg for dvd players
ffmpeg -i source_video.avi -target pal-dvd -ps 2000000000 -aspect 16:9 finale_video.mpeg

Explanations :
    target pal-dvd : Output format
    ps 2000000000 maximum size for the output file, in bits (here, 2 Gb)
    aspect 16:9 : Widescreen

Compress .avi to divx
ffmpeg -i video_origine.avi -s 320x240 -vcodec msmpeg4v2 video_finale.avi

Compress Ogg Theora to Mpeg dvd
ffmpeg -i film_sortie_cinelerra.ogm -s 720x576 -vcodec mpeg2video -acodec mp3 film_terminÃ©e.mpg

Compress .avi to SVCD mpeg2

NTSC format:
ffmpeg -i video_origine.avi -target ntsc-svcd video_finale.mpg

PAL format:
ffmpeg -i video_origine.avi -target pal-svcd video_finale.mpg

Compress .avi to VCD mpeg2

NTSC format:
ffmpeg -i video_origine.avi -target ntsc-vcd video_finale.mpg

PAL format:
ffmpeg -i video_origine.avi -target pal-vcd video_finale.mpg

Multi-pass encoding with ffmpeg
ffmpeg -i fichierentree -pass 2 -passlogfile ffmpeg2pass fichiersortie-2

#!/bin/sh
for i in *.m4a; do
faad "$i"
x=`echo "$i" | sed -e 's/.m4a/.wav/'`
y=`echo "$i" | sed -e 's/.m4a/.mp3/'`
lame -h -b 192 "$x" "$y"
rm "$x"
done

#!/bin/sh
for i in *.mp4; do
ffmpeg -i "$i" -f mp3 -ab 192000 -vn "$i".mp3
done
ffmpeg -i 1.mp4  -f mp3 -ab 192000 -vn 1.mp3

## FLVTOOL2

apt install ruby
download from http://rubyforge.org/projects/flvtool2/
Untar it and execute the following commands inside the untared directory:
ruby setup.rb config
ruby setup.rb setup
sudo ruby setup.rb install
You can then use flvtool2 as a shell command.

# OpenCV

+ features
+ classification
+ search on google for "contour detection" and "patche detection"

## Office

```bash
soffice -headless -accept="socket,port=8100;urp"
soffice -accept="socket,host=127.0.0.1,port=8100;urp;OpenOffice.ServiceManager" -norestore -headless -invisible
soffice -accept=socket,host=localhost,port=8100;urp;
```

```bash
apt build-dep openoffice.org
apt install x-window-system-core
apt install gnome-desktop-environment
apt install gdm
apt-cache search openoffice*
apt remove openoffice*
sudo apt remove --purge openoffice.org-base
sudo apt remove --purge openoffice.org-calc
sudo apt remove --purge openoffice.org-draw
sudo apt remove --purge openoffice.org-impress
sudo apt remove --purge openoffice.org-math
sudo apt remove --purge openoffice.org-writer
sudo apt remove --purge openoffice.org-l10n-*
sudo apt remove --purge openoffice.org-core
sudo apt remove --purge openoffice.org-common
sudo apt install fakeroot alien
tar zxvf OOo_2.0.0_LinuxIntel_install.tar.gz
cd OOO680_m3_native_packed-2_en-US.8968/RPMS/
fakeroot alien -d *.rpm
dpkg -i *.deb
cd desktop-integration/
sudo dpkg -i openoffice.org-debian-menus_2.0.0-3_all.deb
apt source openoffice.org
apt build-dep openoffice.org (to install build dependencies)
   [ somehow broken yet probably because of the various |'s ]
cd <source directory>
debuild
dpkg-deb  -c openoffice.org-core_2.2.0-1ubuntu3_i386.deb
dpkg -i *.deb
```

## POI Scala

```scala
import info.folone.scala.poi._
import scalaz._
import syntax.monoid._
import syntax.foldable._
import std.list._
val sheetOne = Workbook {
   Set(Sheet("name") {
     Set(Row(1) {
       Set(NumericCell(1, 13.0/5), FormulaCell(2, "ABS(A1)"))
     },
     Row(2) {
       Set(StringCell(1, "data"), StringCell(2, "data2"))
     })
   },
   Sheet("name2") {
     Set(Row(2) {
       Set(BooleanCell(1, true), NumericCell(2, 2.4))
     })
   })
 }
val path = "/tmp/workbook.xls"

sheetOne.safeToFile(path).fold(ex ⇒ throw ex, identity).unsafePerformIO

val sheetTwo = Workbook {
        Set(Sheet("name") {
          Set(Row(1) {
            Set(StringCell(1, "newdata"), StringCell(2, "data2"), StringCell(3, "data3"))
          },
          Row(2) {
            Set(StringCell(1, "data"), StringCell(2, "data2"))
          },
          Row(3) {
            Set(StringCell(1, "data"), StringCell(2, "data2"))
          })
        },
        Sheet("name") {
          Set(Row(2) {
            Set(StringCell(1, "data"), StringCell(2, "data2"))
          })
        })
      }

import syntax.equal._
import syntax.equal._
```

```scala
val res = Workbook(path).fold(
  ex       => false,
  workbook => (workbook |+| sheetTwo) === (sheetOne |+| sheetTwo)
)
res: scalaz.effect.IO[Boolean] = scalaz.effect.IOFunctions$$anon$5@7ad4ad93

res.unsafePerformIO

import impure._

sheetOne.overwrite(path)

val mergeSheets = sheetOne |+| sheetTwo

val sheetOneReloaded = load(path)

val mergeSheets2 = sheetOneReloaded |+| sheetTwo

mergeSheets == mergeSheets2
```
