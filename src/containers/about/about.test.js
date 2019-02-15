import React from 'react'
import { fireEvent, cleanup, waitForElement } from 'react-testing-library'
import render from '../../utils/render';

test('foo', () => {
    const buttonText = /foo/i;

    const { getByText, debug } = render(<button>Foo</button>);

    expect(getByText(buttonText)).toBeInTheDocument();
});