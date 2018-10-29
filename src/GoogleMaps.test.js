import React from 'react';
import GoogleMaps from './GoogleMaps';
import { shallow } from 'enzyme';

it('should render without crashing', () => {
	shallow(<GoogleMaps />);
});