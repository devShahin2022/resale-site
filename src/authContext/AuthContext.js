import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../fireBase/firebaseConfig';

const auth = getAuth(app);
export const AuthContextInfo = createContext();
const AuthContext = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [userInfoFromDb, setUserInfoFromDb] = useState({});
    
    
   
// role setup
const manageRole = (r) => {
    setRole(r);
}
// current user extra info

// provider login
const providerLogin = (provider) =>{
    return signInWithPopup(auth,provider);
}

// create user
const createUser = (email,password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
}

// sign in
const signIn = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword( auth,email,password);
}


// update profile
const addProfileNameAndImg = (profileName, profileImage) => {
    return updateProfile(auth.currentUser,{
        displayName: profileName , photoURL: profileImage
    });
}
// logout
const logOut = () => {
    setLoading(true);
    setUser(null);
    setRole('');
    setUserInfoFromDb({});
    return signOut(auth);
}

        useEffect( () => {
            const unsubscribe =  onAuthStateChanged(auth,(currentUser) => {
                if(currentUser && currentUser.uid){
                    const currentUserEmail = currentUser.email;
                    if(currentUserEmail){
                            fetch('http://localhost:5000/current-user-data',{
                            method : "POST",
                            headers : {
                                'content-type' : 'application/json'
                            },
                            body : JSON.stringify({currentUserEmail})
                        })
                        .then( async res => res.json())
                        .then( async data => {
                            setUserInfoFromDb(data[0]);
                            setUser(currentUser);
                            setLoading(false);
                        });
                    }
                }else{
                    setUser(currentUser);
                    setLoading(false);
                }
            });
            // set current user extra info from db
            return () => {
                unsubscribe();
            } 
    
        },[]);

    // console.log(' user info ', user);
    // console.log(' current info ', userInfoFromDb);

    const authInfo = {loading, user, providerLogin, createUser,
        signIn ,logOut, addProfileNameAndImg, manageRole, role,
        userInfoFromDb
    };

    return (
        <AuthContextInfo.Provider value={authInfo}>
            {children}
        </AuthContextInfo.Provider>
    );
};

export default AuthContext;