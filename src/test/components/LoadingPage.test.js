import {shallow} from 'enzyme';
import React from 'react';
import LoadingPage from '../../components/LoadingPage';

test ("LoadingPage should render properly",()=>{
    const wrapper = shallow(<LoadingPage/>);
    expect(wrapper).toMatchSnapshot();
});