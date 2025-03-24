import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobService } from "../../services/job.service";
import { Card, Typography, Tag, Divider, Button, Image } from "antd";
import { DollarOutlined, ClockCircleOutlined, EnvironmentOutlined, FileOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { JobCardProps } from "../job";

const { Title, Text } = Typography;

const JobDetail = () => {
    const { id } = useParams();
    const [job, setJob] = useState<JobCardProps>();

    useEffect(() => {
        if (id) {
            getJob();
        }
    }, [id]);

    const getJob = async () => {
        if (id) {
            const response = await getJobService(id);
            if (response) {
                console.log("getJob: ", response);
                setJob(response);
            }
        }
    };

    if (!job) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-3xl shadow-lg rounded-lg">
                <Title level={2} className="text-center">{job.projectTitle}</Title>
                <Tag color="blue" className="text-lg">{job.categories}</Tag>
                <Divider />
                <div className="space-y-4">
                    <Text><DollarOutlined /> <strong>Budget:</strong> ${job.budget}</Text>
                    <br />
                    <Text><ClockCircleOutlined /> <strong>Time Frame:</strong> {job.timeFrame}</Text>
                    <br />
                    <Text><EnvironmentOutlined /> <strong>Location:</strong> {job.location}</Text>
                    <br />
                    <Text><UserOutlined /> <strong>Created By:</strong> {job.personalInformation}</Text>
                    <br />
                    <Text><MailOutlined /> <strong>Email:</strong> {job.personalInformation.split(", ")[1]}</Text>
                    <br />
                    <Text><strong>Description:</strong> {job.description}</Text>
                </div>
                <Divider />
                <div className="text-center">
                    <Image width={200} src={job.fileAttachment} alt="Attachment" />
                    <br />
                    <Button type="primary" icon={<FileOutlined />} href={job.fileAttachment} target="_blank" className="mt-4">
                        View Attachment
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default JobDetail;