export interface ProPackage {
    id?: string; // Unique identifier for the package
    name: string;
    price: number;
    features: string[];
    duration: string;
    creationDate: Date
}

import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { createPackageService, deletePackageService, getPackages, updatePackageService } from '../../../services/packages.services';
import { priceUnit } from '../../../consts/variable';
import ModalCreateUpdateProPackageDataProps from '../modal-craete-update-package';


const ManageProPackage = () => {
    const [packages, setPackages] = useState<ProPackage[]>([]);
    const [currentPackage, setCurrentPackage] = useState<ProPackage | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [form] = Form.useForm()

    useEffect(() => {
        // Fetch the packages from the server or local storage
        getPackagesFromStaff()
    }, []);

    const getPackagesFromStaff = async () => {
        // Replace this with your actual data fetching logic
        const response = await getPackages() // Example API call
        if (response) {
            const sortedPackages = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            setPackages(sortedPackages);
        }
    };

    const handleDelete = async (id: string) => {
        // Replace this with your actual delete logic
        const response = await deletePackageService(id);
        if (response) {
            message.success("Đã xóa gói thành công");
            setPackages(packages.filter(pkg => pkg.id !== id)); // Update the state
        } else {
            message.error("Không xóa được gói");
        }
    };

    const columns = [
        {
            title: 'Tên gói',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${priceUnit(price)}`,
        },
        {
            title: 'Tính năng',
            dataIndex: 'features',
            key: 'features',
            render: (features: string[]) => features.join(', '),
        },
        {
            title: 'Thời hạn',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record: ProPackage) => (
                <div className='flex gap-2'>
                    <EditOutlined
                        onClick={() => showModalUpdate(record)}
                        className='text-blue-500 cursor-pointer'
                        title="Chỉnh sửa"
                    />
                    <div>
                        <Popconfirm
                            title="Bạn có chắc muốn xóa gói này không?"
                            onConfirm={() => handleDelete(record.id + "")}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <Button type="link" icon={<DeleteOutlined />} danger title="Xóa" />
                        </Popconfirm>
                    </div>
                </div>
            ),
        },
    ];
    

    const showModalUpdate = (record: ProPackage) => {
        console.log("record: ", record)
        setCurrentPackage(record)
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        form.resetFields(); // Reset the form fields
        setIsModalOpen(false); // Close the modal
        setCurrentPackage(null); // Clear the current package state
    };

    const handleAddOrUpdatePackage = async (values: ProPackage) => {
        console.log("ProPackage:", values)
        try {
            if (currentPackage) {
                // Update existing package
                const response = await updatePackageService(currentPackage.id + "", values); // Replace with your actual update service
                if (response) {
                    message.success("Đã cập nhật gói thành công");
                    setCurrentPackage(null)
                } else {
                    message.error("Không cập nhật được gói");
                }
            } else {
                // Create new package
                const response = await createPackageService(values); // Replace with your actual create service
                if (response) {
                    message.success("Đã tạo gói thành công");
                } else {
                    message.error("Failed to create package");
                }
            }
            // Refresh the package list after adding or updating
            getPackagesFromStaff(); // Call your function to fetch the updated list of packages
            handleCancel(); // Close the modal
        } catch (error) {
            console.error("Error while adding/updating package:", error);
            message.error("An error occurred while processing your request");
        }
    };
    return (
        <div className="container mx-auto">
            <div className="mb-4">
                <Button onClick={() => { setIsModalOpen(true); setCurrentPackage(null); }} type="primary">Add Package</Button>
            </div>
            <ModalCreateUpdateProPackageDataProps
                proPackage={currentPackage} // Pass the current package for editing or null for creating
                form={form}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                onSubmit={handleAddOrUpdatePackage} // Define this function in your ManageProPackage component
            />
            <div className='text-3xl text-center mb-10 font-semibold'>Quản lý gói Pro</div>
            <Table
                dataSource={packages}
                columns={columns}
                rowKey="id" // Assuming 'id' is the unique identifier for each package

            />
        </div>
    );
};

export default ManageProPackage;