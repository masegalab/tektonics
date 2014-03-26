---
layout: default
title: Earthquakes
---

<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet' />

<div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <div id="map" style="height:600px;"></div>
        </div>
        <div class="col-md-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
</div>


<script type="text/javascript">
    // Create a map in the div #map
    L.mapbox.map('map', 'pnavarrc.hkfg0gbf')
        .setView([0, 0], 6);
</script>