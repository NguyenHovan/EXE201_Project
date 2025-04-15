
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
            title={proPackage ? "Cập nhật gói Pro" : "Tạo gói Pro"}
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
                    label="Tên gói"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên gói!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Tính năng"
                    name="features"
                    rules={[{ required: true, message: 'Vui lòng chọn tính năng!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn các tính năng"
                        options={features.map(f => ({ label: f, value: f }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Thời hạn"
                    name="duration"
                    rules={[{ required: true, message: 'Vui lòng nhập thời hạn!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {proPackage ? "Cập nhật gói" : "Tạo gói"}
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};

const features = ["Hỗ trợ ưu tiên", "Truy cập không giới hạn", "Xây dựng thương hiệu tùy chỉnh"]
export default ModalCreateUpdateProPackageDataProps;