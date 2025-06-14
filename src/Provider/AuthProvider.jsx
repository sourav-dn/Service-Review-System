import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import axios from "axios";
export const Authcontext = createContext(null)

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // const logOut = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (loggedUser) => {
      if (loggedUser) {
        setUser(loggedUser);
        // Optionally: You can fetch JWT here instead of Login page
        try {
          await axios.post(
            "http://localhost:3000/jwt",
            { email: loggedUser.email },
            { withCredentials: true }
          );
        } catch (error) {
          console.error("JWT fetch error:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const authInfo = { user, loading, createUser, userLogin, logOut, googleLogin,
 updateUserProfile, setUser };

  return (
    <Authcontext.Provider value={authInfo}>
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;