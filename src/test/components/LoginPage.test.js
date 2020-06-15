import React from 'react';
import {shallow} from 'enzyme';
import {LogInPage} from '../../components/LoginPage';

test ("should render LoginPage properly", ()=>{
    const wrapper = shallow(<LogInPage startLogin={()=>{}}/>);
    expect(wrapper).toMatchSnapshot();
});

test ("should call login prop on click", ()=>{
    const loginSpy = jest.fn();
    const wrapper = shallow(<LogInPage startLogin={loginSpy}/>);
    wrapper.find('button').simulate('click');
    expect(loginSpy).toHaveBeenCalled();
});