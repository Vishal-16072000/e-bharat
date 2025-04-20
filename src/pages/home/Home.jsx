import React, { useContext, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/Track/Track'
import Testimonial from '../../components/tesimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../../components/redux/cartSlice'
import { Link } from 'react-router-dom'
import AllProducts from '../allproducts/AllProducts'

const Home = () => {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart);

    const addCart = () => {
        dispatch(addToCart("shirt"));
    }

    const deleteCart = () => {
        dispatch(removeFromCart("shirt"));
    }

    // console.log(cartItem);

  return (
    <>
    <Layout>
    {/* <button onClick={() => addCart()}>Add</button> */}
    {/* <button onClick={() => deleteCart()}>Remove</button> */}
        <HeroSection/>
        <Filter/>
        <ProductCard/>
        <div className='flex justify-center -mt-10 mb-4'>
        <Link to={'/allproducts'}>
        <button className=' bg-gray-300 px-5 py-2 rounded-xl mt-10'>See more</button>
        </Link>
        </div>
        <Track/>
        <Testimonial/>
    </Layout>
    </>
  )
}

export default Home