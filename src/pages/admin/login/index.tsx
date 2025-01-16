import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../../services';
import { MESSAGE } from '../../../consts';
import { jwtDecode } from 'jwt-decode';

const AdminLoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    type FieldType = {
        email?: string;
        password?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
         if(values.email && values.password){
           const response = await loginService(values.email, values.password)
           console.log("response: ", response)
           if(response && response.data.accessToken){
               const decodedToken = jwtDecode(response.data.accessToken);
               console.log("decodedToken: ",decodedToken)
               navigate('/admin/manager-users')
               localStorage.setItem("token", response.data.accessToken)
               localStorage.setItem("user", JSON.stringify(decodedToken))
               message.success(MESSAGE.LOGIN_SUCCESSFULLY)  
           }else{
               message.error(MESSAGE.LOGIN_FAILED) 
           }
         }
           console.log('Success:', values);
       };
   

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                        Flowbite
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <Form
                                form={form}
                                layout="vertical"
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Form.Item<FieldType>
                                    label="Email Address"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input type="email" placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input type='password' placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Keep me signed in</Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    {/* <Button type="primary" htmlType="submit" className="w-full">
                                        Submit
                                    </Button> */}
                                   <Button  htmlType="submit" className="w-full text-white bg-purple-900 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminLoginPage;
