import React, { useContext, useEffect, useState } from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("titanic");
  const [year, setYear] = useState(""); // State to store the year of release

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          msg: "",
        });
        setMovie(data.Search);
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut;
  if (query || year) {
    timerOut = setTimeout(() => {
      let apiUrl = `${API_URL}&s=${query}`;
      if (year) {
        apiUrl += `&y=${year}`;
      }
      getMovies(apiUrl);
    }, 800);
  }

  // Clear the timer if the component unmounts or if query or year changes before the timer elapses
  return () => clearTimeout(timerOut);
}, [query, year]);
  return (
    <AppContext.Provider
      value={{
        isLoading,
        isError,
        movie,
        query,
        setQuery,
        year,
        setYear,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
