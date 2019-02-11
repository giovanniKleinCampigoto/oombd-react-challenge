import React from 'react';
import styled from 'styled-components';

import Grid from '../../components/layout/grid';

const Wrapper = styled.section`

`

const PageHeader = styled.h1`
    font-size: 2em;
    color: white;
    font-weight: bold;
`
const NotFound = () => (
    <Grid>
        <PageHeader>404! Page not found!</PageHeader>
    </Grid>
)

export default NotFound;