import {FaSearch} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

function Header() {
  const {currentUser}=useSelector(state=>state.user);
  
  return (
    <header className='bg-blue-100 shadow-md'>
      <div className='flex justify-between max-w-6xl mx-auto p-3 items-center'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-blue-500'>Property</span>
            <span className='text-slate-900'>Estate</span>
        </h1>
        </Link>
        <form className='bg-white p-3 rounded-lg flex items-center'>
          <input className='bg-transparent focus:outline-none w-24 sm:w-60' type="text" placeholder="Search..."/>
          <FaSearch className='text-blue-600'/>
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