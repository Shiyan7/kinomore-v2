import { useEvent } from "effector-react";
import { authModel } from "features/auth";

export const PasswordForm = () => {
  const setFormState = useEvent(authModel.setFormState);
  const setProgress = useEvent(authModel.setProgress);

  /* FIXME */
  const cansel = () => {
    setFormState("email");
    setProgress(6);
  };

  return <div onClick={cansel}>cancel</div>;
};
