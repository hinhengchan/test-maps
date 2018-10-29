import React from 'react';
import CsvReader from './CsvReader';
import { shallow, mount } from 'enzyme';

it('should render without crashing', () => {
	shallow(<CsvReader />);
});

it('should render correct number of CsvHistory buttons (3)', () => {
	const div = mount(<CsvReader />);

	expect(div.find('.csv-outer-container')).toHaveLength(1);
	expect(div.find('.csv-button')).toHaveLength(0);

	div.setState({ dataMaps: [{'name':'test0'},{'name':'test1'},{'name':'test2'}] });
	expect(div.find('.csv-button')).toHaveLength(3);	
});