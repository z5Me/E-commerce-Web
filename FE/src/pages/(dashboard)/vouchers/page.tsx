import React from 'react'
import { Outlet } from 'react-router'

const AdminVoucherPage = () => {
    return (
        <div className='grid gap-4 md:gap-6'>
            <Outlet />
        </div>
    )
}

export default AdminVoucherPage
