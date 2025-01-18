import { useState } from "react";
import { PostJobCompany, PostJobPersonal } from "../../components";
import { FormProps } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space } from 'antd';
import TextArea from "antd/es/input/TextArea";


const CATE = ["Knowledge of color theory, typography, layout",
    "Experience working in a team",
    "English document reading skills",
    "English communication skills are an advantage",
    "Knowledge of playing games is an advantage"
]
const LOCATION = ["Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng"
]
const PostJob = () => {
    const { Option } = Select;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const [checked, setChecked] = useState<boolean>(false)


    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <div className="container p-5 mx-auto mt-10 bg-white border border-purple-500 rounded-lg shadow dark:border-gray-700 max-w-screen-xl">
                <div className="text-xl font-bold">
                    Thông tin đăng tuyển
                </div>
                <ol className="relative border-s border-gray-200 dark:border-gray-700 m-5">
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-purple-800 dark:bg-purple-800">
                            <span className="text-white ">1</span>
                        </span>
                        <time className="block mb-3 text-sm font-bold leading-none text-xl">Bạn muốn đăng tuyển theo diện Công ty
                            hay Cá nhân ?</time>
                        <ul className="hidden mx-5 text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
                            <li onClick={() => setChecked(false)} className="w-full focus-within:z-10">
                                <a href="#" className={`inline-block w-full p-4 ${checked === false ? `bg-purple-800 text-white font-bold` : 'bg-purple-300 text-purple-500 font-bold'} rounded-xl focus:ring-4 focus:ring-blue-300 active focus:outline-none`} aria-current="page">Công Ty</a>
                            </li>
                            <li onClick={() => setChecked(true)} className="w-full focus-within:z-10">
                                <a href="#" className={`inline-block w-full p-4 ${checked === true ? `bg-purple-800 text-white font-bold` : 'bg-purple-300 text-purple-500 font-bold'} rounded-xl focus:ring-4 focus:ring-blue-300 focus:outline-none`}>Dashboard</a>
                            </li>
                        </ul>
                        {
                            checked === false ? <PostJobCompany companyName="Tên Công Ty" link="https://" />
                                : <PostJobPersonal name="Nguyen Ngoc Khanh Ly" />
                        }
                    </li>
                    <li className="mb-10 ms-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-purple-800 dark:bg-purple-800">
                            <span className="text-white ">2</span>
                        </span>
                        <div className="text-xl font-bold">Chi tiết về công việc</div>
                        <div>Tiêu đề</div>
                        <Input placeholder="VD: Graphic Designer, UI/UX Designer" className="w-96 mt-2" />
                        <div className="mt-2 font-bold">
                            Phân loại
                        </div>
                        <div>
                            {Array.isArray(CATE) && CATE.map((item, index) => (
                                <div key={index} className="mr-2 ml-5 flex text-purple-800 ">
                                    <CheckCircleOutlined /> <p className="mt-3 ml-2 text-md">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 font-bold">
                            Địa điểm
                        </div>
                        <div>
                            {Array.isArray(LOCATION) && LOCATION.map((item, index) => (
                                <div key={index} className="mr-2 ml-5 flex text-purple-800 ">
                                    <CheckCircleOutlined /> <p className="mt-3 ml-2 text-md">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mr-2 ml-5 flex text-purple-800 ">
                            <CheckCircleOutlined />
                            <Input placeholder="Khác" className="w-96 mt-2 ml-2 " />
                        </div>
                    </li>
                    <li className="ms-6">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-purple-800 dark:bg-purple-800">
                            <span className="text-white">3</span>
                        </span>
                        <div className="text-xl font-bold">Bài đăng </div>
                        <div>Loại hình làm việc</div>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="On Site" className="mt-2" />
                            </Form.Item>
                            <div>Mô tả sơ lược</div>
                            <Form.Item<FieldType>
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input placeholder="We are looking for a full-time graphic design" />
                            </Form.Item>
                            <div>Mô tả chi tiết</div>
                            <Form.Item<FieldType>
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button className=" text-white bg-purple-900 hover:bg-purple-900  font-medium rounded-lg text-sm px-5 py-2.5 mb-2  " type="primary" htmlType="submit">
                                    Đăng tuyển
                                </Button>
                            </Form.Item>
                        </Form>


                    </li>
                </ol>
            </div>
        </div>
    );
};
export default PostJob;
