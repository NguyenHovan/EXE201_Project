import { useEffect, useState } from "react";
import { Image, Table, Modal, message, Button } from "antd"; // Import Modal and message from Ant Design
import { getServicesByUserId, deleteService } from "../../../../services/freelancer.services"; // Import deleteServiceById
import { getUserDataFromLocalStorage } from "../../../../consts/variable";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export interface Service {
    createdBy: string | null;
    creationDate: string;
    deletedBy: string | null;
    deletionDate: string | null;
    deliveryTime: number;
    description: string;
    id: string;
    imageUrl: string;
    isDeleted: boolean;
    modificationDate: string | null;
    modifiedBy: string | null;
    numConcepts: number;
    numRevisions: number;
    price: number;
    servicename: string;
    userId: string;
}

const ManageFreelancerServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const user = getUserDataFromLocalStorage();

    useEffect(() => {
        getServicesByClient();
    }, []);

    const getServicesByClient = async () => {
        if (user) {
            const response = await getServicesByUserId(user?.userId);
            console.log("getServicesByClient: ", response);
            if (response) {
                setServices(response);
            }
        }
    };

    const handleDelete = async (id: string) => {
        const response = await deleteService(id); // Gọi API để xóa dịch vụ
        if (response) {
            message.success("Xoá dịch vụ thành công!"); // Hiển thị thông báo thành công
            getServicesByClient(); // Cập nhật danh sách dịch vụ
        }
    };

    const confirmDelete = (id: string) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa dịch vụ này không?",
            content: "Hành động này không thể hoàn tác.",
            onOk() {
                handleDelete(id); // Gọi hàm xóa khi người dùng xác nhận
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const columns = [
        {
            title: 'Tên Dịch Vụ',
            dataIndex: 'servicename',
            key: 'servicename',
        },
        {
            title: 'Hình Ảnh',
            render: (text: string, record: Service) => (
                <div>
                    <Image style={{ width: "100px" }} className='w-[100px] h-[50px] object-cover object-left-top' src={record.imageUrl} alt={text} />
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <div className="truncate">{text}</div>
            ),
        },
        {
            title: 'Hành Động',
            render: (record: Service) => (
                <div className="text-lg flex gap-10">
                    <Link to={`/customer/edit-service/${record.id}`}>
                        <EditOutlined className="text-blue-500 cursor-pointer" />
                    </Link>
                    <DeleteOutlined
                        className="text-red-500 cursor-pointer"
                        onClick={() => confirmDelete(record.id)} // Gọi hàm xác nhận xóa
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="mx-5">
            <div className="container mx-auto mt-10">
                <Link to={"/customer/new-service"}><Button type="primary">Thêm dịch vụ</Button></Link>
                <Table
                    className="mt-10"
                    dataSource={services}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default ManageFreelancerServices;