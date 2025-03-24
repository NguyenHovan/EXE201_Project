import { Avatar, Button, Form, Input, message, Select, Table } from 'antd';
import { adminGetAccountsService } from '../../../services';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Modal } from 'antd';
import { adminCreateAccount, adminGetAccountService, adminUpdateAccount } from '../../../services/admin.services';
import { IMG } from '../../../consts/variable';
import  { AccountCreateProps } from '../../../components/modal-create-update-account';
import { EditOutlined } from '@ant-design/icons';
import config from '../../../secret';
import ModalCreateUpdateAccount from './modal-create-update-account';

const ManageUser = () => {

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [role, setRole] = useState<number>();
    const [isDeleted, setIsDeleted] = useState<boolean | ''>('');
    const [gender, setGender] = useState<number | ''>('');
    const [keyword, setKeyword] = useState<string | ''>('');
    const [accountNeedToUpdate, setAccountNeedToUpdate] = useState<AccountCreateProps | null>(null);
    //modal

    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [accountDetail, setAccountDetail] = useState<Account>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<AccountCreateProps>();

    const showModal = (account?: AccountCreateProps) => {
     if(account){
        setAccountNeedToUpdate(account);
     }
        console.log("account: ", account)
        setIsModalOpen(true);
    };

    useEffect(() => {
        getAccounts()
    }, [])

    useEffect(() => {
        if (accountNeedToUpdate) {
            setValue()
        }
    }, [accountNeedToUpdate])

    const setValue = () => {
        form.setFieldsValue({
            firstName: accountNeedToUpdate?.firstName || '',
            lastName: accountNeedToUpdate?.lastName || '',
            gender: accountNeedToUpdate?.gender || 0, // Giả sử 0 là giá trị mặc định cho gender
            dateOfBirth: accountNeedToUpdate?.dateOfBirth ? moment(accountNeedToUpdate.dateOfBirth) : null,
            address: accountNeedToUpdate?.address || '',
            email: accountNeedToUpdate?.email || '',
            phoneNumber: accountNeedToUpdate?.phoneNumber || '',
            role: accountNeedToUpdate?.role || 1,
        });
    };
    
    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

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
    const handleAddOrUpdateAccount = async (values: AccountCreateProps) => {
        try {
            if (accountNeedToUpdate) {
                // Update existing account
                const response = await adminUpdateAccount(values, accountNeedToUpdate?.id+""); // Assuming you have a service for updating accounts
                if (response) {
                    message.success("Account updated successfully");
                } else {
                    message.error("Failed to update account");
                }
            } else {
                // Create new account
                const response = await adminCreateAccount(values); // Assuming you have a service for creating accounts
                if (response) {
                    message.success("Account created successfully");
                } else {
                    message.error("Failed to create account");
                }
            }
            // Refresh the account list after adding or updating
            getAccounts();
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error while adding/updating account:", error);
            message.error("An error occurred while processing your request");
        }
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
        {
            title: 'Action',
            render: (record: Account) => (
                <div onClick={() => showModal(record)}>
                    <EditOutlined className='text-blue-500' />
                </div>
            )
        }
    ];

    return (
        <div>
            {/* Modal create account */}
            <ModalCreateUpdateAccount
                accountNeedToUpdate={accountNeedToUpdate || null}
                form={form}
    isModalOpen={isModalOpen}
    handleCancel={handleCancel}
    onSubmit={handleAddOrUpdateAccount}
            />

            <Modal />
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
            <div className='flex justify-between'>
                <div className='mb-3 flex justify-between gap-4'>
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

                    <Input onChange={() => handleChange} style={{ width: 240 }} placeholder="Enter keyword" />
                    <Button type='primary'>Search</Button>
                </div>
                <div>
                    <Button onClick={()=>showModal()} type='primary'>Create</Button>
                </div>
            </div>
            <Table dataSource={accounts} columns={columns} />
        </div>
    )
}

export default ManageUser