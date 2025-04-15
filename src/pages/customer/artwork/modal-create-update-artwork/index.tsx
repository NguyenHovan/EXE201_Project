import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, InputNumber, message, Upload, Select } from 'antd';
import { uploadToCloudinary } from '../../../../consts/function';
import { PlusOutlined } from '@ant-design/icons';
import { Cate } from '../manage-artwork';
import { getUserDataFromLocalStorage } from '../../../../consts/variable';

export interface ArtworkData {
    title: string;
    description: string;
    thumbnailUrl: string;
    price: number;
    creatorId: string;
    imageUrls: string[];
    images?: string[];
    categoryIds: string[];
    categories?: string[];
    artWorkId?: string;
    id?: string,
    status: number
}

interface ArtworkModalProps {
    artWorkId?: string;
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ArtworkData) => void;
    initialData?: ArtworkData | null; // For updating an existing artwork
    categories: Cate[]; // Categories for the select input
}

const ModalCreateUpdateArtwork: React.FC<ArtworkModalProps> = ({ open, onClose, onSubmit, initialData, categories, artWorkId }) => {
    const [form] = Form.useForm();
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]); // Change to an array for multiple uploads

    useEffect(() => {
        if (initialData && initialData.images) {
            console.log("initialData: ", initialData)
            form.setFieldsValue({
                ...initialData,
                categoryIds: initialData.categories,
                imageUrls: initialData.images
            });
            setImageUrls(initialData.images); // Set initial image URLs if updating
            setThumbnailUrl(initialData.thumbnailUrl); // Set initial thumbnail URL if updating
        } else {
            form.resetFields();
            setImageUrls([]);
            setThumbnailUrl(null);
        }
    }, [initialData, form]);

    const handleFinish = (values: ArtworkData) => {
        if (user && user?.userId && !artWorkId && thumbnailUrl && imageUrls) {
            const valuesSubmit = {
                ...values,
                creatorId: user?.userId,
                thumbnailUrl: thumbnailUrl,
                imageUrls: imageUrls
            }
            onSubmit(valuesSubmit);

        } else if (user && user?.userId && artWorkId && thumbnailUrl && imageUrls) {
            const valuesSubmit = {
                ...values,
                creatorId: user?.userId,
                thumbnailUrl: thumbnailUrl,
                imageUrls: imageUrls,
                artWorkId: artWorkId
            }
            onSubmit(valuesSubmit);
        }
    };
    const user = getUserDataFromLocalStorage()
    // Handle upload for thumbnail
    const handleUploadThumbnail = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading thumbnail...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setThumbnailUrl(url);
                message.success({ content: "Thumbnail uploaded successfully!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Thumbnail upload failed!", key: "upload" });
                onError(new Error("Upload failed"));
            }
        } catch (error) {
            message.error("An error occurred while uploading the thumbnail!");
            onError(error);
        }
    };

    // Handle upload for multiple images
    const handleUploadImages = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading images...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setImageUrls((prev) => [...prev, url]); // Add new image URL to the array
                message.success({ content: "Image uploaded successfully!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Image upload failed!", key: "upload" });
                onError(new Error("Upload failed"));
            }
        } catch (error) {
            message.error("An error occurred while uploading the image!");
            onError(error);
        }
    };

    // Remove an image URL from the list
    const handleRemoveImage = (url: string) => {
        setImageUrls((prev) => prev.filter((imageUrl) => imageUrl !== url));
    };

    const handleRemoveThumnail = () => {
        setThumbnailUrl(null);
    };
    return (
        <Modal
            title={initialData ? "Cập nhật tác phẩm nghệ thuật" : "Tạo tác phẩm nghệ thuật"}
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
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Ảnh thu nhỏ"
                    name="thumbnailUrl"
                    rules={[{ required: true, message: 'Vui lòng tải lên ảnh thu nhỏ!' }]}
                >
                    <Upload
                        listType="picture-card"
                        customRequest={handleUploadThumbnail}
                        fileList={thumbnailUrl ? [{ uid: thumbnailUrl, url: thumbnailUrl }] : []}
                        onPreview={(file) => window.open(file.url, "_blank")}
                        showUploadList={{ showRemoveIcon: true }}
                        multiple={false}
                        onRemove={handleRemoveThumnail}
                    >
                        {!thumbnailUrl && (
                            <div className="flex flex-col items-center">
                                <PlusOutlined className="text-xl" />
                                <div style={{ marginTop: 8 }}>Tải lên ảnh thu nhỏ</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Giá"
                    name="price"
                    rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Ảnh chi tiết"
                    name="imageUrls"
                    rules={[{ required: true, message: 'Vui lòng tải lên ít nhất một ảnh!' }]}
                >
                    <Upload
                        listType="picture-card"
                        customRequest={handleUploadImages}
                        fileList={imageUrls?.map((url, index) => ({ uid: url, url }))}
                        onPreview={(file) => window.open(file.url, "_blank")}
                        showUploadList={{ showRemoveIcon: true }}
                        multiple={true}
                        onRemove={(file) => handleRemoveImage(file.url)}
                    >
                        <div className="flex flex-col items-center">
                            <PlusOutlined className="text-xl" />
                            <div style={{ marginTop: 8 }}>Tải lên ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Danh mục"
                    name="categoryIds"
                    rules={[{ required: true, message: 'Vui lòng chọn ít nhất một danh mục!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn danh mục"
                        options={categories.map(category => ({ label: category.name, value: category.id }))}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {initialData ? "Cập nhật tác phẩm" : "Tạo tác phẩm"}
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default ModalCreateUpdateArtwork;