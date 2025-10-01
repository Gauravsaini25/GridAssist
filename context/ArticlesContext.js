"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { articles as seedArticles } from "@/mock/articles";

const ArticlesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { articles: action.payload };
    case "ADD_ARTICLE":
      const updated = [action.payload, ...state.articles];
      localStorage.setItem("articles", JSON.stringify(updated));
      return { articles: updated };
    default:
      return state;
  }
}

export function ArticlesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { articles: [] });

  useEffect(() => {
    const stored = localStorage.getItem("articles");
    if (stored) {
      dispatch({ type: "INIT", payload: JSON.parse(stored) });
    } else {
      // seed from mock/articles
      dispatch({ type: "INIT", payload: seedArticles });
      localStorage.setItem("articles", JSON.stringify(seedArticles));
    }
  }, []);

  return <ArticlesContext.Provider value={{ state, dispatch }}>{children}</ArticlesContext.Provider>;
}

export function useArticles() {
  return useContext(ArticlesContext);
}
