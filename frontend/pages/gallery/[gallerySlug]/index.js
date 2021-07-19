import Gallery from '../../../components/Gallery';

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id || null, // pass it to the page props
    },
  };
}

export default function GalleryPage() {
  return <Gallery />;
}
