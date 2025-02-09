import React from 'react'
import { Modal, Spinner } from 'reactstrap'
import { useAppSelector } from '../hook'


export const Loader: React.FC = () => {
    let selector = useAppSelector(e=>e?.allData?.loading)
    return (
        <Modal isOpen={selector} centered fade={false} contentClassName='bg-transparent border-none'>
            <div className='d-flex justify-content-center w-100'>
                <Spinner color="light">
                    Loading...
                </Spinner>
            </div>
        </Modal>
    )
}
