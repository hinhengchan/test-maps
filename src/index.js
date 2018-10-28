import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CsvReader from './CsvReader';
import MatchTable from './MatchTable';
import GoogleMaps from './GoogleMaps';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CsvReader />, document.getElementById('csv-upload'));
ReactDOM.render(<MatchTable />, document.getElementById('match-container'));
ReactDOM.render(<GoogleMaps />, document.getElementById('google-maps'));

serviceWorker.unregister();
