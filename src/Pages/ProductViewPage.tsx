import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { CartPayload, Product } from '../Modals/Modals';
import { ApisRoutes } from '../Services/apiRoutes';
import { useAppDispatch, useAppSelector } from '../hook';
import { addToCart, loaderStart, loaderStop, removeFromCart } from '../Store/slices/ProductSlice';
import Swal from 'sweetalert2';
import moment from 'moment';

export const ProductViewPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let { cart } = useAppSelector((e) => e.allData);
    let cartDataIds = cart?.map(res => res.id)
    const [data, setData] = useState<Product | any>(null);

    async function getData() {
        try {
            dispatch(loaderStart())
            if (id) {
                let res = await ApisRoutes.getProductById(id);
                setData(res);
            }
        } catch (err) {
            console.log(err);
        } finally {
        dispatch(loaderStop())
        }
    }

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

    useEffect(() => {
        getData();
    }, []);



    return (
        <>
            <section className="container py-5">
                <div className="row">
                    <div className="col-md-6">
                        <img src={data?.image} className="w-100" alt="" />
                    </div>
                    <div className="col-md-6">
                        <div className="w-100">
                            <div className="fw-500 fs-3">{data?.title}</div>
                            <div className="d-flex mt-4 justify-content-between align-items-center fw-500">
                                <div className="fs-4">${data?.price}</div>
                                <div>
                                    <span className="text-warning">&#9733;</span>{" "}
                                    {data?.rating?.rate}({data?.rating?.count})
                                </div>
                            </div>
                            <div className="mt-3 fs-6 fw-bold">{data?.category}</div>
                            <div className="mt-3">{data?.description}</div>
                            {cartDataIds?.includes(data?.id) ? <button className='btn btn-danger mt-3 w-100' onClick={() => onClickRemoveFromCart(data)}>Remove </button> : <button className='btn btn-primary mt-3 w-100' onClick={() => onClickAddCart(data)}>Add to cart</button>}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
