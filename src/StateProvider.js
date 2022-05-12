import { createContext, useReducer } from 'react';
import reducer, { initialState } from './reducer';

export const StateContext = createContext({
  user: null,
  addCurrentUser: () => {},
  removeCurrentUser: () => {},
});

export const StateProvider = ({ children }) => {
  const [{ user }, dispatch] = useReducer(reducer, initialState);

  const addCurrentUser = (user) => {
    dispatch({
      type: 'SET_USER',
      user: user,
    });
  };
  const removeCurrentUser = () => {
    dispatch({
      type: 'SET_USER',
      user: null,
    });
  };

  const value = {
    user,
    addCurrentUser,
    removeCurrentUser,
  };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
