import React from 'react'
import logo from '../../logo.png'
import './Header.css'

export default function Header(props) {
    return (
        <header id='header'>
            <div id='header-logo-container'>
                <div id='header-logo-image-container'>
                    <img src={logo} alt='Hero Registry Logo' id='header-logo-image' />
                </div>
                <div id='header-logo-text-container'>
                    <span id='header-logo-text'>The Hero Registry</span>
                </div>
            </div>
        </header>
    )
}