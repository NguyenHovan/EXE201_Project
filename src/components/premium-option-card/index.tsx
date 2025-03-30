import { Card, Col, Row } from 'antd';
import { priceUnit } from '../../consts/variable';
import { FlagOutlined } from '@ant-design/icons';
import PremiumButton from '../premium-button';
import { getUserDataFromLocalStorage } from '../../consts/variable'
import { createPaymentService } from '../../services/payment.services'
import { useNavigate } from 'react-router-dom'

interface iPremiumOptionCard {
    price: number;
    month: number;
    description: string;
    interest: string[];// Quyền lợi
}

const PremiumOptionCard = ({ price, month, description, interest }: iPremiumOptionCard) => {
    // const navigate = useNavigate()
    // const user = getUserDataFromLocalStorage()
    // const createPayment = async () => {
    //     const response = await createPaymentService(user?.userId + "")
    //     if (response) {
    //         console.log("createPayment: ", response)
    //         navigate(response.checkoutUrl)
    //     }
    // }
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
                    <PremiumButton text='Đăng Ký Ngay' />
                </div>
            </Card>
        </div>
    )
}

export default PremiumOptionCard
