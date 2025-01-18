import {  PlusOutlined } from '@ant-design/icons';
import {  Form, Input, Upload } from 'antd';
import type { FormProps } from 'antd';

const PostJobCompany = ({ companyName, link }: PostJobCompany) => {
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

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className="mt-5">
            <div className="">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    className='w-full'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className='grid grid-cols-12'>
                        <div className='col-span-3 w-full justify-items-center'>
                            <Form.Item  valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload action="/upload.do" listType="picture-card">
                                    <button style={{ border: 0, background: 'none' }} type="button">
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </div>
                        <div className='col-span-9'>
                            <Form.Item<FieldType>
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder={companyName}/>
                            </Form.Item>
                            <Form.Item<FieldType>             
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input placeholder={link} />
                            </Form.Item>
                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}

export default PostJobCompany
