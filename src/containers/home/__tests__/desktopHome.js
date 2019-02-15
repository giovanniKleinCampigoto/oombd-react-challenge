import React from 'react'
import render from '../../../utils/render';
import DesktopHome from '../desktopHome';
import axiosMock from 'axios';

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

        const searchInput = /search.../i

        const { getByTestId, queryByTestId, queryByText, getAllByPlaceholderText, debug } = render(<DesktopHome />);

        debug();

        
        // await waitForElement(() => queryByText(movie.Title));
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
    });
})
