import { Link, useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleGoToHome = () => {
        navigate('/')
        window.location.reload()
    }
    
    return (
        <div className='text-center mt-32 items-center'>
            <div className='text-7xl'>
            404 Không tìm thấy
            </div>
            <p className='mt-10'>Không tìm thấy trang bạn đã truy cập. Bạn có thể quay lại trang chủ.</p>
            <button onClick={handleGoToHome} type="button" className="mt-10 focus:outline-none text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                Trở lại trang chủ
            </button>
        </div>
    )
}

export default NotFoundPage