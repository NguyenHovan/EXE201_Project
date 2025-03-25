import { useEffect, useState } from "react";
import { Button, Table, Popconfirm, message } from "antd";

import { createArtworkService, deleteArtworkService, getAtWorksService, updateArtworkService } from "../../../../services/atworrk.services";
import { getCategoriesService } from "../../../../services/category.services";
import ModalCreateUpdateArtwork, { ArtworkData } from "../modal-create-update-artwork";
import { getUserDataFromLocalStorage, priceUnit } from "../../../../consts/variable";

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
const ManageArtwork = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState<ArtworkData | null>(null);
    const [cates, setCates] = useState<Cate[]>([])

    useEffect(() => {
        getAtWorks();
        getCate();
    }, []);
    const user = getUserDataFromLocalStorage()
    const getAtWorks = async () => {
        const response = await getAtWorksService();
        if (response) {
            const sortedAtWorks = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            const artworksFilter = sortedAtWorks.filter(item => item.createdBy === user?.userId)
            setAtWorks(artworksFilter);
        }
        
    };
    const getCate = async () => {
        const response = await getCategoriesService();
        console.log("getCate: ", response)
        if (response) {
            setCates(response)
        }
    }
    const handleAddArtwork = async (data: ArtworkData) => {
        const response = await createArtworkService(data);
        if (response) {
            message.success("Artwork added successfully");
            getAtWorks(); // Refresh the list
            setIsModalOpen(false);
        } else {
            message.error("Failed to add artwork");
        }
    };

    const handleUpdateArtwork = async (data: ArtworkData) => {
        if (currentArtwork) {
            console.log("currentArtwork: ", currentArtwork)
            const response = await updateArtworkService(currentArtwork?.id + "", data);
            if (response) {
                message.success("Artwork updated successfully");
                getAtWorks(); // Refresh the list
                setIsModalOpen(false);
                setCurrentArtwork(null);
            } else {
                message.error("Failed to update artwork");
            }
        }
    };

    const handleDeleteArtwork = async (id: string) => {
        const response = await deleteArtworkService(id);
        if (response) {
            message.success("Artwork deleted successfully");
            getAtWorks(); // Refresh the list
        } else {
            message.error("Failed to delete artwork");
        }
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            render: (url: string) => <img src={url} alt="Thumbnail" style={{ width: 100, height: 100, objectFit: 'cover' }} />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${priceUnit(price)}`,
        },
        {
            title: 'Action',
            key: 'action',
            render: ( record: ArtworkData) => (
                <>
                    <Button type="link" onClick={() => showModalUpdate(record)}>Update</Button>
                    <Popconfirm
                        title="Are you sure to delete this artwork?"
                        onConfirm={() => handleDeleteArtwork(record?.id+"")}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const showModalUpdate = (record: ArtworkData)=>{
        console.log("record: ", record)
        setCurrentArtwork(record);
        setIsModalOpen(true);
    }
    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <ModalCreateUpdateArtwork
                categories={cates}
                    open={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setCurrentArtwork(null); }}
                    onSubmit={currentArtwork ? handleUpdateArtwork : handleAddArtwork}
                    initialData={currentArtwork || null}
                />
                <div className="text-3xl font-bold text-center mb-4">Manage Artwork</div>
                <div className="mb-4">
                    <Button onClick={() => { setIsModalOpen(true); setCurrentArtwork(null); }} type="primary">Add Artwork</Button>
                </div>
                <Table
                    dataSource={atworks}
                    columns={columns}
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default ManageArtwork;