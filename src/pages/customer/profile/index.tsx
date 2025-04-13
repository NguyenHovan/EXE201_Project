"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Avatar, Button, Card, DatePicker, Form, Input, Select, Typography, message, Upload, Divider, Spin, Col, Row } from "antd"
import {
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    UserOutlined,
    GlobalOutlined,
    HomeOutlined,
    PhoneOutlined,
    CalendarOutlined,
    PlusOutlined,
} from "@ant-design/icons"
import moment from "moment"
import type { UploadProps } from "antd"
import type { RcFile } from "antd/es/upload/interface"
import { getUserDataFromLocalStorage } from "../../../consts/variable"
import { CustomerEditProfile, CustomerGetProfile } from "../../../services/account.services"
import { uploadToCloudinary } from "../../../consts/function"
import { PremiumOptionCard } from "../../../components"

const { Title, Text } = Typography
const { Option } = Select

export interface UserProfile {
    firstName: string
    lastName: string
    gender: string | number
    dateOfBirth: string
    address: string
    avatarUrl: string | null
    email: string
    phoneNumber: string
    emailConfirmed: boolean
    personalWebsiteUrl: string | null
    portfolioUrl: string | null
    role: string | number
    id: string
    creationDate: string
    createdBy: string | null
    modificationDate: string
    modifiedBy: string
    deletionDate: string | null
    deletedBy: string | null
    isDeleted: boolean,
    purchasedPackages: PurchasedPackage[]
}

interface EditableProfile {
    firstName: string
    lastName: string
    gender: number
    dateOfBirth: string
    address: string
    avatarUrl: string
    personalWebsiteUrl: string
    portfolioUrl: string
    phoneNumber: string
    role: number
}

interface PurchasedPackage {
    id: string;
    proPackageId: string;
    packageStatus: string; // You can adjust possible values
    startDate: string; // or Date if you parse it
    endDate: string;   // or Date
}
const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [form] = Form.useForm()
    const user = getUserDataFromLocalStorage()
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchUserProfile()
    }, [])

    useEffect(() => {
        if (profile) {
            form.setFieldsValue({
                firstName: profile.firstName,
                lastName: profile.lastName,
                gender: profile.gender === "Male" ? 0 : profile.gender === "Female" ? 1 : 2,
                dateOfBirth: profile.dateOfBirth ? moment(profile.dateOfBirth) : null,
                address: profile.address,
                avatarUrl: profile.avatarUrl,
                personalWebsiteUrl: profile.personalWebsiteUrl,
                portfolioUrl: profile.portfolioUrl,
                phoneNumber: profile.phoneNumber,
                role: typeof profile.role === "string" ? (profile.role === "Admin" ? 0 : 1) : profile.role,
            })
            setFileUrl(profile.avatarUrl)
        }
    }, [profile])

    const fetchUserProfile = async () => {
        setLoading(true)
        try {
            const userData = await CustomerGetProfile(user?.userId + "")
            setProfile(userData?.data)
            // Initialize form with user data
            form.setFieldsValue({
                firstName: userData.firstName,
                lastName: userData.lastName,
                gender: userData.gender === "Male" ? 0 : userData.gender === "Female" ? 1 : 2,
                dateOfBirth: userData.dateOfBirth ? moment(userData.dateOfBirth) : null,
                address: userData.address,
                avatarUrl: userData.avatarUrl,
                personalWebsiteUrl: userData.personalWebsiteUrl,
                portfolioUrl: userData.portfolioUrl,
                phoneNumber: userData.phoneNumber,
                role: typeof userData.role === "string" ? (userData.role === "Admin" ? 0 : 1) : userData.role,
            })
            setFileUrl(userData.avatarUrl)
        } catch (error) {
            console.error("Không thể tải thông tin hồ sơ:", error)
            message.error("Không thể tải thông tin hồ sơ")
        } finally {
            setLoading(false)
        }
    }

    const handleEditToggle = () => {
        console.log("handleEditToggle: ", profile)
        if (isEditing) {
            // Cancel editing
            setIsEditing(false)
        } else {
            // Start editing
            setIsEditing(true)
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            setSubmitting(true)
            console.log('values: ', values)
            // Convert form values to the expected format
            const updatedProfile: EditableProfile = {
                ...values,
                avatarUrl: fileUrl,
                dateOfBirth: values.dateOfBirth ? values.dateOfBirth.format("YYYY-MM-DDTHH:mm:ss.SSSZ") : "",
            }
            const success = await CustomerEditProfile(user?.userId + '', updatedProfile)
            if (success) {
                message.success("Cập nhật hồ sơ thành công")
                setIsEditing(false)
                // Refresh profile data
                console.log("success: ", success)
                fetchUserProfile()
            } else {
                message.error("Cập nhật hồ sơ thất bại")
            }
        } catch (error) {
            console.error("Lỗi xác thực biểu mẫu:", error)
        } finally {
            setSubmitting(false)
        }
    }

    const getGenderText = (gender: string | number) => {
        if (gender === 0 || gender === "Male") return "Nam"
        if (gender === 1 || gender === "Female") return "Nữ"
        return "Khác"
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
            </div>
        )
    }

    const handleRemove = () => {
        setFileUrl(null); // Reset the file URL
    };

    // Handle upload for multiple images
    const handleUpload = async ({ file, onSuccess, onError }: any) => {
        try {
            message.loading({ content: "Uploading...", key: "upload" });
            const url = await uploadToCloudinary(file);
            if (url) {
                setFileUrl(url); // Set the single image URL
                message.success({ content: "Upload thành công!", key: "upload" });
                onSuccess("ok");
            } else {
                message.error({ content: "Upload thất bại!", key: "upload" });
                onError(new Error("Upload failed"));
            }
        } catch (error) {
            message.error("Đã xảy ra lỗi khi upload!");
            onError(error);
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className="container mx-auto py-8 px-4 ">
            <div className="justify-items-center">
                <Card
                    className="shadow-md w-[900px]"
                    title={
                        <div className="flex justify-between items-center">
                            <Title level={3} className="m-0">
                                Thông Tin Cá Nhân
                            </Title>
                            <Button
                                type="primary"
                                icon={isEditing ? <CloseOutlined /> : <EditOutlined />}
                                onClick={handleEditToggle}
                                danger={isEditing}
                            >
                                {isEditing ? "Hủy" : "Chỉnh Sửa"}
                            </Button>
                        </div>
                    }
                >
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            firstName: profile?.firstName,
                            lastName: profile?.lastName,
                            gender: profile?.gender === "Male" ? 0 : profile?.gender === "Female" ? 1 : 2,
                            dateOfBirth: profile?.dateOfBirth ? moment(profile.dateOfBirth) : null,
                            address: profile?.address,
                            avatarUrl: profile?.avatarUrl,
                            personalWebsiteUrl: profile?.personalWebsiteUrl,
                            portfolioUrl: profile?.portfolioUrl,
                            phoneNumber: profile?.phoneNumber,
                            role: typeof profile?.role === "string" ? (profile.role === "Admin" ? 0 : 1) : profile?.role,
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col items-center">
                                <div className="mb-4">
                                    {isEditing ? (
                                        <Form.Item valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                            <Upload
                                                listType="picture-card"
                                                customRequest={handleUpload}
                                                fileList={fileUrl ? [{ uid: fileUrl, url: fileUrl }] : []} // Show single image
                                                onPreview={(file) => window.open(file.url, "_blank")}
                                                showUploadList={{ showRemoveIcon: true }}
                                                multiple={false} // Only allow single upload
                                                onRemove={handleRemove}
                                            >
                                                {!fileUrl && ( // Show upload button only if no image is uploaded
                                                    <div className="flex flex-col items-center">
                                                        <PlusOutlined className="text-xl" />
                                                        <div style={{ marginTop: 8 }}>Thêm ảnh</div>
                                                    </div>
                                                )}
                                            </Upload>
                                        </Form.Item>
                                    ) : (
                                        <Avatar size={120} icon={<UserOutlined />} src={profile?.avatarUrl || undefined} />
                                    )}
                                </div>
                                <Text strong className="text-lg">
                                    {profile?.firstName} {profile?.lastName}
                                </Text>
                                <Text type="secondary">{profile?.email}</Text>
                                <Text className="mt-1 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                    {profile?.role}
                                </Text>
                            </div>

                            <div className="flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item
                                        label="Họ"
                                        name="firstName"
                                        rules={[{ required: true, message: "Vui lòng nhập họ của bạn" }]}
                                    >
                                        {isEditing ? <Input placeholder="Họ" /> : <div className="border-b pb-1">{profile?.firstName}</div>}
                                    </Form.Item>

                                    <Form.Item
                                        label="Tên"
                                        name="lastName"
                                        rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
                                    >
                                        {isEditing ? <Input placeholder="Tên" /> : <div className="border-b pb-1">{profile?.lastName}</div>}
                                    </Form.Item>

                                    <Form.Item
                                        label="Giới Tính"
                                        name="gender"
                                        rules={[{ required: true, message: "Vui lòng chọn giới tính của bạn" }]}
                                    >
                                        {isEditing ? (
                                            <Select placeholder="Chọn giới tính">
                                                <Option value={0}>Nam</Option>
                                                <Option value={1}>Nữ</Option>
                                                <Option value={2}>Khác</Option>
                                            </Select>
                                        ) : (
                                            <div className="border-b pb-1">{getGenderText(profile?.gender || "")}</div>
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Ngày Sinh"
                                        name="dateOfBirth"
                                        rules={[{ required: true, message: "Vui lòng chọn ngày sinh của bạn" }]}
                                    >
                                        {isEditing ? (
                                            <DatePicker className="w-full" format="YYYY-MM-DD" placeholder="Chọn ngày sinh" />
                                        ) : (
                                            <div className="border-b pb-1 flex items-center gap-2">
                                                <CalendarOutlined className="text-gray-400" />
                                                {profile?.dateOfBirth ? moment(profile.dateOfBirth).format("DD/MM/YYYY") : "Chưa cung cấp"}
                                            </div>
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Số Điện Thoại"
                                        name="phoneNumber"
                                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại của bạn" }]}
                                    >
                                        {isEditing ? (
                                            <Input placeholder="Số điện thoại" />
                                        ) : (
                                            <div className="border-b pb-1 flex items-center gap-2">
                                                <PhoneOutlined className="text-gray-400" />
                                                {profile?.phoneNumber || "Chưa cung cấp"}
                                            </div>
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Địa Chỉ"
                                        name="address"
                                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ của bạn" }]}
                                    >
                                        {isEditing ? (
                                            <Input placeholder="Địa chỉ" />
                                        ) : (
                                            <div className="border-b pb-1 flex items-center gap-2">
                                                <HomeOutlined className="text-gray-400" />
                                                {profile?.address || "Chưa cung cấp"}
                                            </div>
                                        )}
                                    </Form.Item>
                                </div>

                                <Divider orientation="left">Thông Tin Bổ Sung</Divider>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Form.Item label="Website Cá Nhân" name="personalWebsiteUrl">
                                        {isEditing ? (
                                            <Input placeholder="https://website-cua-ban.com" />
                                        ) : (
                                            <div className="border-b pb-1 flex items-center gap-2">
                                                <GlobalOutlined className="text-gray-400" />
                                                {profile?.personalWebsiteUrl || "Chưa cung cấp"}
                                            </div>
                                        )}
                                    </Form.Item>

                                    <Form.Item label="Đường Dẫn Portfolio" name="portfolioUrl">
                                        {isEditing ? (
                                            <Input placeholder="https://portfolio.com" />
                                        ) : (
                                            <div className="border-b pb-1 flex items-center gap-2">
                                                <GlobalOutlined className="text-gray-400" />
                                                {profile?.portfolioUrl || "Chưa cung cấp"}
                                            </div>
                                        )}
                                    </Form.Item>

                                    <Form.Item label="Vai Trò" name="role">
                                        <div className="border-b pb-1">{profile?.role === "Admin" ? "Quản Trị Viên" : "Người Dùng"}</div>
                                    </Form.Item>
                                </div>

                                {isEditing && (
                                    <div className="flex justify-end mt-6">
                                        <Button
                                            type="primary"
                                            icon={<SaveOutlined />}
                                            onClick={handleSubmit}
                                            loading={submitting}
                                            className="bg-purple-600 hover:bg-purple-700"
                                        >
                                            Lưu Thay Đổi
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Form>
                </Card>
            </div>
            <div className="text-3xl font-semibold pl-20 mt-10">
                Các gói đã mua:
            </div>
            <div >
                {
                  profile?.purchasedPackages.length > 0 ?  <Row gutter={10}>
                        <Col span={8}>
                            {
                                profile?.purchasedPackages?.filter((item) => item.proPackageId === '5500e9cf-13c1-48cf-117a-08dd79456e0e').length > 0 && <div className='justify-items-center'>
                                    <PremiumOptionCard
                                        userProfile={profile}
                                        packageId={'5500e9cf-13c1-48cf-117a-08dd79456e0e'}
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
                            }
                        </Col>
                        <Col span={8}>
                            {
                                profile?.purchasedPackages?.filter((item) => item.proPackageId === 'f5df7093-f19f-437c-6045-08dd79d8e6cd').length > 0 ? <div className='justify-items-center'>
                                    <PremiumOptionCard
                                        userProfile={profile}
                                        packageId={'f5df7093-f19f-437c-6045-08dd79d8e6cd'}
                                        price={40000}
                                        month={1}
                                        description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
                                        interest={[
                                            'Cho phép đổi màu BG của profile',
                                            'Tăng data upload',
                                            'Tăng đề xuất',
                                            'Có khung và huy hiệu PRE',
                                            'Tiết kiệm lên tới 20.000 vnd'
                                        ]}
                                    />
                                </div> : <div>

                                </div>
                            }
                        </Col>
                        <Col span={8}>
                            {
                                profile?.purchasedPackages?.filter((item) => item.proPackageId === '90c4f47e-b861-4912-6046-08dd79d8e6cd').length > 0 ? <div className='justify-items-center'>
                                    <PremiumOptionCard
                                        userProfile={profile}
                                        packageId={'90c4f47e-b861-4912-6046-08dd79d8e6cd'}
                                        price={70000}
                                        month={1}
                                        description='Lựa chọn linh hoạt, có thể hủy bất cứ lúc nào.'
                                        interest={[
                                            'Cho phép đổi màu BG của profile',
                                            'Tăng data upload',
                                            'Tăng đề xuất',
                                            'Có khung và huy hiệu PRE',
                                            'Tiết kiệm lên tới 50.000 vnd'
                                        ]}
                                    />
                                </div>
                                    :
                                    <div></div>
                            }
                        </Col>
                    </Row> : <div>Chưa mua bất kỳ gói nào</div>
                }
            </div>
        </div>
    )
}

export default ProfilePage
