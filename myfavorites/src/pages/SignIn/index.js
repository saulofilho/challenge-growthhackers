import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest, signOut } from '../../store/modules/auth/actions';
import { store } from '../../store';

import './styles.css';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email.')
    .required('Email is required.'),
  password: Yup.string().required('Password is required.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const { signed } = store.getState().auth;

  function handleSignOut() {
    dispatch(signOut());
  }

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <div className="align-center">
        <Link to="/">
          <p>⭐My Favorites⭐</p>
        </Link>
      </div>
      <div className="container-signin">
        {!signed ? <h1>Welcome</h1> : <h1>Bye</h1>}
        <Form schema={schema} onSubmit={handleSubmit}>
          {!signed ? (
            <>
              <Input name="name" type="name" placeholder="Your Name" />
              <Input name="email" type="email" placeholder="your@email.com" />
              <Input name="password" type="password" placeholder="123456" />
            </>
          ) : null}
          {signed ? (
            <button type="button" onClick={() => handleSignOut()}>
              Log out
            </button>
          ) : (
            <button type="submit">{loading ? 'Loading...' : 'Get in'}</button>
          )}
        </Form>
      </div>
    </>
  );
}
