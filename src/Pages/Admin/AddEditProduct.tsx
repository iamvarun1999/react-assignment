import React, { useEffect } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Product } from '../../Modals/Modals';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface IPROPS {
    data: Product,
    submitData: Function,
    type: string,
    open:boolean,
    setState:Function
}

export const AddEditProduct: React.FC<IPROPS> = ({ data, submitData, type,open,setState }) => {
    const {
        control,
        handleSubmit,
        setValue,
        reset,
    } = useForm<Product>({
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            image: 'https://i.pravatar.cc',
            category: ''
        }

    });

    useEffect(() => {
        if (data.id && type == 'edit') {
            setValue('title',data.title)
            setValue('price',data.price)
            setValue('description',data.description)
            setValue('category',data.category)
            setValue('image',data.image)
        }

    }, [data])

   async function onSubmit(body: Product) {
       await submitData(body)
        reset()
    }

   

    return (
        <>
            <Modal isOpen={open} centered size='md'>
                <ModalHeader toggle={()=>{
                    setState(false)
                    reset()
                }}>
                    {type=='add'?'Add new':'Edit'} product
                </ModalHeader>
                <ModalBody>
                    <div className='w-100'>
                        <form onSubmit={handleSubmit(onSubmit, () => toast.error("Please fill all mandatory data!"))}>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <label className="form-label">Title<span className="text-danger">*</span></label>
                                    <Controller
                                        name="title"
                                        control={control}
                                        defaultValue={''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter product title"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-12 mt-2">
                                    <label className="form-label">Category<span className="text-danger">*</span></label>
                                    <Controller
                                        name="category"
                                        control={control}
                                        defaultValue={''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            return (
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter category"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-12 mt-2">
                                    <label className="form-label">Price<span className="text-danger">*</span></label>
                                    <Controller
                                        name="price"
                                        control={control}
                                        defaultValue={0}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            return (
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Enter price"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-12 mt-2">
                                    <label className="form-label">Description<span className="text-danger">*</span></label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        defaultValue={''}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => {
                                            return (
                                                <textarea
                                                    rows={5}
                                                    className="form-control"
                                                    placeholder="Enter product description"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="col-12 mt-4">
                                    <button className="btn btn-primary w-100">{type=='add'?'Add':'Update'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}
