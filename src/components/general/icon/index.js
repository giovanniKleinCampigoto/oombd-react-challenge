import React from 'react';

const Icon = ({className, icon, onClick }) => (
    <i className={`${className} icon-${icon}`} onClick={onClick}/>
)

export default Icon;