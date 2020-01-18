import Load from "./load.module.js";

export default {
  components: {},
  data() {
    return {

    }
  },
  mounted() {
    var mapInitData = {
        "world":{
            dir:"world",
            maxZoom: 3,
            minZoom: 0,
            points: [
                {
                    position: {lat: -73.04211326214397, lng: -82.6171875},
                    title: 'karnaca',
                    content: "<a href='/googlemap/karnaca'>karnaca</a>"
                },
                {
                    "position":{"lat":-60.65859881118676,"lng":-92.65424600916226},
                    "title":"dunwall",
                    "content":"<a href='/googlemap/dunwall'>dunwall</a>"
                }
            ]
        },
        "dunwall":{
            dir:"dunwall",
            maxZoom: 3,
            minZoom: 0,
            points: [
                {
                    "position":{"lat":55.694018488022834,"lng":-79.98046875},
                    "title":"dunwall",
                    "content":"<a href='/googlemap/dunwall-tower'>dunwall-tower</a>"
                }
            ]
        },
        "dunwall-tower":{
            dir:"dunwall-tower",
            maxZoom: 3,
            minZoom: 0,
            points: [
            ]
        },
        "karnaca":{
            dir:"karnaca",
            maxZoom: 5,
            minZoom: 0,
            points: [
                {
                    "position":{"lat":-14.008696370634672,"lng":4.116963855148361},
                    "title":"karnaca-dockyard-quarter",
                    "content":"<a href='/googlemap/karnaca-dockyard-quarter'>karnaca-dockyard-quarter</a>"
                },
                {
                    "position":{"lat":-29.3055613255277,"lng":6.755415712435724},
                    "title":"karnaca-addermire-institute",
                    "content":"<a href='/googlemap/karnaca-addermire-institute'>karnaca-addermire-institute</a>"
                },
                {
                    "position":{"lat":4.620026946074164,"lng":-95.6797291316964},
                    "title":"karnaca-aventa-district",
                    "content":"<a href='/googlemap/karnaca-aventa-district'>karnaca-aventa-district</a>"
                },
                {
                    "position":{"lat":31.82880614603213,"lng":2.5147139879529234},
                    "title":"karnaca-cyria-gardens",
                    "content":"<a href='/googlemap/karnaca-cyria-gardens'>karnaca-cyria-gardens</a>"
                }
            ]
        },
        "karnaca-dockyard-quarter":{
            dir:"karnaca-dockyard-quarter",
            maxZoom: 3,
            minZoom: 0,
            points: [
                
            ]
        },
        "karnaca-addermire-institute":{
            dir:"karnaca-addermire-institute",
            maxZoom: 3,
            minZoom: 0,
            points: [
                
            ]
        },
        "karnaca-aventa-district":{
            dir:"karnaca-aventa-district",
            maxZoom: 3,
            minZoom: 0,
            points: [
                {
                    "position":{"lat":28.497319404825117,"lng":114.57817516870828},
                    "title":"karnaca-aventa-district",
                    "content":"<a href='/googlemap/karnaca-aventa-district-jindosh-mansion'>karnaca-aventa-district-jindosh-mansion</a>"
                }
            ]
        },
        "karnaca-aventa-district-jindosh-mansion":{
            dir:"karnaca-aventa-district-jindosh-mansion",
            maxZoom: 3,
            minZoom: 0,
            points: [
                
            ]
        },
        "karnaca-cyria-gardens":{
            dir:"karnaca-cyria-gardens",
            maxZoom: 3,
            minZoom: 0,
            points: [
                
            ]
        },
    };

    var type = this.$route.params.type || "world";
    var mapData = mapInitData[type]
    
    const load = new Load();

    load.lib("https://api-maps.yandex.ru/2.1/?lang=ru_RU", {
        async:true, defer:true 
    }).then(()=>{
        ymaps.ready(function () {
        const LAYER_NAME = 'user#layer';
        const MAP_TYPE_NAME = 'user#customMap';
// Директория с тайлами.
    const TILES_PATH = 'assets';
/* Для того чтобы вычислить координаты левого нижнего и правого верхнего углов прямоугольной координатной
 * области, нам необходимо знать максимальный зум, ширину и высоту изображения в пикселях на максимальном зуме.
 */
    const MAX_ZOOM = 5;
    const PIC_WIDTH = 8192;
    const PIC_HEIGHT = 8192;

/**
 * Конструктор, создающий собственный слой.
 */
var Layer = function () {
    var layer = new ymaps.Layer(TILES_PATH + '/' + type + '/%z/%x_%y.png', {
        // Если есть необходимость показать собственное изображение в местах неподгрузившихся тайлов,
        // раскомментируйте эту строчку и укажите ссылку на изображение.
        // notFoundTile: 'url'
    });
    // Указываем доступный диапазон масштабов для данного слоя.
    layer.getZoomRange = function () {
        return ymaps.vow.resolve([0, 5]);
    };
    // Добавляем свои копирайты.
    layer.getCopyrights = function () {
        return ymaps.vow.resolve('©');
    };
    return layer;
};
// Добавляем в хранилище слоев свой конструктор.
ymaps.layer.storage.add(LAYER_NAME, Layer);

/**
 * Создадим новый тип карты.
 * MAP_TYPE_NAME - имя нового типа.
 * LAYER_NAME - ключ в хранилище слоев или функция конструктор.
 */
var mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
// Сохраняем тип в хранилище типов.
ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

// Вычисляем размер всех тайлов на максимальном зуме.
var worldSize = Math.pow(2, MAX_ZOOM) * 256,
    /**
     * Создаем карту, указав свой новый тип карты.
     */
    map = new ymaps.Map('map', {
        center: [0, 0],
        zoom: 2,
        controls: ['zoomControl'],
        type: MAP_TYPE_NAME
    }, {

        // Задаем в качестве проекции Декартову. При данном расчёте центр изображения будет лежать в координатах [0, 0].
        projection: new ymaps.projection.Cartesian([[PIC_HEIGHT / 2 - worldSize, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, worldSize - PIC_WIDTH / 2]], [false, false]),
        // Устанавливаем область просмотра карты так, чтобы пользователь не смог выйти за пределы изображения.
        restrictMapArea: [[-PIC_HEIGHT / 2, -PIC_WIDTH / 2], [PIC_HEIGHT / 2, PIC_WIDTH / 2]]

        // При данном расчёте, в координатах [0, 0] будет находиться левый нижний угол изображения,
        // правый верхний будет находиться в координатах [PIC_HEIGHT, PIC_WIDTH].
        // projection: new ymaps.projection.Cartesian([[PIC_HEIGHT - worldSize, 0], [PIC_HEIGHT, worldSize]], [false, false]),
        // restrictMapArea: [[0, 0], [PIC_HEIGHT, PIC_WIDTH]]
    });
});

    });
  },
  template: `
<div class="yandex-map" style="height: 100%;">
    <div id="map"></div>
</div>
`
};