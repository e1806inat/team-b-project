import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>

                <button>
                    <Link to={'input_mode'}>入力</Link>
                </button>
                <button>
                    <Link to={'input_mode'}>過去データ参照</Link>
                </button>
            </p>
        </div>
    )
}

export default Home;