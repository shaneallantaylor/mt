import { toast } from 'react-toastify';

export function testToast() {
  const Custom = () => (
    <div>
      <p>Party!</p>
      <button type="button">This is a button</button>
    </div>
  );
  return toast(<Custom />);
}

export function renderSuccessToast() {
  return toast.success('🎯 You did it champ! 🎯', {
    style: {
      fontSize: '1rem',
      fontFamily: 'Noto Sans JP',
      color: 'var(--black)',
      background: '#7dff99',
    },
  });
}
