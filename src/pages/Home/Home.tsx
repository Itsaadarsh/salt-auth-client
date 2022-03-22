import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { eraseCookie } from 'utils/cookie';
const Root = styled.div``;
const Home = ({ userData, setToken }: any) => {
  const onLogout = () => {
    eraseCookie('token');
    setToken(null);
  };

  return (
    <Root>
      <h1>Welcome to home page</h1>
      <div>Name: {userData.empUserName}</div>
      <div>Email: {userData.email}</div>
      <button onClick={() => onLogout()}>Logout</button>
    </Root>
  );
};

export default Home;
