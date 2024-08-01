import Home from './components/Home';
import Setting from './components/Setting';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
export default function App() {
  let nat='';
  const [url,seturl] = useState(`https://randomuser.me/api/?results=50&nat=${nat}`);
 
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/'  element={<Home url={url}/>}></Route>
          <Route path="settings" element={<Setting url={url} setUrl={seturl}/>} ></Route>
      </Routes>
    </BrowserRouter>
  );
}