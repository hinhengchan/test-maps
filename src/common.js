var common = {
    updateRawData: function(data){
      this.setState({ 
        data: data
      });
      common.data = data;

      if (data.length > 0) {
        document.getElementById('match-container').style.display = "block";
      } else {
        document.getElementById('match-container').style.display = "none";
      }

      document.getElementById('google-maps').style.display = "none";
    },
    updateRawDataMaps: function(dataMaps){
      this.setState({ 
        dataMaps: dataMaps
      });

      if (dataMaps.length > 0) {
        document.getElementById('csv-buttons-label').style.display = "block";
      } else {
        document.getElementById('csv-buttons-label').style.display = "none";
      }
    },
    updateGoogleMaps: function(columnMatch){
      this.setState({ 
        columnMatch: columnMatch
      });
      common.locations = [];
      common.columnMatch = columnMatch;

      document.getElementById('match-container').style.display = "none";
      document.getElementById('google-maps').style.display = "block";
    },
    data: [],
    columnMatch: {},
    locations: [],
    googleApiKey: "AIzaSyBoU_G9Vlm_vf0KlhnmcPeA0pO3vl-7dnk"
}

export default common;