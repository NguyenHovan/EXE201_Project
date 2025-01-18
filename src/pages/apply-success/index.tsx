import { CheckCircleOutlined } from "@ant-design/icons"

const ApplySuccess = () => {
    return (
        <div>
            <div style={{ width: "900" }} className="container mx-auto mt-10 bg-white border border-purple-500 rounded-lg shadow  dark:border-gray-700">
                <div className='m-5'>
                    <div className='text-xl text-center'>
                        Graphic Designer - A Company
                    </div>
                    <div className='border border-solid border-purple-900 mt-2'>
                    </div>
                    <div className="text-center mt-14">
                        <div className="font-bold text-xl">
                            Ứng tuyển với tài khoản Shoca của bạn
                        </div>
                        <div className="mt-2">
                            Đơn đăng ký của bạn sẽ được nộp kèm theo bản xem trước hồ sơ Shoca và các dự án gần đây nhất của bạn.
                        </div>
                        <div className="mt-14 text-8xl text-purple-800">
                            <CheckCircleOutlined />
                        </div>
                        <div className="mt-2">
                            Nộp đơn thành công
                        </div>
                        <button type="button" className="focus:outline-none mt-10 text-white bg-purple-900 hover:bg-purple-900 focus:ring-4 focus:ring-purple-900 font-medium rounded-xl text-sm px-5 py-2.5 mb-2 ">
                        Quay về Trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplySuccess
