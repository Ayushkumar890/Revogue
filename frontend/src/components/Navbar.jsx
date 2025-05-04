import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { FiSearch, FiShoppingCart, FiMenu } from 'react-icons/fi'
import ThemeBtn from './ThemeBtn'
import axios from 'axios'

const Navbar = () => {
  const [visible, setVisible] = useState(false)


  const {
    setShowSearch,
    getCartCount,
    backendUrl,
    token,
    navigate,
    setToken,
    setCartItems,
  } = useContext(ShopContext)
  const [isLoggedIn, setIsLoggedIn] = useState(!token); // set based on token initially
  // const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/logout', {
        withCredentials: true,
      });
      setToken('');
      setCartItems({});
      console.log(response.data.message);
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    setIsLoggedIn(!!token); // update when token changes
  }, [token]);

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <span className='text-[30px] md:text-[50px] text-orange-600'>Revogue</span>
      </Link>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-5 text-sm text-zinc-700 dark:text-zinc-300'>
        {['/', '/collection', '/about', '/contact'].map((path, idx) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${isActive ? 'text-black dark:text-white' : ''
              }`
            }
          >
            <p>
              {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'][idx]}
            </p>
            <hr className='w-2/4 border-none h-[1.5px] bg-zinc-700 hidden' />
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <ThemeBtn />
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <FiSearch
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          className='text-xl cursor-pointer text-black dark:text-white'
          aria-label='Search'
        />
        <div className='hidden md:block'>

          <p
            onClick={() => navigate('/orders')}
            className='cursor-pointer text-black dark:text-white'
          >
            Orders
          </p>
        </div>
        {/* Profile Icon */}
        <div className='group relative'>
          {/* <FiUser
            onClick={() => {
              if (!isLoggedIn) return navigate('/login')
              setDropdownOpen(prev => !prev)
            }} className='text-xl cursor-pointer text-black dark:text-white'
            aria-label='Profile'
          /> */}

          {/* Profile Icon / Auth Buttons */}
          <div className='group relative'>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              >
                Login
              </button>
            )}

          </div>

          {/* Dropdown */}
          {/* {isLoggedIn && dropdownOpen &&  (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-slate-800 text-gray-500 dark:text-gray-300 rounded'>
                <p className='cursor-pointer hover:text-black dark:hover:text-white'>
                  My Profile
                </p>
                <p
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black dark:hover:text-white'
                >
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className='cursor-pointer hover:text-black dark:hover:text-white'
                >
                  Logout
                </p>
              </div>
            </div>
          )} */}
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <FiShoppingCart
            className='text-xl text-black dark:text-white'
            aria-label='Cart'
          />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger / Menu Icon */}
        <FiMenu
          onClick={() => setVisible(true)}
          className='text-xl cursor-pointer sm:hidden text-black dark:text-white'
          aria-label='Open menu'
        />
      </div>


      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white dark:bg-[#111827] transition-all ${visible ? 'w-full' : 'w-0'
          }`}
      >
        <div className='flex flex-col text-zinc-600 dark:text-zinc-300'>
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'
          >
            <img
              src={assets.dropdown_icon}
              alt='Close'
              className='h-4 rotate-180'
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/'
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/collection'
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/about'
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/order'
          >
            ORDER
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className='py-2 pl-6 border'
            to='/contact'
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar
