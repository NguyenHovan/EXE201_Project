import { message, Modal } from 'antd';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { adminCreateAccount, adminUpdateAccount } from '../../services/admin.services';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

interface ModalCreateModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    form: ReturnType<typeof Form.useForm<AccountCreateProps>>;
    accountNeedToUpdate?: Account;
    setValue: () => void;
}

export interface AccountCreateProps {
    id?: string;
    firstName: string;
    lastName: string;
    gender: number;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: number;

}


const { Option } = Select;

const ModalCreateAccount = ({ isModalOpen, handleCancel, form, accountNeedToUpdate, setValue }: ModalCreateModalProps) => {

    const navigate = useNavigate();
    const defaultDate = moment(); // Đối tượng moment cho ngày hiện tại

    const handleSubmit = async (values: AccountCreateProps) => {
        console.log("values: ", values);
        if (values) {
            const { dateOfBirth } = values
            const newDateOfBirth = "2025-02-17T17:07:29.210Z"
            values.dateOfBirth = newDateOfBirth
            values.role = 0
        }
        if (accountNeedToUpdate) {
            console.log('Form Values Update:', values);
            const response = await adminUpdateAccount(values, accountNeedToUpdate.id);
            if (response && response.status === true) {
                navigate('/admin/manage-accounts')
                message.success("Update account successfully!")
            }
        } else {
            console.log('Form Values:', values);
            const response = await adminCreateAccount(values);
            if (response && response.status === true) {
                navigate('/admin/manage-accounts')
                message.success("Create account successfully!")
            }
        }
    };
    if (accountNeedToUpdate) {
        console.log("accountNeedToUpdate: ", accountNeedToUpdate)
    }

    return (
        <div>
            <Modal width={800} title={accountNeedToUpdate ? "Update Account" : "Create Account"} footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    className='my-10'
                    defaultValue={setValue}
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ gender: 0, role: 0 }}
                >
                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                            <Input defaultValue={accountNeedToUpdate?.lastName} placeholder="Last Name" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
                            <Select defaultValue={accountNeedToUpdate?.gender}>
                                <Option value={0}>Male</Option>
                                <Option value={1}>Female</Option>
                                <Option value={2}>Other</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true }]}>
                            <DatePicker defaultValue={defaultDate} className="w-full" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                            <Input defaultValue={accountNeedToUpdate?.address} placeholder="Address" />
                        </Form.Item>

                        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                            <Input defaultValue={accountNeedToUpdate?.phoneNumber} placeholder="Phone Number" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                            <Input defaultValue={accountNeedToUpdate?.email} placeholder="Email" />
                        </Form.Item>
                        {
                            accountNeedToUpdate && <Form.Item label="Personal Web Url" name="personalWebsiteUrl" rules={[{ required: true }]}>
                                <Input  />
                            </Form.Item>
                        }
                        {
                            !accountNeedToUpdate && <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    { required: true, message: 'Password is required.' },
                                    { min: 6, message: 'Password must be at least 6 characters.' },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Password must contain at least one uppercase letter and one lowercase letter.'));
                                        },
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>
                        }
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        {
                            accountNeedToUpdate && <Form.Item label="Portfolio Url" name="portfolioUrl" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        }
                        {
                            !accountNeedToUpdate && <Form.Item label="Confirm Password" name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Password is required.' },
                                    { min: 6, message: 'Password must be at least 6 characters.' },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Password must contain at least one uppercase letter and one lowercase letter.'));
                                        },
                                    },
                                ]}>
                                <Input.Password placeholder="Confirm Password" />
                            </Form.Item>
                        }

                        <Form.Item label="Role" name="role">
                            <Select>
                                <Option value={0}>User </Option>
                                <Option value={1}>Admin</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item className='flex justify-center'>
                        <Button type="primary" htmlType="submit" className="w-[200px] bg-purple-500">{accountNeedToUpdate ? "Update Account" : "Create Account"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalCreateAccount;