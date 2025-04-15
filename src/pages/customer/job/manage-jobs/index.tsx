import { useEffect, useState } from 'react';
import { Button, Table, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { getJobsService } from '../../../../services';
import { JobCardProps } from '../../../job';
import JobModal, { JobDataProps } from '../modal-create-update-job';
import { getCategoriesService } from '../../../../services/category.services';
import { Cate } from '../../artwork/manage-artwork';
import { createJobService, deleteJobService, updateJobService } from '../../../../services/job.service';
import { priceUnit } from '../../../../consts/variable';

const CustomerManageJob = () => {
    const [jobs, setJobs] = useState<JobCardProps[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<JobCardProps | null>(null);
    const [cates, setCates] = useState<Cate[]>([])

    useEffect(() => {
        getJobs();
        getCate();
    }, []);

    const getJobs = async () => {
        const response = await getJobsService();
        if (response) {
            console.log("getJobs: ", response);
            const sortedJobs = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            setJobs(response);
        }
    };

    const getCate = async () => {
        const response = await getCategoriesService();
        console.log("getCate: ", response)
        if (response) {
            setCates(response)
        }
    }

    const handleAddJob = async (data: JobDataProps) => {
        console.log("data: ", data)
        // Implement the logic to add a new job
        // After adding, refresh the job list
        const response = await createJobService(data)
        if (response) {
            getJobs();
            setIsModalOpen(false);
            message.success("Tạo job thành công!")
        }
    };

    const handleUpdateJob = async (data: JobDataProps) => {
        // Implement the logic to update the job
        // After updating, refresh the job list
        const response = await updateJobService(data, currentJob?.id + "")
        if (response) {
            getJobs();
            setIsModalOpen(false);
            setCurrentJob(null);
            message.success("Cập nhật job thành công!")
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
            title: 'Tiêu đề dự án',
            dataIndex: 'projectTitle',
            key: 'projectTitle',
        },
        {
            title: 'Tập tin đính kèm',
            dataIndex: 'fileAttachment',
            key: 'fileAttachment',
            render: (file: string) => (
                <a href={file} target="_blank" rel="noopener noreferrer">Xem tập tin</a>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'categories',
            key: 'categories',
        },
        {
            title: 'Ngân sách',
            dataIndex: 'budget',
            key: 'budget',
            render: (budget: number) => priceUnit(budget),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: string, record: JobCardProps) => (
                <>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentJob(record);
                            setIsModalOpen(true);
                        }}
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa công việc này?"
                        onConfirm={() => handleDeleteJob(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                </>
            ),
        },
    ];


    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <JobModal
                    open={isModalOpen}
                    onClose={() => { setIsModalOpen(false); setCurrentJob(null); }}
                    onSubmit={currentJob ? handleUpdateJob : handleAddJob}
                    initialData={currentJob}
                    categories={cates}
                />
                <div className="text-3xl font-bold text-center mb-4">Quản lý công việc</div>
                <div className="mb-4">
                    <Button onClick={() => { setIsModalOpen(true); setCurrentJob(null); }} type="primary" icon={<PlusOutlined />}>
                        Thêm công việc
                    </Button>
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

export default CustomerManageJob;