// common functions and variables
var common = {
  /**
    * @desc triggers when uploaded csv is clicked, for updating raw data to be displayed
    * @param array $data - array of address - eg.
        [
          ["one-family dwelling", "CA", "Foster City", "94404", "2545, 777 Shell Blvd"]
          ["restricted density multiple dwelling", "CA", "Menlo Park", "94025", "2800 Sand Hill Road"]
          ...
        ]
  **/
  updateRawData: function(data){
    this.setState({ 
      data: data
    });

    // if data is not empty, show match-container; otherwise, hide it
    if (data.length > 0) {
      document.getElementById('match-container').style.display = "block";
    } else {
      document.getElementById('match-container').style.display = "none";
    }

    document.getElementById('google-maps').style.display = "none";
  },
  /**
    * @desc triggers when new csv is uploaded, for updating raw data maps
    * @param array $dataMaps - array of uploaded address with csv name - eg.
        [
          {
            data: [
              ["one-family dwelling", "CA", "Foster City", "94404", "2545, 777 Shell Blvd"]
              ["restricted density multiple dwelling", "CA", "Menlo Park", "94025", "2800 Sand Hill Road"]
              ...
            ]
            name: "north.csv"
          },
          ...
        ]
  **/
  updateRawDataMaps: function(dataMaps){
    this.setState({ 
      dataMaps: dataMaps
    });

    // if dataMaps is not empty, show csv-buttons-label; otherwise, hide it
    if (dataMaps.length > 0) {
      document.getElementById('csv-buttons-label').style.display = "block";
    } else {
      document.getElementById('csv-buttons-label').style.display = "none";
    }
  },
  /**
    * @desc triggers when type of data is selected, for updating google maps
    * @param array $data - array of address with header - eg.
        [
          ["category", "state", "city", "zipcode", "address"]
          ["one-family dwelling", "CA", "Foster City", "94404", "2545, 777 Shell Blvd"]
          ["restricted density multiple dwelling", "CA", "Menlo Park", "94025", "2800 Sand Hill Road"]
          ...
        ]
    * @param array $locations - array of locations with lat, lng, and category - eg.
        [
          {
            "lat": "",
            "lng": "",
            "category": "one-family dwelling",
          }
          ...
        ]
  **/
  updateGoogleMaps: function(data, locations, headers){
    this.setState({
      data: data,
      locations: locations,
      headers: headers
    });

    document.getElementById('match-container').style.display = "none";
    document.getElementById('google-maps').style.display = "block";
  },
  // google maps api key
  googleApiKey: "AIzaSyBoU_G9Vlm_vf0KlhnmcPeA0pO3vl-7dnk"
}

export default common;