import logo from './logo.svg';
import './App.css';
import {useLocalStorage} from "./Components/LocalStorage/HandleLocalStorage";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoutes/ProtectedRoutes";
import HomePage from "./Pages/HomePage";

const App = () =>{

  const [user, setUser] = useLocalStorage("user", null)
  const [token, setToken] = useLocalStorage("token", null)

  return (
    <Routes>
      <Route>
        <Route index element={<HomePage/>}/>
        <Route path={"login"}/>
        <Route path={"register"}/>
      </Route>
      <Route element={<ProtectedRoute user={user}/>}>
        <Route index element={<HomePage/>}/>
        <Route path={"account"}/>
      </Route>
    </Routes>
  );
}

export default App;
