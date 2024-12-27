import { Button, Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { ArtistCard, DesignCard } from '../../components'

const index = () => {
    return (
        <div className='container mx-auto'>
            <div className='h-60 flex items-center justify-center'>
                <div>
                    <p className='text-7xl font-thin m-0'>"God is a design"</p>
                    <p className='text-center mt-2'>Thiết kế là nghệ thuật, portfolio là câu chuyện</p>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                <div className=''>
                    <Button className="bg-red-500 mr-10 text-white">
                        Nổi bật
                    </Button>
                    <Button className="bg-red-500 mr-10 text-white" >Xu Hướng</Button>
                    <Button className="bg-red-500 text-white" >Mới nhất</Button>
                </div>
            </div>

            <div className='px-24'>
                <div className='border-solid border-2 mt-5'>
                </div>
                <div className='border-solid border-2 mt-2'>
                </div>
            </div>

            <Row className='mt-10'>
                <Col span={6}>
                    <ArtistCard />
                </Col>
                <Col span={6}>
                    <ArtistCard />
                </Col>
                <Col span={6}>
                    <ArtistCard />
                </Col>
                <Col span={6}>
                    <ArtistCard />
                </Col>
            </Row>
            <Title className='text-center mt-10' level={1}>Khám phá những thiết kế sáng tạo</Title>
            <Row className='mt-10'>
                <Col span={6}>
                    <DesignCard
                    title='Premcar - Premium Car Rent App'
                    image='https://images.ui8.net/uploads/6_1729479362712.png'
                    _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                    title='Premcar - Premium Car Rent App'
                    image='https://images.ui8.net/uploads/6_1729479362712.png'
                    _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                    title='Premcar - Premium Car Rent App'
                    image='https://images.ui8.net/uploads/6_1729479362712.png'
                    _id=''
                    />
                </Col>
                <Col span={6}>
                    <DesignCard
                    title='Premcar - Premium Car Rent App'
                    image='https://images.ui8.net/uploads/6_1729479362712.png'
                    _id=''
                    />
                </Col>
            </Row>

           <div className='text-center mt-10'>
           <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-2xl text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Xem thêm</button>
           </div>
        </div>
    )
}

export default index
