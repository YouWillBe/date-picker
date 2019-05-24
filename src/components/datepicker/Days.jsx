import React from 'react'
import styled from 'styled-components'

import dayjs from 'dayjs'

const Container = styled.div``
const Header = styled.div`
    height: 40px;
    /* background-color: #ccc; */
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
`
const LeftTagWrap = styled.div`
    width: 70px;
    display: flex;
    margin-left: 10px;
`
const RightTagWrap = styled.div`
    width: 70px;
    display: flex;
    margin-right: 10px;
`
const Tag = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    color: #777;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const TitleWrap = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-evenly;
`
const Title = styled.div`
    border-radius: 3px;
    padding: 5px 10px;
    cursor: pointer;
    color: #777;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const WeekWrap = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const Week = styled.div`
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #00a6f3;
    font-size: 14px;
    user-select: none;
`
const DayWrap = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`
const Day = styled.div`
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    background-color: ${props => (props.isCurrentDay ? '#00a6f3' : 'transparent')};
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`
const GrayDay = styled(Day)`
    color: #bbb;
`

function Days(props) {
    const handleClick = data => {
        if (data.type === 0) {
            props.clickDays(`${props.date.format('YYYY')}/${props.date.format('MM')}/${data.value}`)
        }
    }
    return (
        <>
            <Header>
                <LeftTagWrap>
                    <Tag>
                        <i className='fas fa-angle-double-left' />
                    </Tag>
                    <Tag>
                        <i className='fas fa-angle-left' />
                    </Tag>
                </LeftTagWrap>
                <TitleWrap>
                    <Title>{props.date.format('YYYY')}年</Title>
                    <Title>{props.date.format('MM')}月</Title>
                </TitleWrap>
                <RightTagWrap>
                    <Tag>
                        <i className='fas fa-angle-right' />
                    </Tag>
                    <Tag>
                        <i className='fas fa-angle-double-right' />
                    </Tag>
                </RightTagWrap>
            </Header>
            <Container>
                <WeekWrap>
                    {['一', '二', '三', '四', '五', '六', '日'].map((v, i) => (
                        <Week key={i}>{v}</Week>
                    ))}
                </WeekWrap>
                <DayWrap>
                    {props.days.map((v, i) => {
                        if (v.type === 0) {
                            return (
                                <Day key={i} isCurrentDay={v.value === dayjs().date()} onClick={() => handleClick(v)}>
                                    {v.value}
                                </Day>
                            )
                        } else {
                            return (
                                <GrayDay key={i} onClick={() => handleClick(v)}>
                                    {v.value}
                                </GrayDay>
                            )
                        }
                    })}
                </DayWrap>
            </Container>
        </>
    )
}

export default Days
