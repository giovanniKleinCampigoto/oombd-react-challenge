import React from 'react';

const Icon = ({className, icon, onClick, dataTestid }) => (
    <i data-testid={!!dataTestid ? dataTestid : ""} className={`${className} icon-${icon}`} onClick={onClick}/>
)

export default Icon;