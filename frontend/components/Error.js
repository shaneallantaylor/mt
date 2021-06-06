export default function Error({ content }) {
  if (!content) return null;
  return <p>We got an error</p>;
}
