import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Image, Table, Popconfirm, message } from "antd";
import { getUserDataFromLocalStorage } from "../../../consts/variable";
import {  deletePortfolio, getPortfolios } from "../../../services/portfolio.services";

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

const AdminManagePortfolio = () => {
    const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
    const user = getUserDataFromLocalStorage();

    useEffect(() => {
        getPortfolioFromCustomer();
    }, []);

    const getPortfolioFromCustomer = async () => {
        const response = await getPortfolios();
        if (response) {
            console.log("res: ", response);
            setPortfolios(response);
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
            render: (record: Portfolio) => (
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
        <div className="my-10">
            <div className="container mx-auto">
                <div className="text-3xl font-bold text-center mb-4">
                    Manage Portfolio
                </div>
                <Table
                    dataSource={portfolios}
                    columns={columns}
                    rowKey="id"// Adjust pagination as needed
                />
            </div>
        </div>
    );
};

export default AdminManagePortfolio;