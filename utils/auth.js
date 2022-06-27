import { auth } from "../config/firebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";

export default function useProvideAuth() {
  const dispatch = useDispatch();

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            name: userAuth.user.displayName,
          })
        );
        // history.replace("/");
        alert("Successfully Logged In");
      })
      .catch((error) => alert(error.message));
  };

    const signout = () => {
      return signOut(auth)
        .then(() => {
          dispatch(
            logout()
          );
        });
    };

    const ResetPassword = (email) => {
      return sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset message sent Successfully to email")
        });
    };

  return {
    signin,
    signout,
    ResetPassword,
  };
}
