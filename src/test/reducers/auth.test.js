import authReducer from '../../reducers/auth';

test ("should be able to set UID on login", ()=>{
    const loginAction = {
        type: 'LOGIN',
        uid: 'someUID'
    };
    const state = authReducer(undefined, loginAction);
    expect(state).toEqual({
        uid: loginAction.uid
    });
});

test ("should be able to logout", ()=>{
    const logOutAction = {
        type: 'LOGOUT'
    };
    const state = authReducer({uid: 'alreadyLoggedIn'}, logOutAction);
    expect(state).toEqual({});
});