import React from 'react';
import styled from 'styled-components';
import Home from 'pages/Home/Home';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HOME } from 'routes';

const Root = styled.div``;

const AppLayout = ({ userData, handleUserData, setToken }: any) => {
  return (
    <Root>
      <Switch>
        <Route
          exact
          path={HOME}
          render={() => <Home userData={userData} handleUserData={handleUserData} setToken={setToken} />}
        />
        <Redirect to={HOME} />
      </Switch>
    </Root>
  );
};

export default AppLayout;
