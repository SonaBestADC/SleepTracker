import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, username, password) => {
    setIsLoading(true);
    setError(null);

    const responce = await fetch(`/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const json = await responce.json();

    if (!responce.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (responce.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      return true;
    }
  };
  return { signup, isLoading, error };
};
