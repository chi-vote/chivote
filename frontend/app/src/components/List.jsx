import React from 'react'

const List = (props) => {
    return (
        <dl className={props.className}>
            {props.children}
        </dl>
    )
}

export default List