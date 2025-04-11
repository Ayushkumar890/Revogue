import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-6 text-center py-20 px-4 text-gray-700 dark:text-gray-300'>
      
      {/* Exchange Policy */}
      <div className='max-w-xs'>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-4' alt='Exchange Icon' />
        <p className='font-semibold text-base sm:text-lg'>Easy Exchange Policy</p>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          We offer a hassle-free exchange policy.
        </p>
      </div>

      {/* Return Policy */}
      <div className='max-w-xs'>
        <img src={assets.quality_icon} className='w-12 m-auto mb-4' alt='Return Icon' />
        <p className='font-semibold text-base sm:text-lg'>7 Days Return Policy</p>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Enjoy 7 days of easy returns, no questions asked.
        </p>
      </div>

      {/* Support */}
      <div className='max-w-xs'>
        <img src={assets.support_img} className='w-12 m-auto mb-4' alt='Support Icon' />
        <p className='font-semibold text-base sm:text-lg'>24/7 Customer Support</p>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Our team is here for you—anytime, anywhere.
        </p>
      </div>

    </div>
  )
}

export default OurPolicy
