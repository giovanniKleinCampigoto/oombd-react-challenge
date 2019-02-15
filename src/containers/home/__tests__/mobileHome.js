import React from 'react'
import render from '../../../utils/render';
import MobileHome from '../mobileHome';
import axiosMock from 'axios';

const movie = { 
    Title: "Iron Man",
    Year: 2009,
    imdbID: "1",
    Type: "movie",
    Poster: "mockImage"
}

describe('<MobileHome />', () => {
    afterEach(() => {
        axiosMock.get.mockReset();
    });  
    it('it is in the mobile home component and it has a search bar component', async () => {
        axiosMock.get.
        mockResolvedValueOnce({
            data: { Search: [movie]}
        })

        const searchInput = /search.../i

        const { getByTestId, queryByTestId, queryByText, getAllByPlaceholderText, debug } = render(<MobileHome />);

        // await waitForElement(() => queryByText(movie.Title));
        expect(queryByTestId("mobile-searchbar")).toBeInTheDocument();
        // expect(axiosMock.get).toHaveBeenCalledTimes(1)
    });
})
