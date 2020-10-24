import React from 'react';
import logo from './logo.svg';
// import MatchList from './components/match/match';
// import MatchDetail from './components/match/matchDetail';
import {Link, BrowserRouter, Route} from 'react-router-dom';
import HomePage from './pages/homepage';
import { RouterPathEnum } from './enums/RouterPathEnum';
import Routes from './routes/routes';
import Header from './components/header/header';
import Footer from './components/footer/footer';


function App() {
  return (

        <BrowserRouter>
         <Header />
       
         <Routes></Routes>
         <Footer />
        </BrowserRouter>
     
  );
}

export default App;
