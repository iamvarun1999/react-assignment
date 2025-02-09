import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hook';
import { Product, ProductList } from '../../Modals/Modals';
import { AddEditProduct } from './AddEditProduct';
import { addNewProduct, deleteProductById, getAllProducts, loaderStart, loaderStop, updateProduct } from '../../Store/slices/ProductSlice';
import { ApisRoutes } from '../../Services/apiRoutes';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const ProductListing: React.FC = () => {
  const [data, setData] = useState<ProductList>({
    products: []
  })
  const [type, setType] = useState('add')
  const [dataForEdit, setDataForEdit] = useState<Product>({})
  const [open, setOpen] = useState(false)
  let { products } = useAppSelector((e) => e.allData);
  const dispatch = useAppDispatch()

  useEffect(() => {
    let arr = [...products]
    setData({
      products: arr
    })
  }, [products])

  async function addProduct(data: Product) {
    try {
      dispatch(loaderStart())
      if (type == 'add') {
        let res = await ApisRoutes.addProduct(data)
        setOpen(false)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New product added successfully.",
          showConfirmButton: true,
          confirmButtonText: 'Close',
        })
        dispatch(addNewProduct(res))
      } else {
        if (dataForEdit?.id) {
          let res = await ApisRoutes.updateProduct(dataForEdit?.id, data)
          console.log(res)
          setOpen(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product updated successfully.",
            showConfirmButton: true,
            confirmButtonText: 'Close',
          })
          dispatch(updateProduct(res))
        }
      }
    } catch (err) {
      console.log(err)
      toast.error('Error')
    } finally {
      dispatch(loaderStop())

    }

  }

  async function deleteProduct(id: number | undefined) {
    if (id) {
      try {
        dispatch(loaderStart())
        await ApisRoutes.deleteProduct(id)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product deleted successfully.",
          showConfirmButton: true,
          confirmButtonText: 'Close',
        })
        dispatch(deleteProductById(id))

      } catch (err) {
        console.log(err)
      } finally {
        dispatch(loaderStop())
      }
    }
  }

  function deleteModal(id:number|undefined){
     Swal.fire({
                position: "center",
                icon: "info",
                title: "Are you sure you want to delete this product.",
                showConfirmButton: true,
                showDenyButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: 'Close'
                // timer: 2000
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  deleteProduct(id)
                } else if (result.isDenied) {
    
                }
            });
  }

  return (
    <>
      <AddEditProduct data={dataForEdit} type={type} submitData={addProduct} open={open} setState={setOpen} />
      <div className='d-flex justify-content-between mt-3'>
        <h2 className=''>Products listing</h2>
        <div>
          <button className='btn btn-primary' onClick={() => {
            setOpen(true)
            setType('add')
          }}>Add new product</button>
        </div>
      </div>
      <table className='table table-striped table-bordered mt-4'>
        <thead>
          <tr>
            <th>Product image</th>
            <th>title</th>
            <th>category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((res, index) => {
            return (
              <tr key={index}>
                <td><img src={res?.image} width='30px' /></td>
                <td>{res?.title}</td>
                <td>{res?.category}</td>
                <td>{res?.price}</td>
                <td><div className='d-flex gap-2'>
                  <button className='btn btn-sm btn-primary' onClick={() => {
                    setDataForEdit(res)
                    setOpen(true)
                    setType('edit')
                  }}>Edit</button>
                  <button className='btn btn-sm btn-danger' onClick={() => deleteModal(res?.id)}>Delete</button>
                </div></td>
              </tr>
            )
          })}

        </tbody>
      </table>
    </>
  )
}
