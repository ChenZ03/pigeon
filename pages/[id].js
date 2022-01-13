import {useRouter} from 'next/router';
import NaviBar from '../components/partials/Navibar';

function WorkspaceChat() {
  const router = useRouter();
  const {id} = router.query;

  return <NaviBar />;
}

export default WorkspaceChat;
