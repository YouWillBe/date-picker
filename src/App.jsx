import React from 'react'
import styled from 'styled-components'

import DatePicker from './components/datepicker'

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

function App() {
    return (
        <Container>
            <DatePicker />
        </Container>
    )
}

export default App
