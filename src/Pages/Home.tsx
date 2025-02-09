import React from 'react'
import { useAppDispatch, useAppSelector } from '../hook';
import { useNavigate } from 'react-router-dom';
import { addToCart, loaderStart, loaderStop, removeFromCart } from '../Store/slices/ProductSlice';
import { CartPayload, Product } from '../Modals/Modals';
import Swal from 'sweetalert2';
import { ApisRoutes } from '../Services/apiRoutes';
import moment from 'moment';

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let { products, cart } = useAppSelector((e) => e.allData);

  let cartDataIds = cart?.map(res => res.id)

  async function onClickAddCart(e: Product) {
    try {
      dispatch(loaderStart())
      let payload: CartPayload = {
        userId: 2,
        date: moment().format('YYYY-MM-DD'),
        products: [
          {
            productId:e?.id,
            quantity: 1
          }
        ]
      

      }
      await ApisRoutes.addToCart(payload)
      dispatch(addToCart(e?.id))
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product successfully added to the cart.",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: 'View cart',
        denyButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/cart')
        } else if (result.isDenied) {

        }
      });
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(loaderStop())
    }
  }
  function onClickRemoveFromCart(e: Product): void {
    dispatch(removeFromCart(e?.id))
  }

  return (
    <>
      <section className="container py-5">
        <h3>Product listing</h3>
        <div className="row mt-5">
          {products?.length > 0 && products?.map((res, index) => {
            return (
              <div className="col-md-3 mt-3 " key={index}>
                <div className="imgContainer pointer" onClick={() => navigate(`/productview/${res.id}`)}>
                  <img src={res?.image} className="" alt="" />
                </div>
                <div className=" p-3">
                  <div className='fw-500 text-center f-14'>{res?.title}</div>
                  <div className='d-flex justify-content-between align-items-center fw-500'>
                    <div className='fs-5'>${res?.price}</div>
                    <div ><span className='text-warning'>&#9733;</span> {res?.rating?.rate}({res?.rating?.count})</div>
                  </div>{cartDataIds?.includes(res.id) ? <button className='btn btn-danger mt-3 w-100' onClick={() => onClickRemoveFromCart(res)}>Remove </button> : <button className='btn btn-primary mt-3 w-100' onClick={() => onClickAddCart(res)}>Add to cart</button>}
                  {/* <button className='btn btn-primary mt-3 w-100' onClick={() => onClickCart(res)}>Add to cart</button> */}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  )
}
