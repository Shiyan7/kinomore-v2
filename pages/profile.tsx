import { useEvent, useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { authModel } from 'features/auth';

const ProfilePage = () => {
  const { push } = useRouter();
  const data = useStore(authModel.$user);
  const logout = useEvent(authModel.startLogout);

  const handleLogout = () => {
    logout();
    push('/');
  };

  return (
    <div>
      {data?.email}
      <button onClick={handleLogout}>выйти</button>
    </div>
  );
};

export default ProfilePage;
