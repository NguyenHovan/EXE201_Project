import { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { getUserDataFromLocalStorage, priceUnit } from "../../../consts/variable";
import { deleteArtworkService, getAtWorksService } from "../../../services/atworrk.services";
import { ArtworkData } from "../../customer/artwork/modal-create-update-artwork";

export interface AtWork {
    id: string; // Assuming you have an ID for each artwork
    title: string;
    description: string;
    thumbnailUrl: string;
    price: number;
    categories: any[]; // Adjust this type as necessary
}
export interface Cate {
    name: string; // The name of the graphic
    description: string; // A description of the graphic
    id: string; // Unique identifier for the graphic
    creationDate: string; // Date when the graphic was created (ISO 8601 format)
    createdBy: string; // User ID of the creator
    modificationDate: string; // Date when the graphic was last modified (ISO 8601 format)
    modifiedBy: string; // User ID of the person who last modified the graphic
    deletionDate: string | null; // Date when the graphic was deleted, if applicable
    deletedBy: string | null; // User ID of the person who deleted the graphic, if applicable
    isDeleted: boolean; // Flag indicating if the graphic is deleted
}
const AdminManageArtwork = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);

    useEffect(() => {
        getAtWorks();
    }, []);

    const user = getUserDataFromLocalStorage()

    const getAtWorks = async () => {
        const response = await getAtWorksService();
        if (response) {
            const sortedAtWorks = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            setAtWorks(sortedAtWorks);
        }
        
    };

    const handleDeleteArtwork = async (id: string) => {
        const response = await deleteArtworkService(id);
        if (response) {
            message.success("Tác phẩm nghệ thuật đã được xóa thành công");
            getAtWorks(); // Refresh the list
        } else {
            message.error("Không thể xóa tác phẩm nghệ thuật");
        }
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            render: (url: string) => (
                <img
                    src={url}
                    alt="Ảnh đại diện"
                    style={{ width: 100, height: 100, objectFit: 'cover' }}
                />
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${priceUnit(price)}`,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record: ArtworkData) => (
                <>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa tác phẩm này không?"
                        onConfirm={() => handleDeleteArtwork(record?.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" danger>Xóa</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    
    return (
        <div className="my-10">
            <div className="container mx-auto">
                <div className="text-3xl font-bold text-center mb-4">Quản lý tác phẩm nghệ thuật</div>
                <Table
                    dataSource={atworks}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }} // Adjust pagination as needed
                />
            </div>
        </div>
    );
};

export default AdminManageArtwork;