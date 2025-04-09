import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

export interface AccountCreateProps {
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

interface ModalCreateAccountProps {
    accountNeedToUpdate?: AccountCreateProps | null; // For updating an existing account
    form: any; // Ant Design form instance
    isModalOpen: boolean;
    handleCancel: () => void;
    onSubmit: (data: AccountCreateProps) => void; // Function to handle form submission
}

const ModalCreateUpdateAccount: React.FC<ModalCreateAccountProps> = ({ accountNeedToUpdate, form, isModalOpen, handleCancel, onSubmit }) => {
    useEffect(() => {
        if (accountNeedToUpdate) {
            console.log("accountNeedToUpdate: ", accountNeedToUpdate)
            form.setFieldsValue({
                ...accountNeedToUpdate,
                dateOfBirth: accountNeedToUpdate.dateOfBirth ? moment(accountNeedToUpdate.dateOfBirth) : null,
            });
        } else {
            form.resetFields();
        }
    }, [accountNeedToUpdate, form]);

    const handleFinish = (values: AccountCreateProps) => {
        console.log("values: ", values)
        if (typeof values.role === 'string') {
            let numberRole;
            switch (values.role) {
                case "Admin": numberRole === 0
                    break
                case "Staff": numberRole === 1
                    break;
                case "Customer": numberRole === 2
                    break;
            }
            const valuesSubmit = {
                ...values,
                role: numberRole
            }
            console.log("valuesSubmit: ", valuesSubmit)
            onSubmit(valuesSubmit);
        }else{
            onSubmit(values);
        }
        // Call the onSubmit function passed from the parent component

    };

    return (
        <Modal
            title={accountNeedToUpdate != null ? "Update Account" : "Create Account"}
            visible={isModalOpen}
            onCancel={handleCancel}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Please input the first name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Please input the last name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[{ required: true, message: 'Please select the gender!' }]}
                >
                    <Select>
                        <Select.Option value={0}>Male</Select.Option>
                        <Select.Option value={1}>Female</Select.Option>
                        <Select.Option value={2}>Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[{ required: true, message: 'Please select the date of birth!' }]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[{ required: true, message: 'Please input the address!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Please input the phone number!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
                >
                    <Input />
                </Form.Item>

                {
                    !accountNeedToUpdate && <div>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input the password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Please confirm the password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>
                }

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select the role!' }]}
                >
                    <Select>
                        <Select.Option value={0}>Admin</Select.Option>
                        <Select.Option value={1}>Staff </Select.Option>
                        <Select.Option value={2}>Customer</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {accountNeedToUpdate != null ? "Update Account" : "Create Account"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateAccount;