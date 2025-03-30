import Title from 'antd/es/typography/Title'
import { PremiumButton, PremiumIcon, PremiumOptionCard } from '../../../components'
import { Col, Row } from 'antd'


const RegisterPremiumPage = () => {


  return (
    <div className='container mx-auto'>
      <PremiumIcon />
      <Title className='mt-5' level={1}>
        Nâng tầm Portfolio của bạn – Đăng ký tài khoản Premium ngay!
        <p className='text-orange-300 ' >Nơi bạn thể hiện đẳng cấp và sự chuyên nghiệp.</p>
      </Title>
      <PremiumButton text='Thử 7 ngày miễn phí' />

      <Row>
        <Col span={24}>
          <div className='justify-items-center'>
          <PremiumOptionCard
            price={10000}
            month={1}
            description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
            interest={[
              'Cho phép đổi màu BG của profile',
              'Tăng data upload',
              'Tăng đề xuất',
              'Có khung và huy hiệu PRE'
            ]}
          />
          </div>
        </Col>
      </Row>
      <div className='text-center'>
        <p className='text-xl text-purple-800 m-0 pt-10'>Nâng cấp ngay – Tận dụng các tính năng vượt trội của gói Pro!</p>
        <div className='text-red-500'>Đảm bảo hoàn tiền trong 30 ngày nếu không hài lòng.</div>
      </div>
    </div>
  )
}

export default RegisterPremiumPage
