import React, { useState } from 'react';
import styled from 'styled-components';
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';
import axios from 'utils/api';
import { useForm } from 'react-hook-form';
import { withRouter, Link as RouterLink } from 'react-router-dom';

interface IFormInput {
  email: string;
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

const ForgotPassword = ({ setToken }: any) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ data: { message: String[] }; error: boolean } | null>(null);

  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });

  const onSubmit = (data: IFormInput) => {
    setLoading(true);
    axios
      .post('forgotpassword', {
        email: data.email,
      })
      .then(({ data }) => {
        setLoading(false);
      })
      .catch(({ response }) => {
        setError(response.data);
        setLoading(false);
      });
  };

  return loading ? (
    <Root>
      <Header>Email Sent</Header>
    </Root>
  ) : (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>Forgot Password</Header>
        <MinLabel mb='7px'>Email</MinLabel>
        <Input
          name='email'
          ref={register({
            required: { value: true, message: 'Email required.' },
          })}
          mb='12px'
        />

        <Error>{error && error.error && error.data.message[0]}</Error>

        <Button type='submit'>Submit</Button>
      </Form>
    </Root>
  );
};

export default withRouter(ForgotPassword);
