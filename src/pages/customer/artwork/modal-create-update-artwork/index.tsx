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
            form.setFieldsValue(initialData);
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

        }else if(user && user?.userId && artWorkId && thumbnailUrl && imageUrls){
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

    return (
        <Modal
            title={initialData ? "Update Artwork" : "Create Artwork"}
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
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the description!' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Thumbnail URL"
                    name="thumbnailUrl"
                    rules={[{ required: true, message: 'Please upload the thumbnail!' }]}
                >
                    <Upload
                        listType="picture-card"
                        customRequest={handleUploadThumbnail}
                        fileList={thumbnailUrl ? [{ uid: thumbnailUrl, url: thumbnailUrl }] : []}
                        onPreview={(file) => window.open(file.url, "_blank")}
                        showUploadList={{ showRemoveIcon: true }}
                        multiple={false}
                        onRemove={handleRemoveImage}
                    >
                        {!thumbnailUrl && (
                            <div className="flex flex-col items-center">
                                <PlusOutlined className="text-xl" />
                                <div style={{ marginTop: 8 }}>Upload Thumbnail</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input the price!' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>
                {/* 
                <Form.Item
                    label="Creator ID"
                    name="creatorId"
                    rules={[{ required: true, message: 'Please input the creator ID!' }]}
                >
                    <Input />
                </Form.Item> */}

                <Form.Item
                    label="Image URLs"
                    name="imageUrls"
                    rules={[{ required: true, message: 'Please upload at least one image!' }]}
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
                            <div style={{ marginTop: 8 }}>Upload Images</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Category IDs"
                    name="categoryIds"
                    rules={[{ required: true, message: 'Please select at least one category!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Select categories"
                        options={categories.map(category => ({ label: category.name, value: category.id }))}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {initialData ? "Update Artwork" : "Create Artwork"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateUpdateArtwork;