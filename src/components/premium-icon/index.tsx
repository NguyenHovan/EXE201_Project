import { CrownOutlined } from '@ant-design/icons'

const PremiumIcon = () => {
  return (
    <div>
      <button type="button" className="mt-5 text-white bg-purple-900 focus:outline-none focus:ring-4 focus:ring-purple-900 font-medium rounded-lg text-sm px-3 py-0.5 text-center mb-2 dark:bg-purple-900 dark:hover:bg-purple-900 dark:focus:ring-purple-900">
      <CrownOutlined className='text-yellow-500'/> Premium
      </button>
    </div>
  )
}

export default PremiumIcon
