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
    common.data = data;

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
    * @param obect $columnMatch - object of selected type of data for each column - eg.
        {
          0: "category"
          1: "state"
          2: "city"
          3: "zipcode"
          4: "address"
        }
  **/
  updateGoogleMaps: function(columnMatch){
    this.setState({ 
      columnMatch: columnMatch
    });
    common.locations = [];
    common.columnMatch = columnMatch;

    document.getElementById('match-container').style.display = "none";
    document.getElementById('google-maps').style.display = "block";
  },
  // raw data for display
  data: [],
  // type of data for each column
  columnMatch: {},
  /**
    * location responsed from google maps geocoder with associated category from csv, eg. 
      {
        "lat": "",
        "lng": "",
        "category": ""
      }
  **/ 
  locations: [],
  // google maps api key
  googleApiKey: "AIzaSyBoU_G9Vlm_vf0KlhnmcPeA0pO3vl-7dnk"
}

export default common;