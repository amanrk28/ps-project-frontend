import React from 'react'
import Product from '../Product/Product'
import { items } from './Item';
import './Home.scss'

function Home () {
    return (
        <div className="home">
            <div className="home__row">
                {items.map(element => {
                    return (
                        <Product 
                            image={element.img}
                            title={element.title}
                            price={element.price}
                        />
                    )
                })}
            </div>
            <div className="home__row">
                {items.map(element => {
                    return (
                        <Product 
                            image={element.img}
                            title={element.title}
                            price={element.price}
                        />
                    )
                })}
            </div>
            <div className="home__row">
                {items.map(element => {
                    return (
                        <Product 
                            image={element.img}
                            title={element.title}
                            price={element.price}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Home
