import Button from './index';

import {render, fireEvent} from 'react-testing-library'

test('renders the button without crashing', () => {
    render(Button)
});