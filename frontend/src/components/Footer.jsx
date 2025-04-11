import React from 'react'
// import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-4'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <div>
            <span className='text-[50px] text-black dark:text-white'>Revogue</span>
          </div>
          <p className='w-full md:w-2/3 text-gray-600 dark:text-gray-400'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-black dark:text-white'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-black dark:text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600 dark:text-gray-400'>
            <li>9042679168</li>
            <li>Revogue@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-gray-300 dark:border-gray-700' />
        <p className='py-5 text-sm text-center text-gray-600 dark:text-gray-400'>
          Copyright 2024 @ Revogue - All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
