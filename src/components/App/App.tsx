import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from 'components/App/GlobalStyles';
import { getCookie } from 'utils/cookie';
import AppLayout from 'components/App/AppLayout';
import AuthLayout from 'pages/Auth/AuthLayout';
import axios from 'utils/api';

const App = () => {
  const [userData, setUserData] = useState(null);

  const [token, setToken] = useState(getCookie('token'));

  useEffect(() => {
    if (token) {
      axios
        .get('employee', {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setUserData({ ...data.data });
        })
        .catch(err => {
          setToken(null);
          console.log(err);
        });
    } else {
      setUserData(null);
    }
  }, [token]);

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        {userData ? (
          <Route
            exact
            render={() => <AppLayout userData={userData} handleUserData={setUserData} setToken={setToken} />}
          />
        ) : (
          <Route exact render={() => <AuthLayout handleUserData={setUserData} setToken={setToken} />} />
        )}
      </Switch>
    </Router>
  );
};

export default App;
