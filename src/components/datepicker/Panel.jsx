import React, { useState } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { range } from 'ramda'
import dayjs from 'dayjs'

import Days from './Days'

const Container = styled.div`
    position: absolute;
    top: 39px;
    width: 350px;
    height: 400px;
    /* background-color: #00a6f3; */
    box-shadow: 0 10px 50px 0 rgba(0, 0, 0, 0.2);
`

function getDays(value) {
    if (value) {
        let date = dayjs(value)
        const days = date.daysInMonth()
        const start = date.startOf('month')
        const strartWeek = start.get('day')
        const end = date.endOf('month')
        const endWeek = end.get('day')
        const before = strartWeek === 0 ? 6 : strartWeek - 1
        const after = endWeek === 0 ? 0 : 7 - endWeek
        const beforeStart = start.subtract(before, 'day').date()
        const beforeArr = range(beforeStart, beforeStart + before).map(v => ({ type: 1, value: v }))
        const afterArr = range(1, 42 - days - before + 1).map(v => ({ type: 2, value: v }))
        const daysArr = range(1, days + 1).map(v => ({ type: 0, value: v }))
        return [...beforeArr, ...daysArr, ...afterArr]
    }
}

function Panel(props) {
    Panel.handleClickOutside = e => {
        props.closePanel(e.target)
    }
    return (
        <Container>
            <Days days={getDays(props.value)} date={dayjs(props.value)} clickDays={props.clickDays} />
        </Container>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Panel.handleClickOutside,
}

export default onClickOutside(Panel, clickOutsideConfig)
