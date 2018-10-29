import React, { Component } from 'react';
import './CsvHistory.css';
import common from './common';

class CsvHistory extends Component {
  constructor(props) {
    super(props);

    common.updateRawDataMaps = common.updateRawDataMaps.bind(this);
  }

  /**
    * @desc triggers when uploaded csv is selected
  **/
  displayData(data) {
    // trigger to update data shown in table
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

export default CsvHistory;
