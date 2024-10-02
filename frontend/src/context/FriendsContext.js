import { createContext, useReducer, useEffect } from "react";

export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FRIEND":
      return {
        friends: action.payload,
      };
    case "ADD_FRIEND":
      return {
        friends: [action.payload, ...state.friends],
      };
    case "DELETE_FRIEND":
      return {
        friends: state.friends.filter(
          (s) => s.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const FriendsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendsReducer, {
    friends: [],
  });

  return (
    <FriendsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FriendsContext.Provider>
  );
};
