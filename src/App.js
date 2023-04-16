import React from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./scss/Index.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import AboutPage from "./pages/aboutPage/AboutPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/aboutPage/:id' element={<AboutPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
