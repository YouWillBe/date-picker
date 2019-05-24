import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Picker from './Picker'
import Panel from './Panel'

import { isLeapYearP } from '../../utils/isLeapYearP'

const Container = styled.div`
    position: relative;
    width: 174px;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 2px;
`
const reg = /^\d{4}(\/)(0[1-9]|1[0-2])\1(0[1-9]|[1-2][0-9]|3[0-1])$/

function DatePicker(props) {
    const [showPanel, setShowPanel] = useState(false)
    const [value, setValue] = useState('')
    const [previousValue, setPreviousValue] = useState(
        props.defaultValue ? props.defaultValue : dayjs().format('YYYY/MM/DD')
    )
    const handleClickPicker = () => {
        setShowPanel(true)
    }
    const closePanel = target => {
        if (target === pickerRef.current) {
            return
        }
        setShowPanel(false)
    }
    const handlePickerChange = e => {
        setValue(e.target.value)
        if (reg.test(e.target.value)) {
            const [year, month, day] = e.target.value.split('/')
            if (month === '02') {
                if (isLeapYearP(parseInt(year))) {
                    if (parseInt(day) > 29) {
                    } else {
                        setPreviousValue(e.target.value)
                    }
                } else {
                    if (parseInt(day) > 28) {
                    } else {
                        setPreviousValue(e.target.value)
                    }
                }
            } else if (['04', '06', '09', '11'].includes(month)) {
                if (parseInt(day) > 30) {
                } else {
                    setPreviousValue(e.target.value)
                }
            } else {
                setPreviousValue(e.target.value)
            }
        } else {
        }
    }
    const handleValue = () => {
        if (reg.test(value)) {
            const [year, month, day] = value.split('/')
            if (month === '02') {
                if (isLeapYearP(parseInt(year))) {
                    if (parseInt(day) > 29) {
                        setValue(previousValue)
                    } else {
                        setPreviousValue(value)
                    }
                } else {
                    if (parseInt(day) > 28) {
                        setValue(previousValue)
                    } else {
                        setPreviousValue(value)
                    }
                }
            } else if (['04', '06', '09', '11'].includes(month)) {
                if (parseInt(day) > 30) {
                    setValue(previousValue)
                } else {
                    setPreviousValue(value)
                }
            } else {
                setPreviousValue(value)
            }
        } else {
            setValue(previousValue)
        }
    }
    const handlePickerBlur = () => {
        handleValue()
    }
    const handlePickerKeyDown = e => {
        if (e.which === 13) {
            handleValue()
            pickerRef.current.blur()
            setShowPanel(false)
        }
    }
    const handleClickDays = value => {
        setValue(value)
        setPreviousValue(value)
    }
    const pickerRef = useRef(null)
    return (
        <Container>
            <Picker
                onClick={handleClickPicker}
                ref={pickerRef}
                value={value}
                onChange={handlePickerChange}
                placeholder='请选择日期'
                onBlur={handlePickerBlur}
                onKeyDown={handlePickerKeyDown}
            />
            {showPanel ? <Panel closePanel={closePanel} value={previousValue} clickDays={handleClickDays} /> : null}
        </Container>
    )
}

export default DatePicker
