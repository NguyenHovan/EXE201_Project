
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, InputNumber, Select } from 'antd';
import { ProPackage } from '../manage-packages';

export interface ModalCreateUpdateProPackageDataPropsProps {
    proPackage?: ProPackage | null; // For updating an existing package
    form: any; // Ant Design form instance
    isModalOpen: boolean;
    handleCancel: () => void;
    onSubmit: (data: ProPackage) => void; // Function to handle form submission
}

const ModalCreateUpdateProPackageDataProps: React.FC<ModalCreateUpdateProPackageDataPropsProps> = ({ proPackage, form, isModalOpen, handleCancel, onSubmit }) => {
    useEffect(() => {
        if (proPackage) {
            form.setFieldsValue({
                ...proPackage,
            });
        } else {
            form.resetFields();
        }
    }, [proPackage, form]);

    const handleFinish = (values: ProPackage) => {
        // Split the features string back into an array
        // values.features = values.features.split(',').map(feature => feature.trim());
        onSubmit(values);
    };

    return (
        <Modal
            title={proPackage ? "Update Pro Package" : "Create Pro Package"}
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
                    label="Package Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input the package name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Features"
                    name="features"
                    rules={[{ required: true, message: 'Please input the features!' }]}
                >
                     <Select
                        mode="multiple"
                        placeholder="Select categories"
                        options={features.map(f => ({ label: f, value: f }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[{ required: true, message: 'Please input the duration!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {proPackage ? "Update Package" : "Create Package"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const features =["Priority Support", "Unlimited Access", "Custom Branding"]
export default ModalCreateUpdateProPackageDataProps;