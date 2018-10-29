import React from 'react';
import MatchTable from './MatchTable';
import { shallow, mount } from 'enzyme';

function generateTestData(row, column) {
	var data = [];

	for (var i = 0; i < row; i++) {
		data[i] = [];
		for (var j = 0; j < column; j++) {
			var random = Math.floor(Math.random() * 90000) + 10000;
			data[i][j] = random;
		}
	}

	return data;
}

it('should render without crashing', () => {
	shallow(<MatchTable />);
});

it('should render correct number of rows (20)', () => {
	const div = mount(<MatchTable />);
	const row = 20;
	const column = 5;

	expect(div.find('tr')).toHaveLength(1);

	div.setState({ data: generateTestData(row, column) });
	expect(div.find('tr')).toHaveLength(row + 1);	
});

it('should render header with correct number of selects (5)', () => {
	const div = mount(<MatchTable />);
	const row = 10;
	const column = 5;

	div.setState({ data: generateTestData(row, column) });
	expect(div.find('select')).toHaveLength(column);
});

it('should render header with correct values', () => {
	const div = mount(<MatchTable />);
	const row = 10;
	const column = 5;
	const expected = ['', 'category','city','state','address','zipcode'];

	div.setState({ data: generateTestData(row, column) });

	for (var i = 0; i <= column; i++) {
		var actual = [div.find('option').get(i).props.value];
		expect(expected).toEqual(expect.arrayContaining(actual));
	}
});