import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CalendarOutlined,
    DesktopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, MenuProps, message, Space } from 'antd';
import { Outlet } from 'react-router-dom';
import "./dashboard.css";

import { getUserDataFromLocalStorage } from '../../consts/variable';
import { PATH } from '../../consts';


const Dashboard: React.FC = () => {
    const [items, setItems] = useState<MenuItem[]>([]);
    const navigate = useNavigate(); // Hook to navigate programmatically
    type MenuItem = Required<MenuProps>['items'][number];

    const user =  getUserDataFromLocalStorage();
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
        } as MenuItem;
    }

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        const currentPath = window.location.pathname;
        if (currentPath.startsWith('/admin')) {
            setItems([
                getItem('Trang tổng quan', '/admin/', <DesktopOutlined />),
                getItem('Quản lý tài khoản', '/admin/manage-accounts', <UserOutlined />),
                getItem('Quản lý danh mục', '/admin/manage-categories', <UserOutlined />),
                getItem('Quản lý công việc', '/admin/manage-jobs', <UserOutlined />),
                getItem('Quản lý Portfolios', '/admin/manage-portfolios', <UserOutlined />),
                getItem('Quản lý tác phẩm nghệ thuật', '/admin/manage-artworks', <UserOutlined />),
                getItem('Quản lý dịch vụ Freelancer', '/admin/manage-services', <UserOutlined />),
            ]);
        }else if(currentPath.startsWith('/staff')) {
            setItems([
                getItem('Quản lý gói', '/staff/manage-packages', <UserOutlined />),
                getItem('Kiểm tra Ai', '/staff/check-ai-artworks', <UserOutlined />),
                getItem('Quản lý báo cáo', '/staff/manage-reports', <UserOutlined />),
            ]);
        }
    };

    const handleClick = (e: { key: React.Key }) => {
        navigate(e.key as string); // Navigate to the selected key
    };

    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user"); 
        navigate(PATH.HOME)
        window.location.reload()
        message.success("Đăng xuất thành công")
    }
    const menuItems = [
        {
            key: '1',
            label: (
                <div onClick={handleLogout} rel="noopener noreferrer" >
                   Đăng xuất
                </div>
            ),
        },
    ];

    const siderStyle: React.CSSProperties = {
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        insetInlineStart: 0,
        top: 0,
        bottom: 0,
        scrollbarWidth: 'thin',
        scrollbarColor: 'unset',
    };

    const { Header, Content, Footer, Sider } = Layout;

   
    return (
        <Layout hasSider>
            <Sider style={siderStyle}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    // className='w-96 pr-10'
                    defaultSelectedKeys={['4']}
                    items={items}
                    onClick={handleClick} // Add onClick handler
                />
            </Sider>
            <Layout style={{ marginInlineStart: 200 }}>
                <Header className="bg-white flex justify-between">
                    <div>
                        {/* <div className='h-5'>Tên: {user?.userEmail}</div> */}
                        {/* <div className='h-5'>Địa chỉ email: {user?.userEmail}</div> */}
                    </div>
                    <Dropdown
                        overlay={<Menu items={menuItems} />}
                        trigger={['click']}
                        className="dropdown-center " // Add custom class
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar size={32} icon={<UserOutlined />} />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content  style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©2025 Shoca
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
