import React, { useState, useEffect } from 'react'
import {Button, Menu, Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom'
import {HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons'
import logo from '../images/logo.png'

const Navbar = () => {
    const [activeMenu, setActiveMenu ] =useState(true);
    const [screenSize, setScreenSize] = useState(true);

    useEffect(() => {
        const handleResize = () =>setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize)
        handleResize();
        return()=> window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        screenSize < 768 ? setActiveMenu(false) : setActiveMenu(true);
    }, [screenSize])
    return (
        <div className="nav-container">
            <div className="logo-container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <Button className="menu-control-container"
                    onClick={()=> setActiveMenu(!activeMenu)} >
                    <MenuOutlined/>
                </Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FundOutlined/>}>
                        <Link to="/cryptocurrencies">Cryptos</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<MoneyCollectOutlined/>}>
                        <Link to="/exchanges">Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<BulbOutlined/>}>
                        <Link to="/news">News</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    )
}
export default Navbar;
