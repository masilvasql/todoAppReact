import React from 'react'

export default props =>(
    <header className='page-header'>
        <h2>{props.nome} <small>{props.small}</small></h2>
    </header>
)