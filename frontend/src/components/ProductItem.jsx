import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className='text-gray-700 dark:text-gray-200 cursor-pointer group'
      to={`/product/${id}`}
    >
      <div className='overflow-hidden rounded-lg shadow-sm'>
        <img
          className='aspect-square w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
          src={image[0]}
          alt={name || 'Product Image'}
        />
      </div>
      <p className='pt-3 pb-1 text-sm font-medium truncate'>{name}</p>
      <p className='text-sm font-semibold text-black dark:text-white'>
        {currency}{price}
      </p>
    </Link>
  )
}

export default ProductItem
