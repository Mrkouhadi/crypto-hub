import React from 'react'
import { Typography, Col, Row, Statistic } from 'antd'
import millify from 'millify'
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies, News} from '../components'
import LoadingSpinner from './LoadingSpinner';

const {Title} = Typography;

const Homepage = () => {
    const {data, isFetching} = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;

    if(isFetching) return <LoadingSpinner/>;
    return (
        <>
            <Title level={2} className="heading">
                Global CryptoCurrencies Statistics
            </Title>
            <Row>
                <Col span={12}><Statistic title="Total crypto currencies" value={globalStats.total}/></Col>
                <Col span={12}><Statistic title="Total exchanges" value={millify(globalStats.totalExchanges)}/></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
            </Row>
            <div className="home-heading-container">
                <Title level={2} className="home-title">Top 10 CryptoCurrencies</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
            </div>
            <Cryptocurrencies simplified />
            <div className="home-heading-container">
                <Title level={2} className="home-title">Latest Crypto News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
            </div>
            <News simplified />
        </>
    )
}

export default Homepage
