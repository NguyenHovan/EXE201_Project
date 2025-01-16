import { Button, Input, Select, Table } from 'antd';
import { adminGetAccountsService } from '../../../services';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
const ManageUser = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [role, setRole] = useState<number>();
    const [isDeleted, setIsDeleted] = useState<boolean | ''>('');
    const [gender, setGender] = useState<number | ''>('');
    const [keyword, setKeyword] = useState<string | ''>('');
    const [accountDetail, setAccountDetail] = useState<Account>();
    //modal
    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        getAccount();
    }, [])
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        // Simple loading mock. You should add cleanup logic in real world.
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };
    const getAccount = async () => {
        const response = await adminGetAccountsService()
        console.log("response: ", response)
        if (response) {
            setAccounts(response)
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
            render: (firstName: string) => (
                <div className='text-blue-500 cursor-pointer' onClick={showLoading}>
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
            render: (gender: number) => (gender === 1 ? 'Male' : 'Female'), // Optional: for displaying gender as text
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
                footer={
                    <Button type="primary" onClick={showLoading}>
                        Reload
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
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
            <Table dataSource={accounts} columns={columns} />;
        </div>
    )
}

export default ManageUser