import React from 'react'
import render from '../../../utils/render';
import MobileHome from '../mobileHome';
import axiosMock from 'axios';
import { fireEvent, waitForElement, wait } from 'react-testing-library';

const movie1 = { 
    Title: "Iron Man",
    Year: 2009,
    imdbID: "1",
    Type: "movie",
    Poster: "mockImage"
}

const movie2 = { 
    Title: "Iron Man",
    Year: 2009,
    imdbID: "1",
    Type: "movie",
    Poster: "mockImage"
}

const ytMockInfo = {
    "kind": "youtube#searchListResponse",
    "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/s5MuAfvwX3mmByB6R50z6Z3NhYE\"",
    "nextPageToken": "CAEQAA",
    "regionCode": "BR",
    "pageInfo": {
     "totalResults": 1000000,
     "resultsPerPage": 1
    },
    "items": [
     {
      "kind": "youtube#searchResult",
      "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/wlQsPKVBmMRhPFZEN6uSEivu2z8\"",
      "id": {
       "kind": "youtube#video",
       "videoId": "8hYlB38asDY"
      },
      "snippet": {
       "publishedAt": "2009-12-07T23:43:44.000Z",
       "channelId": "UCfibc7vcRzjUhCle9rM9Y8g",
       "title": "Iron Man - Trailer [HD]",
       "description": "Paramount Pictures and Marvel Studios' big screen adaptation of Marvel's legendary Super Hero Iron Man will launch into theaters on May 2, 2008.",
       "thumbnails": {
        "default": {
         "url": "https://i.ytimg.com/vi/8hYlB38asDY/default.jpg",
         "width": 120,
         "height": 90
        },
        "medium": {
         "url": "https://i.ytimg.com/vi/8hYlB38asDY/mqdefault.jpg",
         "width": 320,
         "height": 180
        },
        "high": {
         "url": "https://i.ytimg.com/vi/8hYlB38asDY/hqdefault.jpg",
         "width": 480,
         "height": 360
        }
       },
       "channelTitle": "TheMovieChanneI",
       "liveBroadcastContent": "none"
      }
     }
    ]
}

const ytMockVideo = {
    "kind": "youtube#videoListResponse",
    "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/rlOYj05GdZ6KxOqwtoPxquNsuIo\"",
    "pageInfo": {
        "totalResults": 1,
        "resultsPerPage": 1
    },
    "items": [
        {
        "kind": "youtube#video",
        "etag": "\"XpPGQXPnxQJhLgs6enD_n8JR4Qk/dAmggqmL3WmsubJqXokPpIqpIZI\"",
        "id": "8hYlB38asDY",
        "player": {
        "embedHtml": "\u003ciframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/8hYlB38asDY\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen\u003e\u003c/iframe\u003e"
        }
        }
    ]
}
   

const single = {"Title":"Iron Man","Year":"2008","Rated":"PG-13","Released":"02 May 2008","Runtime":"126 min","Genre":"Action, Adventure, Sci-Fi","Director":"Jon Favreau","Writer":"Mark Fergus (screenplay), Hawk Ostby (screenplay), Art Marcum (screenplay), Matt Holloway (screenplay), Stan Lee (characters), Don Heck (characters), Larry Lieber (characters), Jack Kirby (characters)","Actors":"Robert Downey Jr., Terrence Howard, Jeff Bridges, Gwyneth Paltrow","Plot":"After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.","Language":"English, Persian, Urdu, Arabic, Hungarian","Country":"USA","Awards":"Nominated for 2 Oscars. Another 20 wins & 65 nominations.","Poster":"https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.9/10"},{"Source":"Rotten Tomatoes","Value":"93%"},{"Source":"Metacritic","Value":"79/100"}],"Metascore":"79","imdbRating":"7.9","imdbVotes":"830,386","imdbID":"tt0371746","Type":"movie","DVD":"30 Sep 2008","BoxOffice":"$318,298,180","Production":"Paramount Pictures","Website":"http://www.ironmanmovie.com/","Response":"True"}

describe('<MobileHome />', () => {
    afterEach(() => {
        axiosMock.get.mockReset();
    });  

    it('it is in the mobile home component and it has a search bar component, and when the input is searched, it returns movies', async () => {
        axiosMock.get.
            mockResolvedValueOnce({
                data: { Search: [movie1], totalResults: 1 }
            })

        const { debug, queryByText, getByTestId, queryByTestId } = render(<MobileHome />);

        const searchBar = getByTestId("mobile-searchbar");

        fireEvent.change(searchBar, { target: { value: 'Iron'}})

        expect(searchBar.value).toBe('Iron')

        await waitForElement(() => queryByText(movie1.Title));
        expect(queryByTestId("mobile-searchbar")).toBeInTheDocument();
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
    })

    it('it queries for a movie, clicks in the media, goes to the single media page', async () => {
        axiosMock.get
            .mockResolvedValueOnce({
                data: { Search: [movie2], totalResults: 1 }
            })
            .mockResolvedValueOnce({
                data: single
            })
            .mockResolvedValueOnce({
                data: ytMockInfo
            })
            .mockResolvedValueOnce({
                data: ytMockVideo
            })

        const route = "/singleMedia";

        const { debug, queryByText, getByTestId, queryByTestId } = render(<MobileHome />, { route });

        const searchBar = getByTestId("mobile-searchbar");
        fireEvent.change(searchBar, { target: { value: 'Iron'}});
        expect(searchBar.value).toBe('Iron');
        await waitForElement(() => queryByText(movie2.Title));        
        const movie = queryByTestId(/iron man/i);

        const leftClick = { button: 0}

        // fireEvent.click(movie, leftClick);

        // await wait(() =>
        //     expect(queryByTestId('loading-icon')).not.toBeInTheDocument()
        // );

        // debug()
        // expect(queryByTestId('mobile-home')).not.toBeInTheDocument();
        // expect(queryByTestId('single-media')).toBeInTheDocument();

        // await waitForElement(() => queryByText(single.Title));
        // debug()
        // expect(queryByTestId("single-media")).toBeInTheDocument();
        // // expect(queryByTestId("mobile-searchbar")).not.toBeInTheDocument();
        // expect(getByTestId("loading-icon")).toBeInTheDocument();        
        // expect(axiosMock.get).toHaveBeenCalledTimes(4);
    })

    it('it queries for a movie, and clicks on fullList page', async () => {
        axiosMock.get
            .mockResolvedValueOnce({
                data: { Search: [movie2], totalResults: 1 }
            })
        
        const route = "/fullList";
    
        const { debug, queryByText, getByTestId, queryByTestId } = render(<MobileHome />, { route });

        const searchBar = getByTestId("mobile-searchbar");
        fireEvent.change(searchBar, { target: { value: 'Iron'}});
        expect(searchBar.value).toBe('Iron');

        await waitForElement(() => queryByText(movie2.Title));       

        const link = queryByTestId("full-list-link");
        const leftClick = { button: 0 }
        fireEvent.click(link, leftClick);
        debug()
        
        // await waitForElement(() => queryByText(single.Title));

        // debug()
        // debug()
        // expect(queryByTestId("single-media")).toBeInTheDocument();

        // expect(queryByTestId("single-media")).toBeInTheDocument();
        // // expect(queryByTestId("mobile-searchbar")).not.toBeInTheDocument();
        // expect(getByTestId("loading-icon")).toBeInTheDocument();        
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    })
})
