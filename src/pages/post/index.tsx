
const PostPage = () => {
    return (
        <div className='container mx-auto'>
            <div className='flex justify-between mt-10'>
                <button className='border border-solid border-purple-700 p-1 px-2 rounded-xl text-purple-700 font-bold'>
                    Hủy bỏ
                </button>
                <div className='flex '>
                    <button className='mr-2 border border-solid border-purple-700 p-1 px-2 rounded-xl text-purple-700 font-bold'>
                        Lưu bản nháp
                    </button>
                    <button className='border border-solid bg-purple-700 p-1 px-2 rounded-xl text-white '>
                        Tiếp tục
                    </button>
                </div>
            </div>
            <div className='mt-10 text-3xl font-bold text-center mb-20'>
                Chia sẻ tác phẩm của bạn với mọi người
            </div>
            {/* <div className="justify-items-center">
                
            </div> */}
            <div style={{ width: "900" }} className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="mt-10 text-center text-xl font-bold">
                    Kéo và thả một hình ảnh hoặc Browse
                </div>
                <div className="flex justify-center text-purple-500">
                    <img width={500} src="data:image/png;base64,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" alt="" />
                </div>
                <div className="mt-5 text-center text-xl font-bold">
                    Khuyến nghị chiều rộng tối thiểu 1600px. Tối đa 10MB mỗi hình ảnh (20MB cho video)
                </div>
                <div className=" grid grid-cols-2 text-xl font-bold mx-56 mt-10">
                    <div>
                        . Hình ảnh có độ phân giải cao (png, jpg, gif)
                    </div>
                    <div>
                        . Audio (avi, mp3)
                    </div>
                </div>
                <div className=" grid grid-cols-2 text-xl font-bold mx-56 mt-10 mb-20">
                    <div>
                        . Video (mp4)
                    </div>
                    <div>
                        . Chỉ tải lên phương tiện mà bạn sở hữu bản quyền
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage