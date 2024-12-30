import {  DownCircleOutlined, FileOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Image, Row } from 'antd'
import { Card } from 'antd';
import { PurpleButtonComponent } from '../../../components';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
const CustomerOrderPage = () => {
    return (
        <div className='container mx-auto mt-10'>
            <Row gutter={20} >
                <Col span={18}>
                    <Image src='https://images.ui8.net/uploads/6_1729479362712.png'>
                    </Image>
                </Col>
                <Col span={6}>
                    <Card hoverable
                        style={{
                            width: 400,
                            border: '2px solid black', // Tăng độ dày viền và thay đổi màu
                            borderRadius: '8px',
                        }}
                    >
                        <p className='font-bold text-xl'>
                            Premcar - Premium Car Rent App
                        </p>
                        <Row>
                            <Col span={3}>
                                <Avatar size="small"
                                    icon={<UserOutlined className='text-black' />} />
                            </Col>
                            <Col span={19}>
                                Sans Design
                            </Col>
                        </Row>
                        <div className='text-center mt-5'>
                            <PurpleButtonComponent width={200} title='Buy Now' />
                        </div>
                        <div className='mt-5 text-lg'>
                            <p>
                                This mockup package consists of 3 item, packed with carefully organized PSD files featuring well-structured layers. Additionally, this mockup leverages the power of smart object functionality, facilitating easy replacement of existing designs with your own creations in seconds.
                            </p>
                        </div>
                        <Row>
                            <Col span={2}>
                                <FileOutlined className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>Filetype:</span> PSD</p>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col span={2}>
                                <DownCircleOutlined className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>Size:</span> 52.9 MB</p>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col span={2}>
                                <ReportIcon className='text-purple-500 text-xl' />
                            </Col>
                            <Col span={22}>
                                <p><span className='font-bold'>License:</span> Standard Commercial License</p>
                            </Col>
                        </Row>
                    </Card>
                    <div className='text-center mt-2'>
                    <ReportProblemIcon className='text-purple-900 cursor-pointer'/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default CustomerOrderPage