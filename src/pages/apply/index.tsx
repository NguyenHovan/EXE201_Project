import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const ApplyPage = () => {
    return (
        <div>
            <div style={{ width: "900" }} className="container mx-auto mt-10 bg-white border border-purple-500 rounded-lg shadow  dark:border-gray-700">
                <div className='m-5'>
                    <div className='text-xl text-center'>
                        Graphic Designer - A Company
                    </div>
                    <div className='border border-solid border-purple-900 mt-2'>

                    </div>
                    <div className='mt-5 text-center font-bold text-xl'>
                        Ứng tuyển với tài khoản Shoca của bạn
                    </div>
                    <div className='mt-5 text-center mx-32'>
                        Đơn đăng ký của bạn sẽ được nộp kèm theo bản xem trước hồ sơ Shoca và các dự án gần đây nhất của bạn.
                    </div>
                    <div className='grid grid-cols-2 justify-items-center mt-5'>
                        <div className='w-96  bg-white border-2 border-purple-300 rounded-lg shadow p-2'>
                            <div className='flex justify-center mt-10'>
                                <Avatar size={64} icon={<UserOutlined />} />
                            </div>
                            <p className='font-bold text-center my-2'>
                                Designer
                            </p>
                            <div className='grid grid-cols-3'>
                                <div className='text-center'>
                                    <p className='my-2'>
                                        9
                                    </p>
                                    <p className='my-2'>
                                        Thích
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <p className='my-2'>
                                        9
                                    </p>
                                    <p className='my-2'>
                                        Theo dõi
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <p className='my-2'>
                                        9
                                    </p>
                                    <p className='my-2'>
                                        Lượt xem
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-96 text-gray-400 p-5 bg-white border-2 border-purple-300 rounded-lg shadow'>
                            Lời nhắn của bạn...
                        </div>
                    </div>
                    <div className='text-center '>
                        <button type="button" className="focus:outline-none mt-10 text-white bg-purple-900 hover:bg-purple-900 focus:ring-4 focus:ring-purple-900 font-medium rounded-xl text-sm px-5 py-2.5 mb-2 ">
                            Nộp đơn đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyPage
