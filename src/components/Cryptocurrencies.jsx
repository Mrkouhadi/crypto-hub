import React, {useState, useEffect} from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import LoadingSpinner from './LoadingSpinner';
const Cryptocurrencies = ({simplified}) => { // props from homepage
    const count = simplified ? 10 : 100;
    const {data:cryptosList, isFetching} = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
            const filteredData = cryptosList?.data?.coins.filter((coin)=>{
                return coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            })
            setCryptos(filteredData);
    }, [cryptosList, searchTerm])

    if(isFetching) return <LoadingSpinner/>;

    return (
        <>
        {
            !simplified && (
        <div className="search-crypto">
            <Input 
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder="search for Cryptocurrencies"/>
        </div>
            )
        }
            <Row gutter={[32, 32]} className="crypto-card-container">
            {  
             cryptos?.map(currency =>{
                    return (
                        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card title={`${currency.rank}. ${currency.name}`}
                                        extra={<img className="crypto-image" src={currency.iconUrl}/>}
                                        hoverable
                                        >
                                    <p>Price: {millify(currency.price)} </p>
                                    <p>Market Cap: {millify(currency.marketCap)} </p>
                                    <p>Daily change: {millify(currency.change)}% </p>
                                </Card>
                            </Link>
                        </Col>
                    )
                })
            }
            </Row>
        </>
    )
}

export default Cryptocurrencies
