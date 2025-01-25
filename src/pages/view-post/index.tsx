import { CloseCircleOutlined, FlagOutlined, HeartOutlined, InfoCircleOutlined, LikeOutlined, UploadOutlined, WechatWorkOutlined } from '@ant-design/icons'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IMG } from '../../consts/variable';
import { useState } from 'react';
import { Button, Modal } from 'antd';
const ViewPost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Modal footer="" title={<div className='text-purple-500 text-3xl'>Chi tiết</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    Đã đăng vào lúc time - dd/mm/yyyy
                </div>
                <div className='grid grid-cols-4 gap-4 p-5 text-xl font-bold text-center'>
                    <div>
                        <div>
                            Lượt xem
                        </div>
                        285
                    </div>
                    <div>
                        <div>
                            Đã lưu
                        </div>
                        285
                    </div>
                    <div>
                        <div>
                            Yêu thích
                        </div>
                        285
                    </div>
                    <div>
                        <div>
                            Bình luận
                        </div>
                        285
                    </div>
                </div>
                <div className='text-purple-500 text-xl font-bold'>
                    Tags
                </div>
                <div className='flex gap-4 mt-5'>
                    <div className='text-purple-500 text-md font-bold border-purple-400 border cursor-pointer rounded-xl p-2'>
                        Branding
                    </div>
                    <div className='text-purple-500 text-md font-bold border-purple-400 border cursor-pointer rounded-xl p-2'>
                        Product design
                    </div>
                    <div className='text-purple-500 text-md font-bold border-purple-400 border cursor-pointer rounded-xl p-2'>
                        Logo
                    </div>
                </div>
            </Modal>
            <div className='container mx-auto mt-10'>
                <div className='flex justify-between'>
                    <div className='text-3xl font-bold'>
                        Name project
                    </div>
                    <div className='text-purple-500 flex items-center text-3xl cursor-pointer'>
                        <CloseCircleOutlined />
                    </div>
                </div>
                <div className='flex justify-between mt-5'>
                    <div className='flex'>
                        <div className='mr-10'>
                            <AccountCircleIcon style={{ fontSize: '60px' }} />
                        </div>
                        <div className='mr-10 '>
                            <div className='text-2xl font-bold'>
                                Account
                            </div>
                            <div className='text-md mt-2'>
                                time - dd/mm/yyyy
                            </div>
                        </div>
                        <div className='mr-10 text-2xl font-bold'>
                            Follow
                        </div>
                    </div>
                    <div className='flex text-3xl gap-10'>
                        <div className='text-purple-500'>
                            <HeartOutlined />
                        </div>
                        <div className='text-purple-500'>
                            <LikeOutlined />
                        </div>
                        <div className='text-red-500'>
                            <FlagOutlined />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 mt-10'>
                    <div className='col-span-11 justify-items-center'>
                        <div style={{ width: "1300px" }} className="p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className='font-bold text-xl'>
                                Text
                            </div>
                            <img className='mt-5' src={IMG.IMG_TEMP} alt="" />
                            <div className='font-bold text-xl mt-5'>
                                Text
                            </div>
                            <img className='mt-5' src={IMG.IMG_TEMP} alt="" />
                        </div>
                    </div>
                    <div className='col-span-1 justify-items-center text-3xl text-purple-500'>
                        <div >
                            <WechatWorkOutlined className='mt-14 cursor-pointer' />
                        </div>
                        <div className='mt-5'>
                            <UploadOutlined className='cursor-pointer' />
                        </div>
                        <div className='mt-5'>
                            <InfoCircleOutlined onClick={showModal} className='cursor-pointer' />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ViewPost