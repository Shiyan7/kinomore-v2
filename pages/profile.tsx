import { useEvent, useStore } from 'effector-react';
import { session } from 'entities/session';

const ProfilePage = () => {
  const data = useStore(session.$session);
  const logout = useEvent(session.logout);

  return (
    <div>
      {data?.user?.email}
      <button onClick={logout}>выйти</button>
    </div>
  );
};

export default ProfilePage;
