import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { auth } from "../firebase";

const RootNavigator = () => {
  const [isLogged, setIsLogged] = React.useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return <div>{isLogged ? <MainStack /> : <AuthStack />}</div>;
};

export default RootNavigator;
