import {login, logout} from '../../actions/auth';

test ("should generate login action", ()=>{
    const result = login('sampleUID');
    expect(result).toEqual({
        type: 'LOGIN',
        uid: 'sampleUID'
    });
});

test ("should generate logout action", ()=>{
    const result = logout();
    expect(result).toEqual({
        type: 'LOGOUT'
    });
});