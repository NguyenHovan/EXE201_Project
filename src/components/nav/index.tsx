import { Avatar, Col, Input, message, Row } from 'antd';
import type { GetProps, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDataFromLocalStorage } from '../../consts/variable';
import { Dropdown } from 'antd';
import {
  LogoutOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  UserOutlined,
  DollarOutlined,
  MoonOutlined,
  CommentOutlined,
} from "@ant-design/icons"
import { UserProfile } from '../../pages/customer/profile';
import { useEffect, useState } from 'react';
import { CustomerGetProfile } from '../../services/account.services';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const Navbar = () => {
  const navigate = useNavigate();
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  const isLogin = getUserDataFromLocalStorage();

  const user = getUserDataFromLocalStorage()
  const [profile, setProfile] = useState<UserProfile>()

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      if (user) {
        const userData = await CustomerGetProfile(user?.userId + "")
        if (userData) {
          console.log("userData: ", userData)
          setProfile(userData?.data)
        }
      }
    } catch (error) {
      console.error("Không thể tải thông tin hồ sơ:", error)
      message.error("Không thể tải thông tin hồ sơ")
    }
  }
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="py-2 px-1 border-b border-gray-700 mb-2">
          <div className="flex items-center gap-3 mt-3 mb-2">
            <div>
              {profile?.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "view-profile",
      label: (
        <Link to={'/customer/profile'}>
          <div className="flex items-center gap-3 py-2">
            <EyeOutlined />
            <span>Xem tất cả trang cá nhân</span>
          </div>
        </Link>
      ),
      onClick: () => {
        // Handle view profile action
      },
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center gap-3 py-2">
          <SettingOutlined />
          <Link to={"/customer/manage-services"} >
            Freelancer
          </Link>
        </div>
      ),
      onClick: () => {
        // Handle settings action
      },
    },
    {
      key: "help",
      label: (
        <div className="flex items-center gap-3 py-2">
          <QuestionCircleOutlined />
          <Link to={"/customer/manage-portfolios"} >
            Portfolio
          </Link>
        </div>
      ),
      onClick: () => {
        // Handle help action
      },
    },
    {
      key: "display",
      label: (
        <div className="flex items-center gap-3 py-2">
          <MoonOutlined />
          <Link to={"/customer/manage-artworks"} >
            Atwork
          </Link>
        </div>
      ),
      onClick: () => {
        // Handle display settings action
      },
    },
    {
      key: "feedback",
      label: (
        <div className="flex items-center gap-3 py-2">
          <CommentOutlined />
          <Link to={"/customer/manage-jobs"} >
            Job
          </Link>
        </div>
      ),
      onClick: () => {
        // Handle feedback action
      },
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-3 py-2">
          <LogoutOutlined />
          <span>Đăng xuất</span>
        </div>
      ),
      onClick: () => logout(),
    },
  ]

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/')
    window.location.reload()
  }

  const goToRegister = () => {
    navigate('/register')
    window.location.reload()
  }

  const goToLogin = () => {
    navigate('/login')
    window.location.reload()
  }

  return (
    <Row className='bg-purple-700 flex items-center text-white py-1'>
      <Col span={4}>
        <Link to="/">
          <img className='mx-10 py-2' width="75" src="data:image/jpeg;base64,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" alt="" />
        </Link>
      </Col>
      <Col span={8}>
        <Row>
          <Col span={6}>Explore</Col>
          <Col span={6}><a href="/job">Jobs</a></Col>
          <Col span={6}><a href="/customer/premium">Premium</a></Col>
          <Col span={6}><a href="/hire-freelancers">Hire Freelancers</a></Col>
        </Row>
      </Col>
      <Col span={8}>

      </Col>
      <Col span={4}>
        <Row>
          {
            !isLogin ? <>
              <Col span={12}>
                <div className='cursor-pointer' onClick={() => goToRegister()}>
                  Đăng Ký
                </div>
              </Col>
              <Col span={12}>
                <div className='cursor-pointer' onClick={() => goToLogin()}>
                  Đăng Nhập
                </div>
              </Col>
            </>
              :
              <>
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar size="large" icon={!profile?.avatarUrl && <UserOutlined />} src={profile?.avatarUrl} />
                  </a>
                </Dropdown>
              </>
          }
        </Row>
      </Col>
    </Row>
  )
};

export default Navbar;
