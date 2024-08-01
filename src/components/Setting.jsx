/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const Setting = ({ url, setUrl }) => {
  const [nat, setNat] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const updatedNat = checked ? [...nat, value] : nat.filter((x) => x !== value);
    setNat(updatedNat);
    const newUrl = `https://randomuser.me/api/?results=50&nat=${updatedNat.join(',')}`;
    setUrl(newUrl);
  };

  useEffect(() => {
    console.log(url);
  }, [url]);

  return (
    <div className="flex flex-col justify-center items-center w-64 bg-white p-8 m-4 border-2 border-gray-300 rounded-lg mx-auto mt-32 shadow-xl transition-transform transform lg:w-96 hover:scale-110">
      <div className="flex items-center space-x-2">
        <FaCog className="text-6xl text-blue-600 animate-spin-slow" />
        <h1 className='text-4xl font-bold text-blue-600'>Settings</h1>
      </div>
      <h2 className='text-2xl font-bold mt-6 text-gray-700'>Select Nationality</h2>
      <div className='flex flex-col space-y-4 mt-4'>
        <div className='flex items-center space-x-2'>
          <input id="ch" value="ch" type="checkbox" onChange={handleChange} className="h-5 w-5 text-blue-600 transition-transform transform hover:scale-110" />
          <label htmlFor="ch" className="text-xl text-gray-700">CH</label>
        </div>
        <div className='flex items-center space-x-2'>
          <input id="es" value="es" type="checkbox" onChange={handleChange} className="h-5 w-5 text-blue-600 transition-transform transform hover:scale-110" />
          <label htmlFor="es" className="text-xl text-gray-700">ES</label>
        </div>
        <div className='flex items-center space-x-2'>
          <input id="fr" value="fr" type="checkbox" onChange={handleChange} className="h-5 w-5 text-blue-600 transition-transform transform hover:scale-110" />
          <label htmlFor="fr" className="text-xl text-gray-700">FR</label>
        </div>
        <div className='flex items-center space-x-2'>
          <input id="gb" value="gb" type="checkbox" onChange={handleChange} className="h-5 w-5 text-blue-600 transition-transform transform hover:scale-110" />
          <label htmlFor="gb" className="text-xl text-gray-700">GB</label>
        </div> 
        <div className='flex items-center space-x-2'>
          <input id="gb" value="us" type="checkbox" onChange={handleChange} className="h-5 w-5 text-blue-600 transition-transform transform hover:scale-110" />
          <label htmlFor="gb" className="text-xl text-gray-700">US</label>
        </div> 
      </div>
      <button 
                className="bg-blue-600 text-1xl text-white rounded-lg lg:rounded-xl px-3 py-2 m-10 lg:px-8 lg:py-4 font-bold hover:bg-blue-950"
                onClick={() => {navigate('/');}}
            >
                HomePage
            </button>
    </div>
  );
};

export default Setting;
