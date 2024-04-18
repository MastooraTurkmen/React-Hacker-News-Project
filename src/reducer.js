import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true }
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        page: action.payload.page,
        nbPages: action.payload.nbPages,
      }
    case REMOVE_STORY:
      return {
        ...state, hits: state.hits.filter((story) => story.objectID !== action.payload)
      }
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, page: 0 }
    case HANDLE_PAGE:
      if (action.payload === 'inc') {
        let nexPage = state.page + 1;
        if (nexPage > state.nbPages - 1) {
          nexPage = 0
        }
        return { ...state, page: nexPage }
      }
      if (action.payload === 'dec') {
        let prevPage = state.page - 1;
        if (prevPage < 0) {
          prevPage = state.nbPages - 1
        }
        return { ...state, page: prevPage }
      }
    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer
