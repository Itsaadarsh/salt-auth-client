import React, { useState } from 'react';
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';
import axios from 'utils/api';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Link as RouterLink, useHistory, withRouter } from 'react-router-dom';
import { setCookie } from 'utils/cookie';

interface IFormInput {
  empUserName: string;
  email: string;
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

interface VFlexProps {
  ml?: string;
  mr?: string;
}

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

const SignUp = ({ setToken }: any) => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<{ data: { message: String[] }; error: boolean } | null>(null);

  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });

  const history = useHistory();

  const onSubmit = (data: IFormInput) => {
    setLoading(true);
    axios
      .post('register', {
        empUserName: data.empUserName,
        email: data.email,
        password: data.password,
      })
      .then(({ data }) => {
        setCookie('token', data.data.token);
        setToken(data.data.token);
        history.push('/login');
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
        <Header>Create an account</Header>

        <MinLabel mb='7px'>Email</MinLabel>
        <Input
          name='email'
          ref={register({
            required: { value: true, message: 'Email required.' },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email address.',
            },
          })}
          mb='12px'
        />

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

        <Button type='submit'>Sign Up</Button>
        <Link to='/login'>Already have an account?</Link>
      </Form>
    </Root>
  );
};

export default withRouter(SignUp);
