import { useEffect, useState } from 'react';
import {FaSearch} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

function Header() {
  const navigate=useNavigate();
  const {currentUser}=useSelector(state=>state.user);
  const [searchTerm,setSearchTerm]=useState('');
  useEffect(()=>{
    const urlParams=new URLSearchParams(window.location.search);
    const searchTermfromUrl=urlParams.get('searchTerm');
    if(searchTermfromUrl){
      setSearchTerm(searchTermfromUrl);
    }
  },[location.search]);
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`search?${searchQuery}`);
  }
  console.log(searchTerm);
  return (
    <header className='bg-slate-950 shadow-md w-full'>
      <div className='flex justify-between max-w-6xl mx-auto p-3 items-center'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-blue-500'>Property</span>
            <span className='text-slate-200'>Estate</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-slate-200 p-3 rounded-lg flex items-center'>
          <input className='bg-transparent focus:outline-none w-24 sm:w-60' type="text" placeholder="Search..."
          value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
          <button>
          <FaSearch className='text-blue-600'/>
          </button>
        </form>
        <ul className='flex items-center gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-blue-700 font-bold hover:underline'>Home</li>
          </Link>
          <Link to='/about'>
          <li className='hidden  sm:inline text-blue-700 font-bold hover:underline'>About</li>
          </Link>
          {currentUser?(
            <Link to='/profile'>
            <img className='rounded-full  h-8 w-8 object-cover'src={currentUser.avatar} alt='profile'/>
            </Link>
          ):(
          <Link to='/sign-in'>
          <li className='sm:inline text-blue-700 font-bold hover:underline'>Sign In</li>
          </Link>)
          }
        </ul>
        </div>
    </header>
  )
}

export default Header