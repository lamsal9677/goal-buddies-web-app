import './App.css';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';
import axios from './Axios/axios.js';
import ProtectedRoutes from './components/protectedRoutes';
import UserContext from './context/UserContext';
import DebugDisplay from './components/DebugDisplay';
import Login from './pages/Login';
import Register from './components/Register';




function App() {
  const _token = JSON.parse(localStorage.getItem("authToken"));
  const [token, tokenDispatch] = useReducer(tokenReducer, _token)
  const [user, userDispatch] = useReducer(userReducer, {})
  
  // try to set the user every time the token changes
  useEffect(() => {
    if (token) {
      (async () => {
          try {
            const res = await axios.get("/user/getUser", { headers: { Authorization: `Bearer ${token}` } })
            userDispatch({ type: "user/setUser", payload: res.data.user })
          } catch (error) {
            userDispatch({ type: "user/unsetUser" })
          }
        }
      )();
    }
  }, [token])

  const showLogin = true;

  return (
    <UserContext.Provider value={{ token, tokenDispatch, user, userDispatch}}>
     { showLogin ? (<Login/>)
       :
      ( 
        <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<ProtectedRoutes/>}>
                <Route path="/:slug" component={DebugDisplay} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
      )
      }
    </UserContext.Provider>
  );
}

export default App;
