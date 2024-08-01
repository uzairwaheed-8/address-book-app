/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactLoading from "react-loading";
import { SocialIcon } from 'react-social-icons';
import InfiniteScroll from "react-infinite-scroll-component";
import Modal from 'react-modal';
import FocusLock from "react-focus-lock";
import { FaCog } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

Modal.setAppElement("#root");

const Home = ({ url }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);

    const fetchData = async () => { 
        try {
            if (data.length >= 1000) {
                setHasMore(false);
                return;
            }
            const res = await fetch(url);
            const dat = await res.json();
            setData(prevData => [...prevData, ...dat.results]);
        } catch (error) {
            console.error(error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchData(); // Initial data fetch
    }, [url]);

    const openModal = (item) => {
        setModalData(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalData(null);
    };

    const cards = (data)=> data.map((item, key) => (
        <div key={key} className="flex flex-col items-center justify-center bg-white p-4 m-4 border-2 border-gray-300 rounded-lg shadow-xl hover:scale-105">
            <img src={item.picture.large} alt="profile" className="rounded-full w-40 h-40" />
            <h1 className="text-2xl font-bold text-black mt-4">{item.name.first} {item.name.last}</h1>
            <h6 className="text-xl font-bold text-black">@{item.login.username}</h6>
            <p className="text-sm text-black mt-1 inline-block md:text-sm lg:text-base">
                <SocialIcon network='email' bgColor="white" fgColor="black" /> {item.email}
            </p>
            <button 
                className="bg-blue-600 text-1xl text-white rounded-lg lg:rounded-xl px-3 py-2 m-10 lg:px-8 lg:py-4 font-bold hover:bg-blue-950"
                onClick={() => openModal(item)}
            >
                Details
            </button>
        </div>
    ));

    function handleSearchClick() {
        const filterBySearch = data.filter((item) => {
            if (item.name.first.toLowerCase().includes(search.toLowerCase())) { 
                return item; 
            }
        })
        setFilterData(filterBySearch);
    }
    return (
        <div>
            <header className="sticky top-0 border-b shadow-md min-w-max bg-white flex flex-col justify-between z-10">
                <div className='flex flex-row justify-between'> 
                    <h1 className="text-black font-bold text-2xl lg:text-3xl flex items-center justify-center ml-2 lg:px-44">Address Book App</h1>
                <button 
                    onClick={() => navigate('/settings')}
                    className="bg-blue-600 text-3xl text-white flex rounded-lg lg:rounded-xl px-4 py-3 mx-10 my-5 lg:px-8 lg:py-4 font-bold hover:bg-blue-950"
                >
                    <FaCog/> <span className='hidden pl-2 text-2xl md:block lg:block '>Settings</span>
                </button></div>
                <div className='flex justify-center pb-10 items-center'>
                <input className="border-4 px-2 py-2 ml-2 lg:px-20 lg:py-3 rounded-xl text-base lg:text-3xl " type="text" name="search" id="search-box"  placeholder='Enter Name to Search'  onChange={e => setSearch(e.target.value)}/>
                <button  className="bg-blue-600 text-3xl text-white flex rounded-lg lg:rounded-xl px-4 py-2 mx-10  lg:px-6 lg:py-3 font-bold hover:bg-blue-950" onClick={handleSearchClick}><FiSearch/><span className='hidden md:block lg:block pl-2 text-2xl'>Search</span></button>
                </div>
            </header>
        
            <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                    <div className='flex justify-center items-center pt-20 sm:pt-40'>
                        <ReactLoading type={"spin"} color="#0D47A1" height={'10%'} width={'10%'} />
                    </div>
                }
                endMessage={<h1 className='text-center pt-20 text-3xl lg:text-6xl font-bold text-zinc-600'>*** End of users catalog ***</h1>}
            >
                <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 '>
                    {search ? cards(filterData) : cards(data)}
                </div>
            </InfiniteScroll>

            {modalData && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={closeModal}
                    style={{
                        overlay: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        },
                        content: {
                            marginTop: "100px",
                            padding: "20px",
                            borderRadius: "15px",
                            width: "80%",
                            maxWidth: "500px",
                            position: "relative",
                            zIndex: "200",
                            // marginLeft: "auto",
                            // marginRight: "auto",
                        }
                    }}
                >
                    <FocusLock>
                        <h1 className='text-center text-5xl p-6 underline font-bold '>Details</h1>
                        <p className='text-center text-2xl '><span className='font-bold'>Street :</span> {modalData.location.street.name}#{modalData.location.street.number}</p>
                        <p className='text-center text-2xl'><span className='font-bold'>City :</span> {modalData.location.city}</p>
                        <p className='text-center text-2xl'><span className='font-bold'>State : </span> {modalData.location.state}</p>
                        <p className='text-center text-2xl '>  <span className='font-bold'>Post Code : </span>{modalData.location.postcode}</p>
                        <p className='text-center text-2xl'><span className='font-bold'>Phone :  </span>  +{modalData.phone}</p>
                        <p className='text-center text-2xl'>  <span className='font-bold'>Cell : </span> +{modalData.cell}</p>
                        <button className="bg-red-600 text-1xl text-white rounded-lg lg:rounded-xl px-3 py-2  lg:px-8 lg:py-4 font-bold hover:bg-red-950  float-right" onClick={closeModal}>Close</button>
                    </FocusLock>
                </Modal>
            )}
        </div>
    );
};

export default Home;
