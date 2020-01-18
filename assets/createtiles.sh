#!/bin/bash
DIRSCRIPT=$(dirname $0);
DIRFILE=$(dirname $1);

createZoomDir(){
    local size=$(((1 << $1) * $2));

    rm -rf $DIRFILE/${1};
    
    convert $DIRFILE/transparent.png -resize ${size} $DIRFILE/${1}.png
    mkdir $DIRFILE/${1}; 

    convert $DIRFILE/${1}.png -crop ${2}x${2} -set filename:tile "%[fx:page.x/${2}]_%[fx:page.y/${2}]" +repage +adjoin "${DIRFILE}/${1}/%[filename:tile].png";

    rm $DIRFILE/${1}.png;

    echo "${size}";
}

IFS=" x+" read w h x y < <(convert $1 -format "%@" info:)

echo "1. Ширина и высота изображения ${w}x${h}";

longest=$w
[ $h -gt $longest ] && longest=$h

echo "2. Большие значение из них это  ${longest}, делаем квадрат с этой стороной";

convert $1 -gravity center -extent ${longest}x${longest} $DIRFILE/result.jpg;
convert $DIRFILE/result.jpg -transparent white $DIRFILE/transparent.png;

let size=0;
let counter=0;

while [ $size -le $longest ]; do
    size=$(createZoomDir ${counter} 256)
    echo "создан зум ${counter} размером ${size}";
    counter=$(($counter+1));
done

rm $DIRFILE/result.jpg;
rm $DIRFILE/transparent.png;