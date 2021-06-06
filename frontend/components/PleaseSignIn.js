import { useUser } from '../hooks';
import SignIn from './SignIn';

export default function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}
