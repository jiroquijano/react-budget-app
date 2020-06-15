import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';
import toJSON from 'enzyme-to-json';

test ("should render Header correctly", ()=>{
   const wrapper = shallow(<Header startLogout={()=>{}} />);
   expect(toJSON(wrapper)).toMatchSnapshot();
});

test ("should call logout prop on click", ()=>{
   const onClickSpy = jest.fn();
   const wrapper = shallow(<Header startLogout={onClickSpy}/>);
   wrapper.find('button').simulate('click');
   expect(onClickSpy).toHaveBeenCalled();
});
