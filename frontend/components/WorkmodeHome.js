import Link from 'next/link';

export default function WorkmodeHome() {
  return (
    <div>
      <h1 style={{ color: 'black' }}>Welcome. Let's get to work, shall we?</h1>
      <ul>
        <li>
          <Link style={{ color: 'black !important' }} href="/workmode">
            Edit Gallery
          </Link>
        </li>
        <li style={{ color: 'black' }}>Galleries</li>
        <li style={{ color: 'black' }}>Change my settings</li>
      </ul>
    </div>
  );
}
