import { Col, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import { AdminDashboardCard } from '../../../components'
import NorthEastOutlinedIcon from '@mui/icons-material/NorthEastOutlined';
import GroupIcon from '@mui/icons-material/Group';
import { BarChart } from '@mui/x-charts/BarChart';
import { Select } from 'antd';

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
const StaffDashboard = () => {
    return (
        <div className='container pl-20 mx-auto mt-10'>
            <Title level={1}>Dashboard</Title>
            <Row>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
            </Row>

            <Row className='mt-10'>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
            </Row>

            <Row className='mt-10'>
                <Col span={16}>
                    <div className='grid grid-cols-2'>
                    <Title level={4}>Total Downloads</Title>
                    <Select
                        defaultValue="2021"
                        style={{ width: 100 }}
                        onChange={handleChange}
                        options={[
                            {
                                options: [
                                    { label: <span>2022</span>, value: '2022' },
                                    { label: <span>2021</span>, value: '2021' },
                                ],
                            },
                        ]}
                    />
                    </div>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={800}
                        height={480}
                    />
                </Col>
                <Col span={8}>
                    <AdminDashboardCard
                        arrowIcon={<NorthEastOutlinedIcon style={{ fontSize: '50px' }} className='text-green-500' />}
                        title='Total User'
                        icon={<GroupIcon style={{ fontSize: '50px' }} className=' text-purple-500' />}
                        valueNumber={10000}
                        percent={5}
                        description='Up from Yesterday'
                    />
                </Col>
            </Row>
        </div>
    )
}

export default StaffDashboard
