import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({ type: SET_STORIES, payload: { hits: data.hits, nbPages: data.nbPages } })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [])

  return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
