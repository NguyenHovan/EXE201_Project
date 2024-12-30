import { Link } from 'react-router-dom'

const InternalServer = () => {
    return (
        <div className='text-center mt-32 items-center'>
            <div className='text-7xl'>
                500 Internal Server Error
            </div>
            <p className='mt-10'>Some error occurring. You may go home page.</p>
           <Link to={"/"}>
           <button type="button" className="mt-10 focus:outline-none text-white bg-purple-900 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
                Back to home page
            </button>
           </Link>
        </div>
    )
}

export default InternalServer