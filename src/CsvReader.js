import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import CsvHistory from './CsvHistory';
import './CsvReader.css';
import common from './common';

class CsvReader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataMaps: [],
      data: []
    }

    common.updateRawDataMaps = common.updateRawDataMaps.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  /**
    * @desc trigger when new csv is uploaded
  **/
  handleUpload(data, filename) {
    var dataMaps = this.state.dataMaps;
    var dataMap = {};
    dataMap.name = filename;
    dataMap.data = data;

    // do not upload if filename already exists
    if (dataMaps.map(a => a.name).includes(dataMap.name)) {
      alert('CSV has already been uploaded');
      return;
    }

    // only keep 3 previously uploaded csv
    if (dataMaps.length === 3) {
      dataMaps.shift();
    }

    dataMaps.push(dataMap);

    // trigger to update upload history
    common.updateRawDataMaps(dataMaps);
  };

  /**
    * @desc triggers when reset button is clicked
  **/
  resetData() {
    common.updateRawDataMaps([]);
    common.updateRawData([]);
  }

  render() {
    return (
      <div className="csv-outer-container">
        <CSVReader
          cssClass="csv-container"
          label="Upload CSV"
          onFileLoaded={this.handleUpload}
        />
        <button id="reset" onClick={this.resetData}>reset</button>
        <div className="csv-buttons">
          <label id="csv-buttons-label">Select CSV</label>
          <CsvHistory dataMaps={this.state.dataMaps}/>
        </div>
      </div>
    )
  }
}

export default CsvReader;
