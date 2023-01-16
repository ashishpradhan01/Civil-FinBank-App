import React from 'react'

const style = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

export default function FlexBetween(props) {
    return (
        <div style={{ ...style, ...props.style }}> {props.children} </div >
    )
}
