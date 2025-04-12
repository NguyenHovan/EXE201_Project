import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, InputNumber, Upload, message, Select } from 'antd';
import { uploadToCloudinary } from '../../../../consts/function';
import { PlusOutlined } from '@ant-design/icons';
import { Cate } from '../../artwork/manage-artwork';
import { getUserDataFromLocalStorage } from '../../../../consts/variable';

export interface JobDataProps {
    projectTitle: string;
    categories: string;
    timeFrame: string;
    budget: number;
    location: string;
    fileAttachment: string | null;
    personalInformation: string;
    description: string;
    userId: string;
}

interface JobModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: JobDataProps) => void;
    initialData?: JobDataProps | null; // For updating an existing job
    categories: Cate[];
}

const JobModal: React.FC<JobModalProps> = ({ open, onClose, onSubmit, initialData, categories }) => {
    const [form] = Form.useForm();
    const [fileUrl, setFileUrl] = useState<string | null>(null); // Change to a single URL
    const user = getUserDataFromLocalStorage()
    
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue(initialData);
            setFileUrl(initialData.fileAttachment)
        } else {
            form.resetFields();
        }
    }, [initialData, form]);

    const handleFinish = (values: JobDataProps) => {
        const valuesSubmit={
            ...values,
            fileAttachment: fileUrl,
            userId: user?.userId+''
        }
        onSubmit(valuesSubmit);
    };
    const handleRemove = () => {
        setFileUrl(null); // Reset the file URL
    };

    // Xử lý upload ảnh
    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setFileUrl(url); // Set the single image URL
                message.success({ content: "Upload thành công!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Upload thất bại!", key: "upload" });
                onError(new Error("Upload failed"));
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi upload!");
            onError(error);
        }
    };
    return (
        <Modal
            title={initialData ? "Update Job" : "Create Job"}
            visible={open}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    label="Project Title"
                    name="projectTitle"
                    rules={[{ required: true, message: 'Please input the project title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Time Frame"
                    name="timeFrame"
                    rules={[{ required: true, message: 'Please input your time frame!' }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="categories"
                    rules={[{ required: true, message: 'Please select at least one category!' }]}
                >
                    <Select
                        placeholder="Select categories"
                        options={categories.map(category => ({ label: category.name, value: category.id }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Budget"
                    name="budget"
                    rules={[{ required: true, message: 'Please input the budget!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Location"
                    name="location"
                    rules={[{ required: true, message: 'Please input the location!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="File Attachment"
                    name="fileAttachment"
                    rules={[{ required: true, message: 'Please input the file attachment URL!' }]}
                >
                    <Upload
                        listType="picture-card"
                        customRequest={handleUpload}
                        fileList={fileUrl ? [{ uid: fileUrl, url: fileUrl }] : []} // Show single image
                        onPreview={(file) => window.open(file.url, "_blank")}
                        showUploadList={{ showRemoveIcon: true }}
                        multiple={false} // Only allow single upload
                        onRemove={handleRemove}
                    >
                        {!fileUrl && ( // Show upload button only if no image is uploaded
                            <div className="flex flex-col items-center">
                                <PlusOutlined className="text-xl" />
                                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Personal Information"
                    name="personalInformation"
                    rules={[{ required: true, message: 'Please input your personal information!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {initialData ? "Update Job" : "Create Job"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default JobModal;