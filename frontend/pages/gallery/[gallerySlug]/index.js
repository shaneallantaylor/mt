import Gallery from '../../../components/Gallery';

export async function getServerSideProps(context) {
  console.log('context.query is', context.query);
  // returns { id: episode.itunes.episode, title: episode.title}

  // you can make DB queries using the data in context.query
  return {
    props: {
      id: context.query.id || null, // pass it to the page props
    },
  };
}

export default function GalleryPage() {
  return <Gallery />;
}
