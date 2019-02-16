import React from 'react'
import render from '../../../utils/render';
import DesktopHome from '../desktopHome';
import App from '../../app'
import axiosMock from 'axios';
import { fireEvent, waitForElement } from 'react-testing-library';

const movie = { 
    Title: "Iron Man",
    Year: 2009,
    imdbID: "1",
    Type: "movie",
    Poster: "mockImage"
}

describe('<DesktopHome />', () => {
    afterEach(() => {
        axiosMock.get.mockReset();
    });  
    it('it is in the home component  and makes an API call to render personal sugestions', async () => {
        axiosMock.get.
        mockResolvedValueOnce({
            data: { Search: [movie]}
        })

        const { debug, queryByText, getByTestId } = render(<DesktopHome />);

        await waitForElement(() => queryByText(movie.Title));
    
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });

    it('it is in the home component has a search bar component', async () => {

        const { debug, queryByText, getByTestId } = render(<App />);

        const searchBar = getByTestId("desktop-searchbar");

        fireEvent.click(searchBar, { button: 0 });

        fireEvent.change(searchBar, { target: { value: 'Iron'}});

        expect(searchBar.value).toBe('Iron');

        expect(searchBar).toBeInTheDocument();
    });
})
