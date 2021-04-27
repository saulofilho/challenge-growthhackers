import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo de 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <div>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="name" type="name" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Seu email" />
          <Input
            name="password"
            type="password"
            placeholder="sua senha secreta"
          />
          <button type="submit">Criar conta</button>
        </Form>
      </div>
    </>
  );
}
