import React, { useState } from 'react';
import styled from 'styled-components';
import Panel from 'styled/Panel';
import Input from 'styled/Input';
import Button from 'styled/Button';
import Label from 'styled/Label';
import axios from 'utils/api';
import { useForm } from 'react-hook-form';
import { withRouter, Link as RouterLink, useHistory } from 'react-router-dom';

interface IFormInput {
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

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, _] = useState<{ data: { message: String[] }; error: boolean } | null>(null);

  const { register, handleSubmit } = useForm<IFormInput>({
    mode: 'all',
  });

  const history = useHistory();
  const onSubmit = (data: IFormInput) => {
    const params = new URLSearchParams(document.location.search);
    const key = params.get('key');

    setLoading(true);
    axios
      .post(`forgotpassword/${key}`, {
        password: data.password,
      })
      .then(({ data }) => {
        history.push('/login');
        setLoading(false);
      })
      .catch(({ response }) => {
        setLoading(false);
      });
  };

  return loading ? (
    <Root>
      <Header>Password Reset Successfully</Header>
    </Root>
  ) : (
    <Root>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Header>Reset Password</Header>
        <MinLabel mb='5px'>Password</MinLabel>
        <Input
          name='password'
          ref={register({
            required: { value: true, message: 'Password required.' },
            minLength: {
              value: 5,
              message: 'Min length is 5.',
            },
            maxLength: {
              value: 20,
              message: 'Max length is 30.',
            },
          })}
          mb='12px'
          type='password'
        />
        <Error>{error && error.error && error.data.message[0]}</Error>

        <Button type='submit'>Submit</Button>
      </Form>
    </Root>
  );
};

export default withRouter(ResetPassword);
