import React from 'react'
import { render } from 'react-dom'
import App from './App'

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
    }
    body {
        margin: 0;
    }
    a {
        text-decoration: none;
    }
`

render(
    <>
        <App />
        <GlobalStyle />
    </>,
    document.getElementById('root')
)
