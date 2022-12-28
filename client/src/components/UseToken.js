import { useState } from 'react';

const useToken = () => {

  function getToken() {
    console.log("GET TOKEN")
    const userToken = sessionStorage.getItem('token');
    return userToken && userToken
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    console.log("SAVE TOKEN")
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function removeToken() {
    console.log("REMOVE TOKEN")
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken
  }

}

export default useToken;