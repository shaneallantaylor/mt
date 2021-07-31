import { useMutation } from '@apollo/client';
import { useRef } from 'react';
import styled from 'styled-components';
import { SIGNIN_MUTATION } from '../graphql/mutations';
import { CURRENT_USER_QUERY } from '../graphql/queries';
import { Button, TextInput, WorkmodeContainer } from '../styles';
import WorkmodeNav from './WorkmodeNav';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
  border-radius: 3px;

  p {
    font-size: 1rem;
    color: var(--black);
    background: #f78b8b;
    display: inline-block;
    padding: 10px 10px;
    margin: 20px 0;
    border-radius: 3px;
  }
`;

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
    console.log('res after signin is', res);
    if (
      res?.data?.authenticateUserWithPassword?.__typename ===
      'UserAuthenticationWithPasswordSuccess'
    ) {
      console.log('you logged in successfully@!');
    }
  }
  const error =
    data?.authenticateUserWithPassword.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <WorkmodeContainer>
      <WorkmodeNav isSignIn pageTitle="Gonna have to ask you to sign in." />
      {error && (
        <ErrorMessage>
          <p>
            Your credentials were fucked up. Please try again or text Shane.
          </p>
        </ErrorMessage>
      )}
      <form method="POST" onSubmit={handleSubmit}>
        <Grid>
          <div>
            <label htmlFor="email">
              <div>Email</div>
              <TextInput
                id="email"
                ref={emailInput}
                disabled={loading}
                aria-busy={loading}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <div>Password</div>
              <TextInput
                type="password"
                id="password"
                autoComplete="password"
                ref={passwordInput}
                disabled={loading}
                aria-busy={loading}
              />
            </label>
          </div>
        </Grid>
        <Button loading={loading.toString()} type="submit">
          {loading ? 'Thinking about it...' : 'Sign In'}
        </Button>
      </form>
    </WorkmodeContainer>
  );
}
