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

    load.lib("https://maps.googleapis.com/maps/api/js", {
        async:true, defer:true 
    }).then(()=>{
        const getNormalizedCoord = function (coord, zoom) {
            var y = coord.y;
            var x = coord.x;
            var tileRange = 1 << zoom;
    
            if (y < 0 || y >= tileRange) {
              return null;
            }
            
            if (x < 0 || x >= tileRange) {
              x = (x % tileRange + tileRange) % tileRange;
            }
    
            return {x: x, y: y};
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            zoom: 1,
            streetViewControl: false,
            mapTypeControlOptions: {
            mapTypeIds: [type]
            }
        });

        var moonMapType = new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                var normalizedCoord = getNormalizedCoord(coord, zoom);
                if (!normalizedCoord) {
                return null;
                }
                var bound = Math.pow(2, zoom);
                
                return '/assets/' + mapData.dir + '/' + zoom + '/' + normalizedCoord.x + '_' + ( normalizedCoord.y) + '.png';
            },
            tileSize: new google.maps.Size(256, 256),
            maxZoom: mapData.maxZoom,
            minZoom: mapData.minZoom,
            radius: 1738000,
            name: type
        });

        map.mapTypes.set(type, moonMapType);
        map.setMapTypeId(type);

        map.addListener( "click", function(e) {
            var myLatLng = e.latLng;
            
            console.log(JSON.stringify({
                position: myLatLng,
                title: type,
                "content":"<a href='/googlemap/world'>world</a>"
            }));
        })


        mapData.points.forEach(item=>{
            let marker = new window.google.maps.Marker({
                position: item.position,
                map,
                title: item.title
            });
    
            var infowindow = new google.maps.InfoWindow({
                content: item.content
            });
    
            marker.addListener('click', function() {
                map.setZoom(3);
                map.setCenter(marker.getPosition());
                infowindow.open(marker.get('map'), marker);
            });
        });

    });

  },
  template: `
<div class="google-map" style="height: 100%;">
    <div id="map"></div>
</div>
`
};