import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchMediaAction, selectImageAction, selectVideoAction } from '../actions/mediaActions';
import PhotosPage from '../components/PhotosPage';
import VideosPage from '../components/VideosPage';
import '../styles/style.css';

// MediaGalleryPage Component
class MediaGalleryPage extends Component {
    
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSelectImage = this.handleSelectImage.bind(this);
        this.handleSelectVideo = this.handleSelectVideo.bind(this);
    }   //constructor

    
    componentDidMount() {
        this.props.dispatch(searchMediaAction('rain'));
    }   //componentDidMount
    
    handleSelectImage(selectedImage) {
        this.props.dispatch(selectImageAction(selectedImage));
    }   //handleSelectImage

    handleSelectVideo(selectedVideo) {
        this.props.dispatch(selectVideoAction(selectedVideo));
    }   //handleSelectVideo

    handleSearch(event) {
        event.preventDefault();
        if (this.query !== null) {
            this.props.dispatch(searchMediaAction(this.query.value));
            this.query.value = '';
        }
    }   //handleSearch

    render() {
        const { images, selectedImage, videos, selectedVideo } = this.props;
        return (
            <div className="container-fluid">
                { images ? <div>
                    <form className="row search-form">
                        <div className="col-sm-3 col-sm-offset-4">
                            <input type="text" className="form-control" placeholder="Search Here" ref={ ref => (this.query = ref) } />
                        </div>
                        <div className="col-sm-1 btn-srch">
                            <input type="submit" className="btn btn-primary search-button" value="Search" onClick={ this.handleSearch } />
                        </div>
                    </form>
                    <div className="row">
                        <PhotosPage images={ images } selectedImage={ selectedImage } onHandleSelectImage={ this.handleSelectImage } />
                        <VideosPage videos={ videos } selectedVideo={ selectedVideo } onHandleSelectVideo={ this.handleSelectVideo } />
                    </div>
                </div> : 'loading ....' }
            </div>
        );
    }   //render
}   //MediaGalleryPage

MediaGalleryPage.propTypes = {
    images: PropTypes.array,
    selectedImage: PropTypes.object,
    videos: PropTypes.array,
    selectedVideo: PropTypes.object,
    dispatch: PropTypes.func.isRequired
};  //component's propTypes

const mapStateToProps = ({ images, videos }) => ({
    images: images[0],
    selectedImage: images.selectedImage,
    videos: videos[0],
    selectedVideo: videos.selectedVideo
}); //component's props

export default connect(mapStateToProps)(MediaGalleryPage);