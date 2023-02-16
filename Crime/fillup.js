function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: 0},
      zoom: 8
    });
  
    var geocoder = new google.maps.Geocoder();
  
    document.querySelector('input[name="location-type"]').addEventListener('change', function() {
      if (this.value === 'address') {
        document.getElementById('address-input').style.display = 'block';
        document.getElementById('submit-btn').addEventListener('click', submitAddress);
      } else {
        document.getElementById('address-input').style.display = 'none';
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(pos);
          map.setZoom(16);
          var marker = new google.maps.Marker({
            position: pos,
            map: map
          });
        });
      }
    });
  
    function submitAddress() {
      var address = document.querySelector('input[name="address"]').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            map.setCenter(results[0].geometry.location);
            map.setZoom(16);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  }