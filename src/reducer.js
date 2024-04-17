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
    default:
      throw new Error(`no matching "${action.type}" action type`)
  }
}
export default reducer
