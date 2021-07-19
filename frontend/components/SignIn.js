import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import { SIGNIN_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';

export default function SignIn() {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signin({
      variables: {
        email: emailInput.current.value,
        password: passwordInput.current.value,
      },
    });
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <fieldset>
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            ref={emailInput}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            ref={passwordInput}
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </form>
  );
}
