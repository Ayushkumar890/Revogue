import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
    // You can add your API call here
  }

  return (
    <div className='text-center px-4 py-10'>
      <p className='text-2xl font-semibold text-gray-800 dark:text-white'>
        Subscribe now & get 20% off
      </p>
      <p className='text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex flex-col sm:flex-row items-center gap-3 mx-auto my-6 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800'
      >
        <input
          className='w-full sm:flex-1 outline-none px-4 py-2 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-300 text-white dark:text-black text-xs px-6 py-3 rounded transition-colors duration-300'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox
