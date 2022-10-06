import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const Input_mode = () => {
    return (
        <div>
            <p></p>
            <h1>Input_Page</h1>
            <p>
                <button>
                    <Link to={'pre_input'}>事前入力</Link>
                </button>
                <button>
                    <Link to={'/'}>速報入力</Link>
                </button>
            </p>

            <button><Link to={"/home"}>戻る</Link> </button>
        </div>
    )
}

export default Input_mode;