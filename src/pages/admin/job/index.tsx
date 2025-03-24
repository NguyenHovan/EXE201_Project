import { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import {  DeleteOutlined } from '@ant-design/icons';
import { JobCardProps } from '../../job';
import { getJobsService } from '../../../services';
import { deleteJobService } from '../../../services/job.service';

const AdminManageJob = () => {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        const response = await getJobsService();
        if (response) {
            console.log("getJobs: ", response);
            const sortedJobs = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            setJobs(sortedJobs);
        }
    };

    // Xóa ảnh khỏi danh sách

    const handleDeleteJob = async (id: string) => {
        const response = await deleteJobService(id);
        if (response) {
            message.success("Xoá job thành công!");
            getJobs(); // Refresh the job list
        } 
    };

    const columns = [
        {
            title: 'Project Title',
            dataIndex: 'projectTitle',
            key: 'projectTitle',
        },
        {
            title: 'File Attachment',
            dataIndex: 'fileAttachment',
            key: 'fileAttachment',
            render: (file: string) => (
                <a href={file} target="_blank" rel="noopener noreferrer">View File</a>
            ),
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
        },
        {
            title: 'Budget',
            dataIndex: 'budget',
            key: 'budget',
            render: (budget: number) => `$${budget.toFixed(2)}`,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: JobCardProps) => (
                <>
                    <Popconfirm
                        title="Are you sure to delete this job?"
                        onConfirm={() => handleDeleteJob(record.id)} // Assuming fileAttachment is the job ID
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="my-10">
            <div className="container mx-auto">
                <div className="text-3xl font-bold text-center mb-4">Manage Jobs</div>
                <div className="mb-4">
                </div>
                <Table
                    dataSource={jobs}
                    columns={columns}
                    rowKey="fileAttachment" // Assuming fileAttachment is unique for each job
                    pagination={{ pageSize: 10 }} // Adjust pagination as needed
                />
            </div>
        </div>
    );
};

export default AdminManageJob;