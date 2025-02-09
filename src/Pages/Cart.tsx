import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hook'
import { addProductCount, loaderStart, loaderStop, subProductCount } from '../Store/slices/ProductSlice'
import { ICARTBILL } from '../Modals/Modals'
import { ApisRoutes } from '../Services/apiRoutes'

export const Cart: React.FC = () => {
  const { cart } = useAppSelector(e => e.allData)
  const dispatch = useAppDispatch()
  const [bill, setBill] = useState<ICARTBILL>({
    qty: 0,
    total: 0
  })


  useEffect(() => {
    getCartData()
  }, [cart])

  async function getCartData() {
    try {
      dispatch(loaderStart())
      let res = await ApisRoutes.getUserCart()
      console.log(res)
      let qty: number = 0
      let total: number = 0
  
      cart?.forEach(res => {
        qty = qty + res?.cartCount
        if (res?.price)
          total = total + res?.cartCount * res?.price
      })
      setBill({
        qty,
        total: parseFloat(total?.toFixed(0))
      })
      
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(loaderStop())
    }
  }



  return (
    <>
      <section className='container' style={{ minHeight: '400px' }}>
        <div className='d-flex justify-content-between  my-4 align-items-center'>
          <h3 className='fw-500'>Shopping cart</h3>
          {/* <div>{ProductCount}</div> */}
        </div>
        <hr />
        {cart?.length > 0 ?
          <div className='row my-4'>
            <div className='col-md-8'>
              {cart?.map((res, index) => {
                return (
                  <div className='row justify-content-between align-items-center mt-3 border rounded p-4' key={index}>
                    <div className='col-md-2 d-flex justify-content-center'>
                      <img src={res?.image} className='' height='70px' alt='' />
                    </div>
                    <div className='col-md-2 fw-500 f-14'>{res?.title}</div>
                    <div className='col-md-2 fw-500 f-14 '>{res?.category}</div>
                    <div className='col-md-2 fw-500 f-14'>${res?.price}</div>
                    <div className='col-md-2 fw-500'>
                      <div className='d-flex align-items-center justify-content-between gap-2 f-14'>
                        <button className='btn border border-danger text-danger' onClick={() => dispatch(subProductCount(res?.id))}>-</button>
                        <div className='fw-bold'>{res?.cartCount}</div>
                        <button className='btn border border-success text-success' onClick={() => dispatch(addProductCount(res?.id))}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='col-md-4 mt-3'>
              <div className='border p-3 rounded w-100 h-100 '>

                <div className='w-75'>
                  <h4 className='fw-bold'>Total billing</h4>
                  <ul className='d-flex justify-content-between p-0 mt-4' style={{ listStyle: 'none' }}>
                    <li className='fw-bold'>Total qty</li>
                    <li className='fw-bold'>:</li>
                    <li>{bill?.qty}</li>
                  </ul>
                  <ul className='d-flex justify-content-between p-0' style={{ listStyle: 'none' }}>
                    <li className='fw-bold'>Total price</li>
                    <li className='fw-bold'>:</li>
                    <li>${bill?.total}</li>
                  </ul>

                </div>
              </div>
            </div>
          </div> : <h4 className='text-center mt-4'>Cart is empty</h4>}
      </section>
    </>
  )
}
