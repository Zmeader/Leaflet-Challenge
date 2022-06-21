async function main(){
  const queryUrl= 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
  const response =  await fetch(queryUrl);
  data = await response.json()
  features = data.features
  console.log(features)

  earthquakes = [];

  for (i=0; i < features.length; i++) {
    var quake = features[i];
    var mag = quake.properties.mag;
    var depth = quake.geometry.coordinates[2];
    var stamp = quake.properties.time;
    var date = new Date(stamp)
    // console.log(date.getTime)
    // console.log(date)

  
      var color = "";
      switch(true){
        case (mag > 5):
            color = "#cb4f4f";
            break;
        case (mag > 4):
            color = '#DCED11';
            break;
        case (mag > 3):
            color = "#EDD911";
            break;
        case (mag > 2):
            color = "#EDB411";
            break;
        case (mag > 1):
            color = "#ceedc0";
        default:
            color = "#8fce00";
        }

        markers = L.circle([quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
          opacity: 1,
          fillOpacity: 1,
          fillColor: color,
          color: color,
          weight: 2,
          radius: mag * 10000
        }).bindPopup("Date: " + new Date(quake.properties.time) + 
            "<br> Place:" + quake.properties.place + "<br> Magnitute: " + quake.properties.mag);
       
          earthquakes.push(markers)}

      
          var quakelayer = L.layerGroup(earthquakes)

          var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          })

          var baseMaps = {
              "Street Map": streetmap
              };
            
              var overlayMaps = {
              Earthquake: quakelayer
              }

              var map = L.map("map", {
              center: [40.80, -96.681],
              zoom: 4,
              layers: [streetmap, quakelayer]
              });
            
              L.control.layers(baseMaps, overlayMaps, {
                collapsed: false
              }).addTo(map);
            
              var legend= L.control({
                position: 'bottomright',
              });
              
              legend.onAdd = function(map) {
                    var div = L.DomUtil.create("div", "info legend");
                    var grades = [0, 1, 2, 3, 4, 5];
                    var colors = [
                        "#ceedc0",
                        "#8fce00",
                        "#EDB411",
                        "#EDD911",
                        "#DCED11",
                        "#cb4f4f"
                        ];
            
                //create title
                var legendtitle="<h4> Earthquake Magnitude</h4>";
                div.innerHTML=legendtitle
                
                // create labels array for legend values
                var labels=[];
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                      "<i style='background:" +colors[i]+ "'></i> " +
                     grades[i] + (grades[i + 1] ? "&ndash;"  + grades[i + 1] + '<br>': "+");
                    }
                    return div;
                  };
            
            
            legend.addTo(map)    


        //   var legend = L.control({
        //     position: "bottom-right"
        //   })

        //   legend.onAdd = function(map) {
        //     var div = L.DomUtil.create("div", "info legend");
        //     var grades = [0, 1, 2, 3, 4, 5];
        //     var legendColors = [
        //         "#98ee00",
        //         "#d4ee00",
        //         "#eecc00",
        //         "#ee9c00",
        //         "#ea822c",
        //         "#ea2c2c"
        //         ];
        //   var legendtitle="<h4> Earthquake Depth (km)</h4>";
        //         div.innerHTML=legendtitle

        //   var labels=[];
        // for (var i = 0; i < grades.length; i++) {
        //     div.innerHTML +=
        //       "<i style='background: " + legendColors[i] + "'></i> " +
        //      grades[i] + (grades[i + 1] ? ""  + "<br>" : "");
        //     }
        //     return div;
        //   };
        //   legend.addTo(map);
        
      };
  main()












////////////////////////////////////////////////////////////////////////////////////

// var map = L.map("map", {
//     center: [40.80, -96.681],
//     zoom: 4,
//   });

// d3.json(queryUrl, function(data) {
//   createFeatures(data.features);
// })

// function createFeatures(quakeData) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("Date: " + new Date(feature.properties.time) + 
//     "<br> Place:" + feature.properties.place + "<br> Magnitute: " + feature.properties.mag);
//   }


// function markerSize(mag) {
//   return mag * 10
// }

// function colors(color) {
//   if (color < 1){
//     return "#B7DF5F"
//   }
//   else if (color < 2) {
//     return "#DCED11"
//   }
//   else if (color < 3){
//     return "#EDD911"
//   }
//   else if (color < 4){
//     return "#EDB411"
//   }
//   else if (color < 5 ){
//     return "#ED7211"
//   }
//   else {
//     return "#ED4311"
//   }
// };

// function marker(feature, latlng) {
//   var markerOptions = {
//     radius: markerSize(feature.properties.mag),
//     fillColor: colors(feature.properties.mag),
//     color: "black",
//     weight: 2,
//     opacity: 2,
//     fillOpacity: 0.8
//   }
//   return L.circleMarker(latlng, markerOptions)
// }

// var earthquakes = L.geoJSON(quakeData, {
//   onEachFeature: onEachFeature,
//   pointToLayer: marker
// });

// createMap(earthquakes);
// }

// function createMap(earthquakes) {
//   var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   })

//   var baseMaps = {
//   "Street Map": streetmap
//   };

//   var overlayMaps = {
//   Earthquakes: earthquakes
//   }
//   var map = L.map("map", {
//   center: [40.80, -96.681],
//   zoom: 4,
//   layers: [streetmap, earthquakes]
//   });

//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }


// d3.json(queryUrl, function(data) {
//     console.log(data)
//     var earthquakes = data.features
//     console.log(earthquakes)
//     earthquakes.forEach(function(result){
//       L.geoJSON(result,{
//         pointToLayer: marker
//       }).bindPopup("Date: " + new Date(result.properties.time) + "<br> Place:" + result.properties.place + "<br> Magnitute: " + result.propoerties.mag).addTo(map)
//     })
// })


// function createFeatures(earthquake) {
//     var quake = quakeData.features.place
//     console.log(quake)
// }
