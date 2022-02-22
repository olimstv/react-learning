import './App.css'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Home from './components/Home'
import Watchlist from "./components/Watchlist";
export default function App(){

return (
    <div id="app">
        <Router>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/watchlist' element={<Watchlist />}></Route>
            </Routes>
        </Router>
    </div>
)
}

