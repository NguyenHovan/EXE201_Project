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
            <Modal width={800} title={accountNeedToUpdate ? "Cập nhật tài khoản" : "Tạo tài khoản"} footer={null} open={isModalOpen} onCancel={handleCancel}>
                <Form
                    className='my-10'
                    defaultValue={setValue}
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{ gender: 0, role: 0 }}
                >
                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Tên" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder="First Name" />
                        </Form.Item>

                        <Form.Item label="Họ" name="lastName" rules={[{ required: true }]}>
                            <Input defaultValue={accountNeedToUpdate?.lastName} placeholder="Last Name" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Giới tính" name="gender" rules={[{ required: true }]}>
                            <Select defaultValue={accountNeedToUpdate?.gender}>
                                <Option value={0}>Nam</Option>
                                <Option value={1}>Nữ</Option>
                                <Option value={2}>Khác</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Ngày sinh" name="dateOfBirth" rules={[{ required: true }]}>
                            <DatePicker defaultValue={defaultDate} className="w-full" />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-5'>
                        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
                            <Input defaultValue={accountNeedToUpdate?.address} placeholder="Address" />
                        </Form.Item>

                        <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true }]}>
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
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    { required: true, message: 'Mật khẩu là bắt buộc.' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu phải chứa ít nhất một chữ cái viết hoa và một chữ cái viết thường.'));
                                        },
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Mật khẩu" />
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
                            !accountNeedToUpdate && <Form.Item label="Xác nhận mật khẩu" name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Mật khẩu là bắt buộc.' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự.' },
                                    {
                                        validator: (_, value) => {
                                            if (!value || (/[a-z]/.test(value) && /[A-Z]/.test(value))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu phải chứa ít nhất một chữ cái viết hoa và một chữ cái viết thường.'));
                                        },
                                    },
                                ]}>
                                <Input.Password placeholder="Xác nhận mật khẩu" />
                            </Form.Item>
                        }

                        <Form.Item label="Vai trò" name="role">
                            <Select>
                                <Option value={0}>User </Option>
                                <Option value={1}>Admin</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item className='flex justify-center'>
                        <Button type="primary" htmlType="submit" className="w-[200px] bg-purple-500">{accountNeedToUpdate ? "Cập nhật tài khoản" : "Tạo tài khoản"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ModalCreateAccount;