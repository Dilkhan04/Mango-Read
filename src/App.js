import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./css/index.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/aboutPage/AboutPage";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/aboutPage' element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
