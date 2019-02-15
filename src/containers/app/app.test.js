import React from 'react'
import render from '../../utils/render';
import App from '../app/index';


describe('<App />', () => {
    it('it is in the home component and goes to 404 page', () => {
        const { getByText } = render(<App/>, {
            route: '/aa'
        });
    
        const pageHeader = /404! page not found!/i
        expect(getByText(pageHeader)).toBeInTheDocument();    
    });
    
    it('it is in the home component and goes to full list page, but doesen\'t render nothing', () => {
        const { queryByTestId } = render(<App/>, {
            route: '/fullList'
        });
    
        expect(queryByTestId('movie-renderer')).not.toBeInTheDocument()
    });
    
    it('it is in the home component and goes to single media page, but doesen\'t render nothing', () => {
        const { queryByTestId } = render(<App/>, {
            route: '/singleMedia'
        });
    
        expect(queryByTestId('single-media')).not.toBeInTheDocument()
    });
})
