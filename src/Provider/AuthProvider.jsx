import { createContext, useEffect, useState } from 'react';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import app from '../Firebase/Firebase.Config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const auth = getAuth(app);
const AuthProviders = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  console.log(user);

  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (name, image, email) => {
    setLoading(true); // Set loading to true before the update
    return new Promise((resolve, reject) => {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
        email: email,
      })
        .then(() => {
          setUser({
            ...user,
            displayName: name,
            photoURL: image,
            email: email,
          });
          resolve(); // Resolve the promise if the update is successful
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          reject(error); // Reject the promise with the error if there's an error
        })
        .finally(() => {
          setLoading(false); // Set loading to false regardless of success or failure
        });
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo).then(res => {
          console.log('token', res.data.token);
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });
    return () => unSubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    createUser,
    signIn,
    logout,
    googleLogin,
    githubLogin,
    loading,
    setLoading,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
