/* eslint-disable no-unused-vars */
import { Button, Layout } from 'antd';
import { Outlet, useNavigate } from "react-router-dom";
import './LayoutDefault.scss'
import { useSelector } from 'react-redux';
import { getCookie } from '../../helpers/cookie';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components';

const { Header, Footer, Content } = Layout
function LayoutDefault() {
    const navigate = useNavigate();
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer)
    const handleRegister = () => {
        navigate(`/register`)
    }
    const handleLogin = () => {
        navigate(`/login`)
    }
    const handleLogout = () => {
        navigate(`/logout`)
    }
    const handleMangager = () => {
        navigate(`/admin`)
    }
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className='header__logo'>IT Jobs</div>
                    <div className='header__account'>
                        {token ? (
                            <>
                                <Button className='header__item' onClick={handleMangager}><UserOutlined /> Quản lý</Button>
                                <Button className='header__item' onClick={handleLogout}><LogoutOutlined /> Đăng xuất</Button>
                            </>
                        ) : (
                            <>
                                <Button className='header__item' onClick={handleLogin}><LoginOutlined /> Đăng nhập</Button>
                                <Button type='primary' className='header__item' onClick={handleRegister}>Đăng ký</Button>
                            </>
                        )}
                    </div>
                </Header>
                <Content className='content'>
                    <Outlet />
                </Content>
                <Footer className='footer'>
                    Copyright 2023 by tran kiet
                </Footer>
            </Layout>
        </>
    )
}
export default LayoutDefault