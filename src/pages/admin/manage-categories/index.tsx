import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { createCategoryService, getCategoriesService, updateCategoryService } from '../../../services/category.services';
// Category.ts
export interface Category {
    id?: string; // Unique identifier for the category
    name: string; // Name of the category
    description: string; // Description of the category
    creationDate: string; // Creation date in ISO format
}

const ManageCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm()
    useEffect(() => {
        getCates();
    }, []);

    const getCates = async () => {
        const response = await getCategoriesService();
        if (response) {
            setCategories(response);
        }
    };

    const showModal = (category?: Category) => {
        if (category) {
            form.setFieldsValue({
                name: category.name,
                id: category.id,
                description: category.description
            })
        }
        setIsModalVisible(true);
    };

    const handleOk = async (values: Category) => {
        console.log("form: ", form)
        if (values.id) {
            const response = await updateCategoryService(values, values.id + "")
            if (response) {
                message.success("Cập nhật thành công")
                getCates()
            }
        } else {
            const response = await createCategoryService(values)
            if (response) {
                message.success("Tạo mới category thành công")
                getCates()
            }
        }
        setIsModalVisible(false);
        form.resetFields()
        await getCates(); // Refresh the category list after create/update
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Creation Date',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (text: string) => formatDate(text),
        },
        {
            title: 'Action',
            render: (record: Category) => (
                <Button onClick={() => showModal(record)}>Edit</Button>
            ),
        },
    ];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <div className="text-3xl font-bold text-center mb-4">Manage Categories</div>
            <Button type="primary" onClick={() => showModal()}>Create Category</Button>
            <Table className='mt-10' dataSource={categories} columns={columns} />
            <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleOk}
                >
                    {
                        <Form.Item
                            label="Id"
                            name="id"
                            hidden
                        >
                            <Input  />
                        </Form.Item>
                    }
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the category name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input the category description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageCategories;