import { Table, Button, Tag, message, Modal, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getReports, updateStatusReportService } from '../../../services/report.services';
import { useEffect, useState } from 'react';
import { priceUnit } from '../../../consts/variable';

interface ReportData {
    id: string;
    status: string;
    creationDate: string;
    artwork: {
        title: string;
        description: string;
        price: number;
        thumbnailUrl: string;
    };
    reporter: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        avatarUrl: string;
    };
}

const ManageReports = () => {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<number>(0);
    const [currentStatus, setCurrentStatus] = useState<number>(0);;
    useEffect(() => {
        getReporters();
    }, []);

    const getReporters = async () => {
        const response = await getReports();
        if (response) {
            setReports(response.data);
        }
    };

    const handleOpenModal = (id: string, currentStatus: string) => {
        console.log("currentStatus: ", currentStatus)
        setSelectedId(id);
        setIsModalOpen(true);

        if (currentStatus === 'Resolved') {
            setCurrentStatus(1)
        } else if (currentStatus === 'Pending') {
            setCurrentStatus(0)
        }
        else if (currentStatus === 'Rejected') {
            setCurrentStatus(2)
        }
    };

    const handleStatusChange = (e: any) => {
        setSelectedStatus(e.target.value);
    };

    const handleOk = async () => {
        if (selectedId !== null && selectedStatus !== null) {
            await handleUpdateStatus(selectedId, selectedStatus);
            setIsModalOpen(false);
            setSelectedId(null);
            setSelectedStatus(0); // Reset to default
            getReporters(); // Refresh the report list
        } else {
            message.warning("Please select a status!");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedId(null);
        setSelectedStatus(0); // Reset to default
    };

    const columns: ColumnsType<ReportData> = [
        {
            title: 'Artwork Title',
            dataIndex: ['artwork', 'title'],
            key: 'artworkTitle',
        },
        {
            title: 'Artwork Description',
            dataIndex: ['artwork', 'description'],
            key: 'artworkDesc',
        },
        {
            title: 'Price',
            dataIndex: ['artwork', 'price'],
            key: 'price',
            render: (price: number) => `${priceUnit(price)}`,
        },
        {
            title: 'Reporter',
            key: 'reporterName',
            render: (_, record) =>
                `${record.reporter.firstName} ${record.reporter.lastName}`,
        },
        {
            title: 'Email',
            dataIndex: ['reporter', 'email'],
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: ['reporter', 'phoneNumber'],
            key: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Resolved' ? 'green' : status === 'Pending'? 'orange' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Creation Date',
            dataIndex: 'creationDate',
            key: 'creationDate',
            render: (date: string) =>
                new Date(date).toLocaleString('vi-VN', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleOpenModal(record.id, record.status)} type="primary">
                    Update Status
                </Button>
            ),
        },
    ];

    const handleUpdateStatus = async (id: string, status: number) => {
        const response = await updateStatusReportService(id, status);
        if (response) {
            message.success("Status updated successfully!");
            getReporters()
        } else {
            message.error("Failed to update status.");
        }
    };

    return (
        <>
            <Table columns={columns} dataSource={reports} rowKey="id" />
            <Modal
                title="Update Report Status"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Radio.Group onChange={handleStatusChange} defaultValue={currentStatus}>
                    <Radio value={0}>Pending</Radio>
                    <Radio value={1}>Resolved</Radio>
                    <Radio value={2}>Rejected</Radio>
                </Radio.Group>
            </Modal>
        </>
    );
};

export default ManageReports;