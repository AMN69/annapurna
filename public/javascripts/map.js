/**
 * Moves the map to display over Berlin
 *
//  * @param  {H.Map} map      A HERE Map instance within the application
 */

 function moveMapToBerlin(map){
    map.setCenter({lat:41.38879, lng:2.15899});
    map.setZoom(10);
  }
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  // In your own code, replace variable window.apikey with your own apikey
  var platform = new H.service.Platform({
    apikey: "8h5lXXll3zO_hFQT2b_jH8x9NOGoi5OjhgQ3w8JBVYA"
    // apikey: process.env.API_KEY
    // apikey: window.apikey
  });
  var defaultLayers = platform.createDefaultLayers();
  
  //Step 2: initialize a map - this map is centered over Europe
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:50, lng:5},
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1
  });
  console.log("After map: ", map);
  // add a resize listener to make sure that the map occupies the whole container
  window.addEventListener('resize', () => map.getViewPort().resize());
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Now use the map as required...
  window.onload = function () {
    moveMapToBerlin(map);
  }
  
  