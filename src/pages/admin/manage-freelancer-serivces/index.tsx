import { useEffect, useState } from "react";
import { Image, Table, Modal, message, Button } from "antd"; // Import Modal and message from Ant Design
import { DeleteOutlined } from "@ant-design/icons";
import { getUserDataFromLocalStorage } from "../../../consts/variable";
import { deleteService, getServices } from "../../../services/freelancer.services";

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

const AdminManageFreelancerServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const user = getUserDataFromLocalStorage();

    useEffect(() => {
        getServicesByClient();
    }, []);

    const getServicesByClient = async () => {
        if (user) {
            const response = await getServices();
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
            title: 'Service Name',
            dataIndex: 'servicename',
            key: 'servicename',
        },
        {
            title: 'Image',
            render: (text: string, record: Service) => (
                <div>
                    <Image style={{ width: "100px" }} className='w-[100px] h-[50px] object-cover object-left-top' src={record.imageUrl} alt={text} />
                </div>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <div className="truncate">{text}</div>
            ),
        },
        {
            title: 'Action',
            render: (record: Service) => (
                <div className="text-lg flex gap-10">
                    <DeleteOutlined
                        className="text-red-500 cursor-pointer"
                        onClick={() => confirmDelete(record.id)} // Gọi hàm xác nhận xóa
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <div className="container mx-auto mt-10">
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

export default AdminManageFreelancerServices;