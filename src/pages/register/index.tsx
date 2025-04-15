import React, { useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';

import { registerService } from '../../services/authen.service';
import { MESSAGE, PATH } from '../../consts';
import { useNavigate } from 'react-router-dom';
import { IMG } from '../../consts/variable';

const { Option } = Select;
export interface FormDataRegister {
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

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormDataRegister>({
        firstName: '',
        lastName: '',
        gender: 0,
        dateOfBirth: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 0,
    });

    const handleChange = (name: string, value: string | number) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (values: FormDataRegister) => {
        const response = await registerService(values)
        console.log("response: ", response)
        if (Boolean(response?.status) === true) {
            message.success(MESSAGE.REGISTER_SUCCESSFULLY);
            navigate(PATH.LOGIN);
        }
        // if (response.errors && Object.keys(response.errors).length > 0) {
        //     // Nếu response.errors có lỗi, duyệt và hiển thị từng lỗi
        //     Object.entries(response.errors).forEach(([field, error]) => {
        //         message.error(`${field}: ${error}`);
        //     });
        // } else if (response.message) {
        //     // Nếu không có errors nhưng có message, hiển thị message
        //     message.error(response.message);
        // } else {
        //     message.success(MESSAGE.REGISTER_SUCCESSFULLY);
        //     navigate(PATH.LOGIN);
        // }

    };

    return (
        <div className="min-h-screen bg-gradient-to-br flex items-center justify-center ">
            <section className="bg-white p-8 w-[1000px]">
                <div className="mb-6 ">
                    <a href="#" className="flex justify-center items-center mb-4">
                        <img
                            className=" h-12"
                            src={IMG.SHOCA_IMG}
                            alt="logo"
                        />
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 w-full sm:p-8">
                            <Form className="space-y-4 md:space-y-6 w-full" onFinish={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-center font-bold text-xl ">Tạo tài khoản</label>
                                </div>

                                {/* First Name and Last Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item label="Tên" name="firstName" >
                                        <Input className='w-[300px] float-right' value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} placeholder="John" />
                                    </Form.Item>
                                    <Form.Item label="Họ" name="lastName" >
                                        <Input className='w-[300px] float-right' value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Doe" />
                                    </Form.Item>
                                </div>

                                {/* Gender and Date of Birth */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"

                                    >
                                        <Select
                                            className='float-right'
                                            style={{ width: '300px' }} // Đặt chiều rộng cho Select
                                            value={formData.gender}
                                            onChange={(value) => handleChange('gender', value)}
                                        >
                                            <Option value={0}>Chọn giới tính</Option>
                                            <Option value={1}>Nam</Option>
                                            <Option value={2}>Nữ</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Ngày sinh"
                                        name="dateOfBirth"

                                    // Đặt chiều rộng cho Form.Item
                                    >
                                        <DatePicker
                                            className='float-right'

                                            style={{ width: '300px' }} // Đặt chiều rộng cho DatePicker
                                        />
                                    </Form.Item>
                                </div>

                                {/* Address and Phone Number */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item label="Địa chỉ" name="address" >
                                        <Input className='w-[300px] float-right' value={formData.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="123 Main St" />
                                    </Form.Item>
                                    <Form.Item label="Số điện thoại" name="phoneNumber">
                                        <Input className='w-[300px] float-right' value={formData.phoneNumber} onChange={(e) => handleChange('phoneNumber', e.target.value)} placeholder="0918414764" />
                                    </Form.Item>
                                </div>

                                {/* Email and Password */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item label="Địa chỉ email" name="email" >
                                        <Input className='w-[300px] float-right' value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="name@company.com" />
                                    </Form.Item>
                                    <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" >
                                        <Input className='w-[300px] float-right' type="password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="••••••••" />
                                    </Form.Item>
                                </div>

                                {/* Password and Role */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Form.Item label="Mật khẩu" name="password" >
                                        <Input className='w-[300px] float-right' type="password" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="••••••••" />
                                    </Form.Item>
                                    {/* <Form.Item hidden label="Role" name="role" rules={[{ required: true, message: 'Role is required.' }]}>
                                        
                                    </Form.Item> */}
                                </div>

                                <div className="text-center">
                                    <div>
                                        <p>Bằng cách tiếp tục, bạn đồng ý với các điều khoản dịch vụ của chúng tôi<span className='text-purple-900'></span></p>
                                    </div>
                                    <Button type="primary" htmlType="submit" className="w-[250px] bg-purple-600">Đăng ký</Button>
                                    <div>
                                        <div className=' text-center py-3' >hoặc Đăng nhập với</div>
                                    </div>
                                    <div className='justify-items-center'>
                                        <Button className="w-[250px] pt-1 grid grid-cols-12 bg-white dark:bg-gray-900 pb-5 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            <div className='col-span-2 text-center flex items-center'>
                                                <svg
                                                    className="h-6 w-6"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    width="800px"
                                                    height="800px"
                                                    viewBox="-0.5 0 48 48"
                                                    version="1.1"
                                                >
                                                    <title>Google-color</title>
                                                    <desc>Created with Sketch.</desc>
                                                    <defs></defs>
                                                    <g
                                                        id="Icons"
                                                        stroke="none"
                                                        strokeWidth="1"
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                            <g id="Google" transform="translate(401.000000, 860.000000)">
                                                                <path
                                                                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                                    id="Fill-1"
                                                                    fill="#FBBC05"
                                                                ></path>
                                                                <path
                                                                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                                    id="Fill-2"
                                                                    fill="#EB4335"
                                                                ></path>
                                                                <path
                                                                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                                    id="Fill-3"
                                                                    fill="#34A853"
                                                                ></path>
                                                                <path
                                                                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                                    id="Fill-4"
                                                                    fill="#4285F4"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className='col-span-10'>
                                                <span>Tiếp tục với Google</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn đã có tài khoản? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-purple-900">Đăng nhập ở đây</a>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default RegisterPage;