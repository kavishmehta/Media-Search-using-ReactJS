const FLICKR_API_KEY = 'a46a979f39c49975dbdd23b378e6d3d5';
const SHUTTER_CLIENT_ID = 'c73b19173fc2effabb79';
const SHUTTER_CLIENT_SECRET = '6dbe14771ec1a73a3799893f71281b654d30a6cd';

const basicAuth = () => 'Basic '.concat(window.btoa(`${SHUTTER_CLIENT_ID}:${SHUTTER_CLIENT_SECRET}`));

const authParameters = {
    headers: {
        Authorization: basicAuth()
    }
};

export const shutterStockVideos = (searchQuery) => {
    const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/videos/search?query=${searchQuery}&page=1&per_page=10`;
    return fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.data.map(({ id, assets, description, preview_jpg}) => ({
                id,
                mediaUrl: assets.preview_mp4.url,
                description,
                thumbUrl: assets.preview_jpg.url
            }));
        });
};  //Shutter video Api

export const flickrImages = (searchQuery) => {
    const FLICKR_API_ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${searchQuery}&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=1&per_page=10`;
    return fetch(FLICKR_API_ENDPOINT)
        .then(response => {
            return response.json()
        })
        .then(json => {
            return json.photos.photo.map(({ farm, server, id, secret, title }) => ({
                id,
                title,
                mediaUrl: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            }));
        });
};  //Flickr Images Api

//export const shutterStockImages = (searchQuery) => {
//    const SHUTTERSTOCK_API_ENDPOINT = `https://api.shutterstock.com/v2/images/search?
//    query=${searchQuery}&page=1&per_page=10`;
//
//    return fetch(SHUTTERSTOCK_API_ENDPOINT, authParameters)
//    .then(response => {
//        return response.json();
//    })
//    .then(json => {
//        return json.data.map(({ id, assets, title, description, models }) => ({
//            id,
//            mediaUrl: assets.preview.url,
//            title,
//            description
//        }));
//    });
//};  //Shutter Image Api