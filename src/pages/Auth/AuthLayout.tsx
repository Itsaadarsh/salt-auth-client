import React from 'react';
import styled from 'styled-components';
import background from 'images/background-4.jpg';
import LogIn from 'pages/Auth/LogIn';
import SignUp from 'pages/Auth/SignUp';
import Panel from 'styled/Panel';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FORGOT_PASSWORD, LOG_IN, RESET_PASSWORD, SIGN_UP } from 'routes';

const Root = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url(${background});
  background-position: center;
  background-size: cover;
`;

const Header = styled(Panel)`
  margin-bottom: 20px;
  width: 420px;
  padding: 16px;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${p => p.theme.shadows.xl};
`;

const AuthLayout = ({ handleUserData, setToken }: any) => {
  return (
    <Root>
      <Header>Welcome to SLAT PE</Header>
      <Switch>
        <Route
          exact
          path={LOG_IN}
          render={() => <LogIn handleUserData={handleUserData} setToken={setToken} />}
        />
        <Route exact path={FORGOT_PASSWORD} render={() => <ForgetPassword />} />
        <Route exact path={RESET_PASSWORD} render={() => <ResetPassword />} />
        <Route
          exact
          path={SIGN_UP}
          render={() => <SignUp handleUserData={handleUserData} setToken={setToken} />}
        />
        <Redirect to={SIGN_UP} />
      </Switch>
    </Root>
  );
};

export default AuthLayout;
