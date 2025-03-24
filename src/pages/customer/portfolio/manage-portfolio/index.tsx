import { useEffect, useState } from "react";
import { createPortfolio, deletePortfolio, getPortfolios } from "../../../../services/portfolio.services";
import { Link } from "react-router-dom";
import { Button, Image, Table, Popconfirm, message } from "antd";
import PortfolioModal, { PortfolioData } from "../portfolio-modal";
import { getUserDataFromLocalStorage } from "../../../../consts/variable";

export interface Portfolio {
    title: string;
    description: string;
    coverImageUrl: string;
    userId: string;
    skills: string;
    experience: string;
    contactUrl: string;
    imageUrls: string[];
    id: string;
    creationDate: string;
    createdBy: string;
    modificationDate: string | null;
    modifiedBy: string | null;
    deletionDate: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
}

const ManagePortfolio = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = getUserDataFromLocalStorage();

    useEffect(() => {
        getPortfolioFromCustomer();
    }, []);

    const getPortfolioFromCustomer = async () => {
        const response = await getPortfolios();
        if (response) {
            console.log("res: ", response);
            setPortfolios(response.filter((item) => item.userId === user?.userId));
        }
    };

    const handleCreatePortfolio = async (data: PortfolioData) => {
        console.log("Dữ liệu portfolio:", data);
        setIsModalOpen(false);
        if (data) {
            const response = await createPortfolio(data);
            if (response) {
                console.log("handleCreatePortfolio: ", response);
                window.location.reload();
            }
        }
    };

    const handleDeletePortfolio = async (id: string) => {
        const response = await deletePortfolio(id);
        if (response) {
            message.success("Portfolio deleted successfully");
            getPortfolioFromCustomer(); // Refresh the portfolio list
        } else {
            message.error("Failed to delete portfolio");
        }
    };

    // Define columns for the Ant Design Table
    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: Portfolio) => (
                <Link to={`/customer/portfolios/${record.id}`}>{text}</Link>
            ),
        },
        {
            title: 'Cover Image',
            dataIndex: 'coverImageUrl',
            key: 'coverImageUrl',
            render: (url: string) => (
                <Image width={"100px"} src={url} />
            ),
        },
        {
            title: 'Skills',
            dataIndex: 'skills',
            key: 'skills',
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Contact URL',
            dataIndex: 'contactUrl',
            key: 'contactUrl',
            render: (text: string) => (
                <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {text}
                </a>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: Portfolio) => (
                <Popconfirm
                    title="Are you sure to delete this portfolio?"
                    onConfirm={() => handleDeletePortfolio(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link" danger>
                        Delete
                    </Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <PortfolioModal
                    userId={user?.userId ? user.userId : ""}
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreatePortfolio}
                />
                <div className="text-3xl font-bold text-center mb-4">
                    My Portfolio
                </div>
                <div className="mb-4">
                    <Button onClick={() => setIsModalOpen(true)} type="primary">Thêm Portfolio</Button>
                </div>
                <Table
                    dataSource={portfolios}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }} // Adjust pagination as needed
                />
            </div>
        </div>
    );
};

export default ManagePortfolio;