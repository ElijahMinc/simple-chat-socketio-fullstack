const { useContext } = require("react");
const { createContext, useReducer } = require("react");
const { initialState, default: reducer } = require("../store/reducer");

const AppContext = createContext();


export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const appDispatch = (action = {}) => dispatch(action)


  const value = {
      dispatch: appDispatch,
      state
  }

   return <AppContext.Provider value={value}>
      {children}
   </AppContext.Provider>
}


export const useAppContext = () => useContext(AppContext)