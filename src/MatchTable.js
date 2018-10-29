import React, { Component } from 'react';
import common from './common';
import './MatchTable.css';

class MatchTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      headers: []
    }

    common.updateRawData = common.updateRawData.bind(this);
  }

  /**
    * @desc triggers when specify type of data in table column
  **/
  handleMatch(data, headers) {
    var columnMatch = this.formToJSON(document.getElementById('match'));
    var values = Object.values(columnMatch);
    var currentData = data.slice(0);
    currentData.unshift(values);

    var foundDuplicate = values.find((element, index) => (values.indexOf(element) !== index));

    if (foundDuplicate) {
      // if any type of data is selected more than once, do not proceed
      alert("Please select each type of data once only");
      return;
    } else if (values.includes('')) {
      // if any type of data is not selected, do not proceed
      alert("Please select type of data for all columns");
      return;
    } else if (currentData[0].length !== headers.length) {
      // if csv has invalid number of columns, do not proceed
      alert("Please upload csv with correct number of columns")
      return;
    }
    
    // otherwise, triggers re-render of google maps
    common.updateGoogleMaps(currentData, [], headers);
  }

  /**
    * @desc construct JSON from table
    * @parameter html table
    * @return JSON
  **/
  formToJSON(table){
    var keyName;
    var keyNames = [];
    var objectArray = [];
    var numOfCols = table.rows[0].cells.length;

    objectArray.push("{\n");
    
    for(var k = 0; k < numOfCols; k++){
      keyName = k;
      keyNames.push(keyName);
    }

    for (var j = 0; j < numOfCols; j++){
      var inputValue = table.rows[0].cells[j].children[0].value || '';

      objectArray.push("\"" + keyNames[j] + "\":\"" + inputValue + "\"");

      if(j < (numOfCols - 1)){
        objectArray.push(",\n");
      }
    }

    objectArray.push("\n}");
      
    return JSON.parse(objectArray.join(""));
  }

  render() {
    var headers = ["address", "city", "state", "zipcode", "category"];
    var options = headers.map((index) => {
      return (
        <option key={index} value={index}>{index}</option>
      )
    })

    var valueData = this.state.data;
    var value = valueData.map((i) => {
      var v = i.map((j) => {
        return <th key={j}>{j}</th>
      })

      return <tr key={i}>
        {v}
      </tr>
    })

    var headerData = this.state.data[0] || this.state.data;
    var header = headerData.map((i) => {
      return (
        <td key={i}>
          <select>
            <option value="">Please select</option>
            {options}
          </select>
        </td>
      )
    })

    return (
      <div>
        <label id="match-table-label">Select type of data for the corresponding columns</label>
        <input id="match_submit" type="submit" value="submit" onClick={this.handleMatch.bind(this, this.state.data, headers)} />
        <table id="match">
          <tbody>
            <tr>{header}</tr>
            {value}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MatchTable;
