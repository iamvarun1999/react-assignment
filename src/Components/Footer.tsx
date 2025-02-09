import React from 'react'
import { NavLink } from 'react-router-dom'

export const Footer:React.FC = () => {
  return (
    <>
     <footer className='bg-footer text-white'>
      <div className='container py-5'>
          <h2>Ecommerce</h2>
        <div className='row'>
         <div className='col-md-5'>
          <div className='f-14 mt-2'>255 Test addrres</div>
          <div className='f-14 mt-2'>Sector-22 Noida</div>
          <div className='f-14 mt-2'>Uttarpradesh India - 241301</div>
         </div>
         <div className='col-md-4 d-flex flex-column gap-2'>
          <div className='mt-2'><NavLink to='/'></NavLink>Home</div>
          {/* <div><NavLink to='/products'></NavLink>Products</div> */}
         </div>
        </div>
      </div>
      <div className='bg-dark d-flex justify-content-center py-3'>
        <div className=''>Disclamer</div>
      </div>
    </footer>
    </>
  )
}
