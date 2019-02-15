import React from 'react'
import { fireEvent, cleanup, waitForElement } from 'react-testing-library'
import render from '../../utils/render';
import App from '../app/index';

test('it is in the home component and  clicking on the link goes to the about page', () => {
    const headerText = /about/i;
    const pageHeader = /thank you/i

    const { getByText, debug } = render(<App/>);

    const leftClick = { button: 0}
    const aboutHeader = getByText(headerText);

    fireEvent.click(aboutHeader, leftClick);
    expect(getByText(pageHeader)).toBeInTheDocument();    

});
