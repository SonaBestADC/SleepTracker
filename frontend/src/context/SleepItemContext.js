import { createContext, useReducer } from "react";

export const SleepItemContext = createContext();

export const sleepItemReducer = (state, action) => {
  switch (action.type) {
    case "SET_SLEEP_ITEM":
      return {
        sleepItems: action.payload,
      };
    case "CREATE_SLEEP_ITEM":
      return {
        sleepItems: [action.payload, ...state.sleepItems],
      };
      case "DELETE_SLEEP_ITEM":
        return {
          sleepItems: state.sleepItems.filter((s) => s.id !== action.payload.id)
        };
  
    default:
      return state;
  }
};

export const SleepItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sleepItemReducer, {
    sleepItems: null,
  });

  return (
    <SleepItemContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SleepItemContext.Provider>)
    ;
};
