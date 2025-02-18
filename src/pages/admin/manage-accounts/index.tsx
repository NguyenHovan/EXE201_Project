import { Avatar, Button, Input, Select, Table } from 'antd';
import { adminGetAccountsService } from '../../../services';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import { adminGetAccountService } from '../../../services/admin.services';
import { IMG } from '../../../consts/variable';
const ManageUser = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [role, setRole] = useState<number>();
    const [isDeleted, setIsDeleted] = useState<boolean | ''>('');
    const [gender, setGender] = useState<number | ''>('');
    const [keyword, setKeyword] = useState<string | ''>('');
    //modal
    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [accountDetail, setAccountDetail] = useState<Account>();
    useEffect(() => {
        getAccounts();
    }, [])
    const showLoading = (id: string) => {
        setOpen(true);
        setLoading(true);
        if (id) {
            getAccountById(id);
        }
        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const getAccounts = async () => {
        const response = await adminGetAccountsService()
        console.log("response: ", response)
        if (response) {
            setAccounts(response)
        }
    }

    const getAccountById = async (id: string) => {
        if (id) {
            const response = await adminGetAccountService(id);
            if (response) {
                setAccountDetail(response)
            }
        }
    }

    const handleChangeRole = (value: number) => {
        setRole(value)
    };

    const handleChangeGender = (value: number) => {
        setGender(value)
    };

    const handleChangeIsDeleted = (value: boolean) => {
        setIsDeleted(value)
    };

    const handleChange = (value: boolean) => {
        setIsDeleted(value)
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (firstName: string, record: Account) => (
                <div className='text-blue-500 cursor-pointer' onClick={() => showLoading(record.id)}>
                    {firstName}
                </div>
            )
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',

        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number) => (gender === 0 ? 'Male' : 'Female'), // Optional: for displaying gender as text
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (date) => moment(date).format('DD-MM-YYYY'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "15%"
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
    ];



    return (
        <div>
            {/* Modal user detail */}
            <Modal
                title={<p>Account Detail</p>}
                footer={""}
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}

            >
                <div className='flex justify-center'>
                    <Avatar
                        size={64}
                        src={accountDetail?.avatarUrl === "" || accountDetail?.avatarUrl === null ? IMG.IMG_TEMP : accountDetail?.avatarUrl}
                        className='mb-3'
                    />
                </div>
                <div>
                    <span className='font-semibold'>Email: </span>
                    {accountDetail?.email}
                </div>
                <div className='mt-1'>
                    <span className='font-semibold'>Address: </span>
                    {accountDetail?.address}
                </div>
                <div className='mt-1'>
                    <span className='font-semibold'>Date of birth: </span>
                    {moment(accountDetail?.dateOfBirth).format("DD-MM-YYYY")}
                </div>
                <div className='mt-1'>
                    <span className='font-semibold'>Address: </span>
                    {moment(accountDetail?.createdBy).format("DD-MM-YYYY")}
                </div>
                <div className='mt-1'>
                    <span className='font-semibold'>Address: </span>
                    {accountDetail?.createdBy}
                </div>
            </Modal>
            <p className='text-center text-3xl font-bold'>Manage User</p>
            <div className='mb-3 flex justify-between'>
                {/* filter by role */}
                <Select
                    defaultValue="Role: All"
                    style={{ width: 140 }}
                    onChange={handleChangeRole}
                    options={[
                        { value: '2', label: 'Role: Customer' },
                        { value: '', label: 'Role: All' },
                    ]}
                />
                {/* filter by is deleted */}
                <Select
                    defaultValue="Is deleted: all"
                    style={{ width: 140 }}
                    onChange={handleChangeIsDeleted}
                    options={[
                        { value: true, label: 'Is deleted: true' },
                        { value: false, label: 'Is deleted: false' },
                        { value: '', label: 'Is deleted: all' },
                    ]}
                />
                {/* filter by is gender */}
                <Select
                    defaultValue="Gender: all"
                    style={{ width: 140 }}
                    onChange={handleChangeRole}
                    options={[
                        { value: 1, label: 'Gender: male' },
                        { value: 2, label: 'Gender: female' },
                        { value: 0, label: 'Gender: another' },
                        { value: false, label: 'Gender: all' },
                    ]}
                />

                <Input onChange={() => handleChange} style={{ width: 240 }} defaultValue="Enter keyword" />
                <Button type='primary'>Search</Button>
            </div>
            <Table dataSource={accounts} columns={columns} />
        </div>
    )
}

export default ManageUser