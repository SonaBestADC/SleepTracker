import { useContext } from "react";
import { FriendsContext } from "../context/FriendsContext";

export const useFriendsContext = () => {
  const context = useContext(FriendsContext);

  if (!context)
    throw Error(
      "useFriendsContext must be used inside a FriendsContextProvider"
    );

  return context;
};
