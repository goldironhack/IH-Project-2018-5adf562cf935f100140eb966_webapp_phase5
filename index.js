$(document).ready(function(){
    var map;
    $("#map").ready(function(){
        map=new google.maps.Map(document.getElementById('map'),{
            center: {lat: 40.7291, lng: -73.9996},
            zoom: 12
        });
            map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');
            map.data.setStyle(function(feature) {
          var color = 'green';
          if (feature.getProperty('isColorful')) {
            color = feature.getProperty('color');
          }
          return ({
            fillColor: color,
            strokeColor: color,
            strokeWeight: 2
          });
        });

        // When the user clicks, set 'isColorful', changing the color of the letters.
        map.data.addListener('click', function(event) {
          event.feature.setProperty('isColorful', true);
        });

        // When the user hovers, tempt them to click by outlining the letters.
        // Call revertStyle() to remove all overrides. This will use the style rules
        // defined in the function passed to setStyle()
        map.data.addListener('mouseover', function(event) {
          map.data.revertStyle();
          map.data.overrideStyle(event.feature, {strokeWeight: 8});
        });

        map.data.addListener('mouseout', function(event) {
          map.data.revertStyle();
        });
    });
     

   $.getJSON('https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD', function(results){
        console.log(Object.keys(results.data).length);
        var sizeJSON=Object.keys(results.data).length;
        var geomArray=[];
        var hashMapBoroughs= new Map();
        var hMNames=new Map();
        
        for (i in results.data){
            geomArray.push([results.data[i][9],results.data[i][16]]);
            hashMapBoroughs.set(results.data[i][16], null);
            hMNames.set(results.data[i][10],null);
        }
        

            console.log(hMNames);
            console.log(hashMapBoroughs);
        
        //for(i in geomArray){
            
        //    hashMap.set(geomArray[i][1],geomArray[i][0]);
         //   console.log(hashMap);
        //}


    });



      
});
