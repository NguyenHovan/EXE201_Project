export interface ProPackage {
    id?: string; // Unique identifier for the package
    name: string;
    price: number;
    features: string[];
    duration: string;
}

import { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Form } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { createPackageService, deletePackageService, getPackages, updatePackageService } from '../../../services/packages.services';
import { priceUnit } from '../../../consts/variable';
import ModalCreateUpdateProPackageDataProps from '../modal-craete-update-package';
import { Cate } from '../../admin/manage-artworks';

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
        const sortedPackages = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
        setPackages(sortedPackages);
    };

    const handleDelete = async (id: string) => {
        // Replace this with your actual delete logic
        const response = await deletePackageService(id);
        if (response) {
            message.success("Package deleted successfully");
            setPackages(packages.filter(pkg => pkg.id !== id)); // Update the state
        } else {
            message.error("Failed to delete package");
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${priceUnit(price)}`,
        },
        {
            title: 'Features',
            dataIndex: 'features',
            key: 'features',
            render: (features: string[]) => features.join(', '),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: ProPackage) => (
                <div className='flex gap-2'>
                    <EditOutlined onClick={()=>showModalUpdate(record)}  className='text-blue-500'/>
                    <div>
                        <Popconfirm
                            title="Are you sure to delete this package?"
                            onConfirm={() => handleDelete(record.id+"")}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link" icon={<DeleteOutlined />} danger />
                        </Popconfirm>
                    </div>
                </div>
            ),
        },
    ];

    const showModalUpdate=(record: ProPackage)=>{
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
                    message.success("Package updated successfully");
                    setCurrentPackage(null)
                } else {
                    message.error("Failed to update package");
                }
            } else {
                // Create new package
                const response = await createPackageService(values); // Replace with your actual create service
                if (response) {
                    message.success("Package created successfully");
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
        <div className="container">
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
            <div className='text-3xl text-center mb-10 font-semibold'>Manage Pro Packages</div>
            <Table
                dataSource={packages}
                columns={columns}
                rowKey="id" // Assuming 'id' is the unique identifier for each package

            />
        </div>
    );
};

export default ManageProPackage;