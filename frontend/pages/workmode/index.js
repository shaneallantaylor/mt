import PleaseSignIn from '../../components/PleaseSignIn';
import WorkmodeHome from '../../components/WorkmodeHome';

export default function WorkmodePage() {
  return (
    <div>
      <PleaseSignIn>
        <WorkmodeHome />
      </PleaseSignIn>
    </div>
  );
}
