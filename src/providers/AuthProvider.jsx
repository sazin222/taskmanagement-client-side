/* eslint-disable react/prop-types */
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import firebaseAuth from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();


const AuthProvider = ({ children }) => {
    const Auth = app
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [resolver, setResolver] = useState(false);
    const [observeAddReview, setObserveAddReview] = useState(false);
    const axiosPublic = useAxiosPublic();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(Auth, provider);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(firebaseAuth);
    }

    const info = {
        loading,
        setLoading,
        user,
        googleSignIn,
        loginUser,
        registerUser,
        logOut,
        resolver,
        setResolver,
        observeAddReview,
        setObserveAddReview
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, currUser => {
            setUser(currUser);
           
            if (currUser) {
                
                const userInfo = { email: currUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        // console.log(res);
                        if (res?.data?.token) {
                            localStorage.setItem('access-token', res?.data?.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            /*---------JWT TOKEN----------*/
        });

        return () => {
            return unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;