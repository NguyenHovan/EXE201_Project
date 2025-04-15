import { useEffect, useState } from "react";
import { Button, Table, message, Select, Modal, Form } from "antd";
import { ArtworkData } from "../../customer/artwork/modal-create-update-artwork";
import { priceUnit } from "../../../consts/variable";
import { getAtWorksService } from "../../../services/atworrk.services";
import { staffCheckAi } from "../../../services/staff.services";


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

const { Option } = Select;

const statusOptions = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'NoAi' },
    { value: 2, label: 'AIgenerated' },
];
const CheckAiArtWork = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState<ArtworkData | null>(null);
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        console.log("currentArtwork: ", currentArtwork)
        console.log("values.status: ", values.status)
        const response = await staffCheckAi(currentArtwork?.id + '', values.status)
        if (response) {
            message.success('Thay đổi trạng thái thành công!')
            getAtWorks();
        }
        onClose(); // Đóng modal sau khi cập nhật
    };

    const onClose = () => {
        setIsModalOpen(false)
    }

    useEffect(() => {
        getAtWorks();
    }, []);

    const getAtWorks = async () => {
        const response = await getAtWorksService();
        console.log("getAtWorks: ", response)
        if (response) {
            const sortedAtWorks = response.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime());
            console.log("artworksFilter: ", sortedAtWorks)
            setAtWorks(sortedAtWorks);
        }
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ảnh thu nhỏ',
            dataIndex: 'thumbnailUrl',
            key: 'thumbnailUrl',
            render: (url: string) => (
                <img
                    src={url}
                    alt="Thumbnail"
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
                <Button type="link" onClick={() => showModal(record)}>
                    Thay đổi trạng thái
                </Button>
            ),
        },
    ];

    const showModal = (record: ArtworkData) => {
        console.log("record: ", record)
        setCurrentArtwork(record);
        setIsModalOpen(true);
    }

    return (
        <div className="mx-20 my-10">
            <div className="container mx-auto">
                <Modal
                    title="Cập nhật trạng thái"
                    open={isModalOpen}
                    onCancel={onClose}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={{ status: currentArtwork?.status }}
                    >
                        <Form.Item
                            name="status"
                            label="Trạng thái"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        >
                            <Select placeholder="Chọn trạng thái">
                                {statusOptions.map(option => (
                                    <Select.Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <div className="text-3xl font-bold text-center mb-4">Quản lý tác phẩm nghệ thuật</div>
                <Table
                    dataSource={atworks}
                    columns={columns}
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default CheckAiArtWork;