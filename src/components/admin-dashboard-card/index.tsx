import React from 'react'
import { Card, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';

interface iAdminDashboardCard {
    title: string;
    valueNumber: number;
    percent: number;
    description: string
    icon: React.ReactNode
    arrowIcon: React.ReactNode
}

const AdminDashboardCard = ({ title, valueNumber, percent, description, icon, arrowIcon }: iAdminDashboardCard) => {
    return (
        <Card style={{ width: 300 }}>
            <Row>
                <Col span={20}>
                    <Title level={5}>{title}</Title>
                </Col>
                <Col span={4}>
                    <div>
                        {icon}
                    </div>
                </Col>
            </Row>
            <Title level={2}>{valueNumber}</Title>
            <Row gutter={5} className='flex items-center text-center'>
                <Col  span={4}>{arrowIcon}</Col>
                <Col className='text-green-500' span={4}>{percent}%</Col>
                <Col span={16}>{description}</Col>
            </Row>
        </Card>
    )
}

export default AdminDashboardCard
