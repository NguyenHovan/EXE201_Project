import { Card, Col, Row } from 'antd';
import { priceUnit } from '../../consts/variable';
import { FlagOutlined } from '@ant-design/icons';
import PremiumButton from '../premium-button';
import { getUserDataFromLocalStorage } from '../../consts/variable'
import { createPaymentService } from '../../services/payment.services'
import { useNavigate } from 'react-router-dom'
import { UserProfile } from '../../pages/customer/profile';

interface iPremiumOptionCard {
    price: number;
    month: number;
    description: string;
    interest: string[];// Quyền lợi
    packageId: string,
    userProfile?: UserProfile
}

const PremiumOptionCard = ({ price, month, description, interest, packageId, userProfile }: iPremiumOptionCard) => {
    // const navigate = useNavigate()
    // const user = getUserDataFromLocalStorage()
    // const createPayment = async () => {
    //     const response = await createPaymentService(user?.userId + "")
    //     if (response) {
    //         console.log("createPayment: ", response)
    //         navigate(response.checkoutUrl)
    //     }
    // }
    const checkBought = userProfile?.purchasedPackages.filter((item) => item.proPackageId === packageId)
    console.log("checkBought: ", checkBought)
    return (
        <div className='mt-5'>
            <Card className='bg-purple-800 rounded-3xl' style={{ width: 350 }}>
                <div className='text-white text-2xl font-bold mt-5'>{priceUnit(price)} {month === 1 ? "/ tháng" : `/ ${month} tháng`}</div>
                <p className='text-orange-300'>{description}</p>
                <div className='mt-5'>
                    {interest.map((item) => {
                        return <div className='grid grid-cols-1 text-white mt-2'>
                            <Row>
                                <Col span={4}>
                                    <FlagOutlined />
                                </Col>
                                <Col span={20}>
                                    {item}
                                </Col>
                            </Row>
                        </div>
                    })}
                    {
                        interest.length === 4 && <div className='pb-7'></div>
                    }
                </div>
                <div className='text-center mt-20 mb-5'>
                    {checkBought?.length ===0 ? <PremiumButton packageId={packageId} text='Đăng Ký Ngay' /> :
                        <div>
                            <button
                                disabled
                                type="button"
                                className="text-purple-500 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                            >
                                Bạn đã mua gói
                            </button>
                        </div>
                    }
                </div>
            </Card>
        </div>
    )
}

export default PremiumOptionCard
