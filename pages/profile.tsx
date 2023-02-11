import { useEvent, useStore } from 'effector-react';
import { sessionModel } from 'entities/session';

const ProfilePage = () => {
  const data = useStore(sessionModel.$session);
  const pending = useStore(sessionModel.$pending);
  const logout = useEvent(sessionModel.logout);

  return (
    <div>
      {data?.email}
      <button onClick={() => logout()}>{pending ? 'загрузка' : 'выйти'}</button>
    </div>
  );
};

export default ProfilePage;
