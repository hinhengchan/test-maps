import React, { Component } from 'react'
import CSVReader from 'react-csv-reader'
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

    if (dataMaps.length === 3) {
      dataMaps.shift();
    }

    dataMaps.push(dataMap);

    common.updateRawDataMaps(dataMaps);
  };

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

class CsvHistory extends Component {
  constructor(props) {
    super(props);

    common.updateRawDataMaps = common.updateRawDataMaps.bind(this);
  }

  displayData(data) {
    common.updateRawData(data);
  }

  render() {
    return (
      this.props.dataMaps.map((index) => {
        var name = index.name.replace('.csv', '');
        var data = index.data;
        return (
          <button id={name} key={name} className="csv-button" onClick={this.displayData.bind(this, data)}>{name}</button>
        )
      })
    )
  }
}

export default CsvReader;
