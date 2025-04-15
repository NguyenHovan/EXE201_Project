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
        const valuesSubmit = {
            ...values,
            fileAttachment: fileUrl,
            userId: user?.userId + ''
        }
        onSubmit(valuesSubmit);
    };
    const handleRemove = () => {
        setFileUrl(null); // Reset the file URL
    };

    // Xử lý upload ảnh
    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Đang tải lên...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setFileUrl(url); // Set the single image URL
                message.success({ content: "Tải lên thành công!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Tải lên thất bại!", key: "upload" });
                onError(new Error("Tải lên failed"));
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi tải lên!");
            onError(error);
        }
    };
    return (
        <Modal
            title={initialData ? "Cập Nhật Công Việc" : "Tạo Công Việc"}
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
                    label="Tiêu Đề Dự Án"
                    name="projectTitle"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề dự án!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Thời Gian"
                    name="timeFrame"
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian của bạn!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Danh Mục"
                    name="categories"
                    rules={[{ required: true, message: 'Vui lòng chọn ít nhất một danh mục!' }]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        options={categories.map(category => ({ label: category.name, value: category.name }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Ngân Sách"
                    name="budget"
                    rules={[{ required: true, message: 'Vui lòng nhập ngân sách!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Địa Điểm"
                    name="location"
                    rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tệp Đính Kèm"
                    name="fileAttachment"
                    rules={[{ required: true, message: 'Vui lòng nhập URL tệp đính kèm!' }]}
                >
                    <Upload
                        listType="picture-card"
                        customRequest={handleUpload}
                        fileList={fileUrl ? [{ uid: fileUrl, url: fileUrl }] : []} // Hiển thị hình ảnh đơn
                        onPreview={(file) => window.open(file.url, "_blank")}
                        showUploadList={{ showRemoveIcon: true }}
                        multiple={false} // Chỉ cho phép tải lên một hình ảnh
                        onRemove={handleRemove}
                    >
                        {!fileUrl && ( // Hiển thị nút tải lên chỉ khi chưa có hình ảnh nào được tải lên
                            <div className="flex flex-col items-center">
                                <PlusOutlined className="text-xl" />
                                <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Thông Tin Cá Nhân"
                    name="personalInformation"
                    rules={[{ required: true, message: 'Vui lòng nhập thông tin cá nhân của bạn!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="Mô Tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả của bạn!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {initialData ? "Cập Nhật Công Việc" : "Tạo Công Việc"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default JobModal;