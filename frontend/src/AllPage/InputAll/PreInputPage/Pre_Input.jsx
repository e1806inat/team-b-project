import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const Pre_Input = () => {
    return (
        <div>
            <h1>Pre_Input</h1>
            <p>
                <button>
                    <Link to={'input_tournament'}>大会情報入力</Link>
                </button>
                <button>
                    <Link to={'InputSchool'}>学校情報入力入力</Link>
                </button>
                <button>
                    <Link to={'InputMember'}>メンバー情報入力</Link>
                </button>
            </p>
            <button><Link to={'/home/input_mode/'}>戻る</Link> </button>
        </div>
    )
}

export default Pre_Input;