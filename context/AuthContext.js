"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = { user: null };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      const userData = { ...action.payload }; // { id/empId/username, role, name... }
      localStorage.setItem("user", JSON.stringify(userData));
      return { user: userData };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      dispatch({ type: "LOGIN", payload: JSON.parse(stored) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
