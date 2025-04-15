"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, Row, Col, Statistic, Typography, Spin, Divider, Progress, Space, Segmented, DatePicker } from "antd"
import {
    UserOutlined,
    DollarOutlined,
    PictureOutlined,
    ShoppingOutlined,
    FolderOutlined,
    CustomerServiceOutlined,
    CalendarOutlined,
    RiseOutlined,
} from "@ant-design/icons"
import { Pie } from "@ant-design/plots"
import { adminGetStatistics } from "../../../services/admin.services"

const { Title, Text } = Typography
const { RangePicker } = DatePicker

export interface DashboardData {
    customerCount: number
    totalRevenue: number
    totalArtworkCount: number
    artworkCountByStatus: {
        [key: string]: number
    }
    transactionCount: number,
    successTransactionCount: number,
    jobCount: number
    portfolioCount: number
    freelancerServiceCount: number
    proPackagePurchaseCount: number
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [timeRange, setTimeRange] = useState<string>("week")
    const [pieChartData, setPieChartData] = useState()
    useEffect(() => {
        fetchDashboardData()
    }, [timeRange])

    const fetchDashboardData = async () => {
        setLoading(true)
        try {
            const dashboardData = await adminGetStatistics()
            setData(dashboardData || null)
            const pieChartDataz = dashboardData
                ? Object.entries(dashboardData.artworkCountByStatus).map(([status, count]) => ({
                    type: status,
                    value: count,
                }))
                : []
                console.log('pieChartDataz: ', pieChartDataz)
            setPieChartData(pieChartDataz)
        } catch (error) {
            console.error("Error fetching dashboard data:", error)
        } finally {
            setLoading(false)
        }
    }

    // Prepare data for the pie chart


    // Calculate percentage for each status
    const calculatePercentage = (count: number, totalCount: number) => {
        if (!data || data.totalArtworkCount === 0) return 0
        return Math.round((count / totalCount) * 100)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        )
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={2} className="m-0">
                    Tổng Quan Hệ Thống
                </Title>
                {/* <Space>
                    <Segmented
                        options={[
                            { label: "Tuần này", value: "week" },
                            { label: "Tháng này", value: "month" },
                            { label: "Năm nay", value: "year" },
                        ]}
                        value={timeRange}
                        onChange={(value) => setTimeRange(value as string)}
                    />
                    <RangePicker placeholder={["Từ ngày", "Đến ngày"]} className="ml-4" format="DD/MM/YYYY" />
                </Space> */}
            </div>

            {/* Summary Cards */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong>Khách Hàng</Text>}
                            value={data?.customerCount}
                            prefix={<UserOutlined className="mr-2 text-blue-500" />}
                            valueStyle={{ color: "#3f8600" }}
                        />
                        <Text type="secondary" className="block mt-2">
                            <CalendarOutlined className="mr-1" /> Cập nhật hôm nay
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong>Doanh Thu</Text>}
                            value={data?.totalRevenue}
                            prefix={<DollarOutlined className="mr-2 text-green-500" />}
                            suffix="VND"
                            valueStyle={{ color: "#3f8600" }}
                        />
                        <Text type="secondary" className="block mt-2">
                            <CalendarOutlined className="mr-1" /> Cập nhật hôm nay
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong>Tác Phẩm</Text>}
                            value={data?.totalArtworkCount}
                            prefix={<PictureOutlined className="mr-2 text-purple-500" />}
                            valueStyle={{ color: "#3f8600" }}
                        />
                        <Text type="secondary" className="block mt-2">
                            <CalendarOutlined className="mr-1" /> Cập nhật hôm nay
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                        <Statistic
                            title={<Text strong>Giao Dịch thành công</Text>}
                            value={data?.successTransactionCount}
                            prefix={<ShoppingOutlined className="mr-2 text-orange-500" />}
                            valueStyle={{ color: "#3f8600" }}
                        />
                        <Text type="secondary" className="block mt-2">
                            <CalendarOutlined className="mr-1" /> Cập nhật hôm nay
                        </Text>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-6">
                {/* Artwork Status Distribution */}
                {/* <Col xs={24} lg={12}>
                    <Card
                        title={<Title level={4}>Phân Bố Trạng Thái Tác Phẩm</Title>}
                        bordered={false}
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div style={{ height: 300 }}>
                            <Pie
                                data={pieChartData}
                                angleField="value"
                                colorField="type"
                                radius={0.8}
                                label={{
                                    type: "outer",
                                    content: "{name} {percentage}",
                                }}
                                interactions={[{ type: "element-active" }]}
                                legend={{
                                    position: "bottom",
                                }}
                            />
                        </div>
                    </Card>
                </Col> */}

                {/* Status Breakdown */}
                <Col xs={24} lg={12}>
                    <Card
                        title={<Title level={4}>Chi Tiết Trạng Thái Tác Phẩm Nghệ Thuật</Title>}
                        bordered={false}
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="space-y-4">
                            {data &&
                                Object.entries(data.artworkCountByStatus).map(([status, count]) => (
                                    <div key={status}>
                                        <div className="flex justify-between mb-1">
                                            <Text strong>{status}</Text>
                                            <Text>
                                                {count}/{data.totalArtworkCount} ({calculatePercentage(count, data.totalArtworkCount)}%)
                                            </Text>
                                        </div>
                                        <Progress
                                            percent={calculatePercentage(count, data.totalArtworkCount)}
                                            showInfo={false}
                                            strokeColor={status === "Pending" ? "#faad14" : "#52c41a"}
                                        />
                                    </div>
                                ))}
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title={<Title level={4}>Chi Tiết Các Gói Đã Bán</Title>}
                        bordered={false}
                        className="shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="space-y-4">
                            {data &&
                                Object.entries(data.proPackagePurchaseCount).map(([status, count]) => (
                                    <div key={status}>
                                        <div className="flex justify-between mb-1">
                                            <Text strong>{status}</Text>
                                            <Text>
                                                {count}/{data.successTransactionCount} ({calculatePercentage(count, data.successTransactionCount)}%)
                                            </Text>
                                        </div>
                                        <Progress
                                            percent={calculatePercentage(count, data.successTransactionCount)}
                                            showInfo={false}
                                            strokeColor={status === "Pending" ? "#faad14" : "#52c41a"}
                                        />
                                    </div>
                                ))}
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* Additional Metrics */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card bordered={false} className="shadow-sm hover:shadow-md transition-shadow">
                        <Title level={4}>Các Chỉ Số Khác</Title>
                        <Divider />
                        <Row gutter={[32, 16]}>
                            <Col xs={24} sm={8}>
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <RiseOutlined className="text-blue-500 text-xl" />
                                    </div>
                                    <div>
                                        <Text type="secondary">Công Việc</Text>
                                        <div className="text-xl font-semibold">{data?.jobCount}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-3 rounded-full mr-4">
                                        <FolderOutlined className="text-purple-500 text-xl" />
                                    </div>
                                    <div>
                                        <Text type="secondary">Portfolio</Text>
                                        <div className="text-xl font-semibold">{data?.portfolioCount}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} sm={8}>
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-3 rounded-full mr-4">
                                        <CustomerServiceOutlined className="text-green-500 text-xl" />
                                    </div>
                                    <div>
                                        <Text type="secondary">Dịch Vụ Freelancer</Text>
                                        <div className="text-xl font-semibold">{data?.freelancerServiceCount}</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard
