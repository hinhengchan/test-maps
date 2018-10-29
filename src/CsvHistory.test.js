import React from 'react';
import CsvHistory from './CsvHistory';
import { shallow } from 'enzyme';

function generateTestDataMaps(num) {
	var dataMaps = [];

	for (var i = 0; i < num; i++) {
		dataMaps[i] = {};
		dataMaps[i].name = 'test' + i;
		dataMaps[i].data = [];
	}

	return dataMaps;
}

it('should render without crashing', () => {
	const dataMaps = generateTestDataMaps(0);
	shallow(<CsvHistory dataMaps={dataMaps}/>);
});

it('should render correct number of CsvHistory buttons (3)', () => {
	const dataMaps = generateTestDataMaps(3);
	const div = shallow(<CsvHistory dataMaps={dataMaps}/>);

	expect(div.find('.csv-button')).toHaveLength(3);
});