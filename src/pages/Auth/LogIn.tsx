import React, { useState } from 'react';
import styled from 'styled-components';
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';
import axios from 'utils/api';
import { setCookie } from 'utils/cookie';
import { useForm } from 'react-hook-form';
import { withRouter, Link as RouterLink } from 'react-router-dom';

interface IFormInput {
  empUserName: string;
  password: string;
}

const Root = styled(Panel)`
  padding: 16px;
  width: 420px;
  box-shadow: ${p => p.theme.shadows.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const MinLabel = styled(Label)`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.text.secondary};
`;

const Header = styled.label`
  display: flex;
  justify-content: center;

  font-size: 24px;
  font-weight: bold;
`;

const Error = styled.label`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.error};
  margin-bottom: 10px;
`;

const Link = styled(RouterLink)`
  font-size: 10px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${p => p.theme.colors.main};
  margin-top: 10px;
  text-decoration: none;
`;

const LogIn = ({ setToken }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ data: { message: String[] }; error: boolean } | null>(null);

  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });

  const onSubmit = (data: IFormInput) => {
    setLoading(true);
    axios
      .post('login', {
        empUserName: data.empUserName,
        password: data.password,
      })
      .then(({ data }) => {
        setCookie('token', data.data.token);
        setToken(data.data.token);
      })
      .catch(({ response }) => {
        setError(response.data);
        setLoading(false);
      });
  };

  return loading ? (
    <Root>
      <Header>Loading...</Header>
    </Root>
  ) : (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>Welcome Back!</Header>
        <MinLabel mb='7px'>Employee Username</MinLabel>
        <Input
          name='empUserName'
          ref={register({
            required: { value: true, message: 'Username required.' },
          })}
          mb='12px'
        />

        <MinLabel mb='5px'>Password</MinLabel>
        <Input
          name='password'
          ref={register({
            required: { value: true, message: 'Password required.' },
            minLength: {
              value: 6,
              message: 'Min length is 6.',
            },
            maxLength: {
              value: 30,
              message: 'Max length is 30.',
            },
          })}
          mb='12px'
          type='password'
        />
        <Error>{error && error.error && error.data.message[0]}</Error>

        <Button type='submit'>Log In</Button>
        <Link to='/signup'>Need an account? Register</Link>
        <Link to='/forgotpassword'>Forgot Password?</Link>
      </Form>
    </Root>
  );
};

export default withRouter(LogIn);
