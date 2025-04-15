import { Button, Input, message, Modal, Select, Typography } from 'antd'
import { getAtWorksService } from '../../services/atworrk.services'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExclamationOutlined, SearchOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { getUserDataFromLocalStorage, IMG } from '../../consts/variable'
import { createReportService } from '../../services/report.services'
import { Creator } from '../atwork-detail'
const { Title, Text } = Typography;

export interface AtWork {
    title: string;
    description: string;
    fileUrl: string;
    thumbnailUrl: string;
    price: number;
    likeNumber: number | null;
    creatorId: string;
    portfolioId: string;
    categories: any[]; // Hoặc chỉnh sửa thành kiểu cụ thể nếu có
    id: string;
    creationDate: string;
    createdBy: string;
    modificationDate: string | null;
    modifiedBy: string | null;
    deletionDate: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
    images: string[];
    status: string;
    creator: Creator
}

const Home = () => {
    const [atworks, setAtWorks] = useState<AtWork[]>([]);
    const [filteredAtworks, setFilteredAtworks] = useState<AtWork[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [artWorkId, setArtWorkId] = useState<string>('');
    const [keyword, setKeyword] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [priceSort, setPriceSort] = useState<string>('');
    const user = getUserDataFromLocalStorage();

    const showModal = (id: string) => {
        setIsModalOpen(true)
        setArtWorkId(id)
    };

    const handleCancel = () => {
        setDescription('')
        setIsModalOpen(false)
    };

    const handleSubmit = async () => {
        console.log('Gửi báo cáo:', description, '', user?.userId + '', artWorkId);
        const response = await createReportService(description, '', user?.userId + '', artWorkId)
        if (response) {
            message.success('Tố cáo thành công')
            setDescription('')
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        getAtWorks()
    }, [])

    // Apply filters whenever filter states change
    useEffect(() => {
        applyFilters()
    }, [atworks, keyword, statusFilter, priceSort])

    const getAtWorks = async () => {
        const response = await getAtWorksService();
        console.log('getAtWorks: ', response)
        if (response) {
            setAtWorks(response.filter((item)=> item.status != 'AIgenerated'));
            setFilteredAtworks(response);
        }
    }

    const applyFilters = () => {
        let result = [...atworks];

        // Filter by keyword (search in title and description)
        if (keyword.trim() !== "") {
            const searchTerm = keyword.toLowerCase().trim();
            result = result.filter(
                (artwork) =>
                    artwork.title?.toLowerCase().includes(searchTerm) ||
                    artwork.description?.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by status
        if (statusFilter !== "") {
            result = result.filter((artwork) => artwork.status === statusFilter);
        }

        // Sort by price
        if (priceSort !== "") {
            if (priceSort === "asc") {
                result = [...result].sort((a, b) => a.price - b.price);
            } else if (priceSort === "desc") {
                result = [...result].sort((a, b) => b.price - a.price);
            }
        }

        setFilteredAtworks(result);
    };

    const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    const handleChangeStatus = (value: string) => {
        setStatusFilter(value);
    };

    const handleChangePriceSort = (value: string) => {
        setPriceSort(value);
    };

    const handleSearch = () => {
        applyFilters();
    };

    // Get unique statuses for the filter dropdown
    const uniqueStatuses = Array.from(new Set(atworks.map(artwork => artwork.status)));

    return (
        <div className='container mx-auto pb-10'>
            <div className='mt-20 flex items-center justify-center'>
                <div>
                    <p className='text-7xl font-thin m-0'>"Tác phẩm nghệ thuật"</p>
                    <p className='text-center mt-2'>Thiết kế là nghệ thuật, portfolio là câu chuyện</p>
                </div>
            </div>

            <div className='px-24'>
                <div className='border-solid border-2 mt-5'>
                </div>
                <div className='border-solid border-2 mt-2'>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className='px-24 mt-6 flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <Input
                        placeholder="Tìm kiếm tác phẩm..."
                        value={keyword}
                        onChange={handleChangeKeyword}
                        onPressEnter={handleSearch}
                        prefix={<SearchOutlined />}
                        style={{ width: 250 }}
                    />
                    <Select
                        placeholder="Trạng thái"
                        style={{ width: 150 }}
                        onChange={handleChangeStatus}
                        value={statusFilter || undefined}
                        allowClear
                        options={[
                            { value: "", label: "Tất cả trạng thái" },
                            ...uniqueStatuses.map(status => ({ value: status, label: status }))
                        ]}
                    />
                    <Select
                        placeholder="Sắp xếp theo giá"
                        style={{ width: 150 }}
                        onChange={handleChangePriceSort}
                        value={priceSort || undefined}
                        allowClear
                        options={[
                            { value: "", label: "Mặc định" },
                            { value: "asc", label: "Giá tăng dần" },
                            { value: "desc", label: "Giá giảm dần" }
                        ]}
                    />
                </div>
                <Button type="primary" onClick={handleSearch} style={{ backgroundColor: '#722ED1' }}>
                    Tìm kiếm
                </Button>
            </div>

            <div className='justify-items-center mt-10'>
                <div className='xl:grid grid-cols-4 gap-10'>
                    {
                        filteredAtworks.length > 0 ? (
                            filteredAtworks.map((item) => (
                                <div key={item.id}>
                                    <Link to={`/atworks/${item.id}`}>
                                        <div className=''>
                                            <img 
                                                className='w-[300px] h-[300px] object-cover object-left-top' 
                                                src={item.thumbnailUrl !== IMG.ARTWORK_TEMP ? item.thumbnailUrl : ""} 
                                                alt={item.title}
                                            />
                                        </div>
                                    </Link>
                                    <div className='mt-2 font-semibold flex grid grid-cols-2 justify-between items-center'>
                                        {item.title}
                                        <div className='grid grid-cols-2 gap-5 flex justify-between items-center'>
                                            <div className='border border-solid p-1 rounded-lg bg-purple-500 text-center w-[100px] text-white'>
                                                {item.status}
                                            </div>
                                            {
                                                user?.userId && (
                                                    <div>
                                                        <ExclamationOutlined 
                                                            onClick={() => showModal(item.id)} 
                                                            className='text-red-500 cursor-pointer'
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className='mt-1'>
                                        <span className='text-purple-500 font-medium'>{item.price.toLocaleString()} VND</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-4 text-center py-10'>
                                <p className='text-lg text-gray-500'>Không tìm thấy tác phẩm nào phù hợp</p>
                            </div>
                        )
                    }
                </div>
            </div>
            
            <Modal
                title={null}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                centered
                style={{ borderRadius: 8 }}
            >
                <div>
                    <Title level={5} style={{ marginTop: 10, color: '#722ED1' }}>
                        REPORT AI
                    </Title>
                    <Text>
                        Bạn nghi ngờ sản phẩm được tạo bằng AI, hãy cung cấp bằng chứng cho chúng tôi.
                    </Text>

                    <div style={{ marginTop: 20 }}>
                        <Text strong>Mô tả</Text>
                        <TextArea
                            rows={4}
                            placeholder="Nhập ......"
                            style={{ marginTop: 8, borderColor: '#D3B5F5' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: 20, textAlign: 'right' }}>
                        <Button
                            style={{ marginRight: 10, borderColor: '#722ED1', color: '#722ED1' }}
                            onClick={handleCancel}
                        >
                            HỦY BỎ
                        </Button>
                        <Button type="primary" style={{ backgroundColor: '#722ED1' }} onClick={handleSubmit}>
                            GỬI
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Home
