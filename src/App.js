import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Main from './components/Main';
import Menu from './components/Menu';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <BrowserRouter>
    <>
     <Nav/>
     <Main/>
     <Menu/>
     <Testimonials/>
     <Footer/>
    </>
    </BrowserRouter>
  );
}


export default App;
