import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Image, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../../../consts/function";
import { getUserDataFromLocalStorage } from "../../../../consts/variable";
import { createNewSerivce, editSerivce, getService } from "../../../../services/freelancer.services";
import { useNavigate, useParams } from "react-router-dom";
import { Service } from "../manage-freelancer-service";
import { useForm } from "antd/es/form/Form";

export interface NewService {
    servicename: string;
    description: string;
    price: number;
    imageUrl: string; // Change to a single string
    deliveryTime: number;
    numConcepts: number;
    numRevisions: number;
    userId: string;
    id?: string,
    contactInformation: string
}

const AddNewService = () => {
    const { id } = useParams();
    const [form] = useForm();
    const [fileUrl, setFileUrl] = useState<string | null>(null); // Change to a single URL
    const [service, setService] = useState<Service>();
    const navigate = useNavigate();

    useEffect(() => {
        getServicebyClient();
    }, [id]);

    const getServicebyClient = async () => {
        if (id) {
            const response = await getService(id);
            setService(response);
            setFileUrl(response.imageUrl || null); // Set single image URL if exists
        }
    };

    if (service) {
        form.setFieldsValue({
            servicename: service.servicename,
            description: service.description,
            price: service.price,
            deliveryTime: service.deliveryTime,
            numConcepts: service.numConcepts,
            numRevisions: service.numRevisions
        });
    }

    // Xóa ảnh khỏi danh sách
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
                onError(new Error("Tải lên thất bại!"));
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi tải lên!");
            onError(error);
        }
    };

    const user = getUserDataFromLocalStorage();

    const onFinish = async (values: NewService) => {
        if (user) {
            const newService: NewService = {
                ...values,
                price: Number(values.price),
                deliveryTime: Number(values.deliveryTime),
                numConcepts: Number(values.numConcepts),
                numRevisions: Number(values.numRevisions),
                imageUrl: fileUrl || "", // Use the single image URL
                userId: user.userId,
            };

            console.log("newService: ", newService);
            let response;
            if (!id) {
                response = await createNewSerivce(newService);
                if (response) {
                    message.success("Tạo dịch vụ mới thành công");
                    navigate('/customer/manage-services');
                } else {
                    message.error("Tạo dịch vụ mới thất bại");
                }
            } else {
                response = await editSerivce(newService, id);
                if (response) {
                    message.success("Chỉnh sửa dịch vụ thành công");
                    navigate('/customer/manage-services');
                } else {
                    message.error("Chỉnh sửa dịch vụ thất bại");
                }
            }
        }
    };

    return (
        <div className="mx-5 mt-10">
            <div className="container mx-auto">
                <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical" onFinish={onFinish}>
                    <div className="grid grid-cols-12 gap-4">
                        {/* Upload Hình Ảnh */}
                        <div className="col-span-5">
                            <Form.Item label="Tải Ảnh Lên">
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
                        </div>

                        {/* Form Nhập Thông Tin */}
                        <div className="col-span-7">
                            <div className="text-xl font-bold">Dịch Vụ Mới</div>
                            <p className="mt-2 text-gray-600">
                                Thêm một dịch vụ để khách hàng tiềm năng biết bạn sẵn sàng phục vụ những gì và giúp họ dễ dàng đặt lịch với bạn.
                            </p>
                            <Form.Item className="mt-5" label="Tên Dịch Vụ" name="servicename">
                                <Input placeholder="Nhập tên dịch vụ" />
                            </Form.Item>
                            <Form.Item label="Mô Tả" name="description">
                                <Input placeholder="Nhập mô tả" />
                            </Form.Item>
                            <Form.Item label="Giá" name="price">
                                <Input type="number" placeholder="Nhập giá" />
                            </Form.Item>
                            <Form.Item label="Thời Gian Giao Hàng (ngày)" name="deliveryTime">
                                <Input type="number" placeholder="Nhập thời gian giao hàng (ngày)" />
                            </Form.Item>
                            <Form.Item label="Số Lượng Khái Niệm" name="numConcepts">
                                <Input type="number" placeholder="Nhập số lượng khái niệm" />
                            </Form.Item>
                            <Form.Item label="Số Lượng Sửa Đổi" name="numRevisions">
                                <Input type="number" placeholder="Nhập số lượng sửa đổi" />
                            </Form.Item>
                            {service && (
                                <Form.Item label="Ảnh Cũ">
                                    <div className="flex gap-2">
                                        {service.imageUrl && (
                                            <Image src={service.imageUrl} width={100} height={100} />
                                        )}
                                    </div>
                                </Form.Item>
                            )}
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Xác Nhận
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddNewService;