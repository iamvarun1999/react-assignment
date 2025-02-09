import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hook'
import { ICARTBILL } from '../Modals/Modals'
import Swal from 'sweetalert2'
import { updateToken } from '../Store/slices/LoginSlice'

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const selector = useAppSelector(e => e.allData.cart)
    const token = useAppSelector(e => e.auth.token)
    const [cart, setCart] = useState<ICARTBILL>({
        qty: 0,
        total: 0
    })

    useEffect(() => {
        let qty: number = 0

        selector?.forEach(res => {
            qty = qty + res?.cartCount
        })
        setCart({
            ...cart,
            qty
        })

    }, [selector])

    function logout(): void {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "Are you sure you want to logout.",
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: 'Logout',
            denyButtonText: 'Close'
            // timer: 2000
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                dispatch(updateToken({ token: null }))
            } else if (result.isDenied) {

            }
        });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
                <div className="container">
                    <NavLink className="navbar-brand fs-4 fw-bold" to="/">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {token ?
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/admin/productList">Go to admin</NavLink>
                                </li> : ''}
                        </ul>
                        <div className="d-flex gap-2" role="search">
                            <button className="btn btn-outline-primary" onClick={() => navigate('/cart')}>Cart {cart?.qty}</button>
                            {!token ? <button className="btn btn-outline-primary" onClick={() => navigate('/login')}>Login</button> : <button className="btn btn-outline-primary" onClick={logout}>Logout</button>}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
