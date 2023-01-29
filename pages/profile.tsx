import { useEvent, useStore } from 'effector-react';
import { sessionModel } from 'entities/session';

const ProfilePage = () => {
  const data = useStore(sessionModel.$user);
  const isLoading = useStore(sessionModel.$isLoading);
  const logout = useEvent(sessionModel.logout);

  return (
    <div>
      {data?.email}
      <button onClick={() => logout()}>{isLoading ? 'загрузка' : 'выйти'}</button>
    </div>
  );
};

export default ProfilePage;
