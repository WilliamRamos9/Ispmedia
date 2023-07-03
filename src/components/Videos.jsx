import React, { useState } from 'react';
import '../screens/Home.css';
import cover from '../../src/assets/image3.jpg';
import { MdPlayCircleFilled} from 'react-icons/md';
import Sidebar from '../components/Sidebar.jsx'
import TopBar from '../components/TopBar.jsx'


function VideoPlayer({ video, onClose }) {
    return (
        <div className="video-player-container" onClick={onClose}>
            <div className="video-player">
                <video width="100%" height="100%" controls>
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
}

export default function Videos() {

    const [isPlaying, setIsPlaying] = useState(false); // State for play/pause toggle
    const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
    const [comments, setComments] = useState([]);
    

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
    };

    const handleVideoClose = () => {
        setSelectedVideo(null);
        setIsPlaying(true);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const commentInput = e.target.elements.comment;
        const newComment = commentInput.value;
        setComments([...comments, newComment]);
        commentInput.value = '';
    };

    const favoriteVideos = [
        {
            id: 1,
            thumbnail: cover,
            author: 'Video Author 1',
            title: 'Video Title 1',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 2,
            thumbnail: cover,
            author: 'Video Author 2',
            title: 'Video Title 2',
            videoUrl: require('../assets/exampleVideo.mp4'),
        },
    ];


    const videos = [
        {
            id: 1,
            thumbnail: cover,
            author: 'Video Author 1',
            title: 'Video Title 1',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 2,
            thumbnail: cover,
            author: 'Video Author 2',
            title: 'Video Title 2',
            videoUrl: require('../assets/exampleVideo.mp4'),
        },
        {
            id: 3,
            thumbnail: cover,
            author: 'Video Author 3',
            title: 'Video Title 3',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 4,
            thumbnail: cover,
            author: 'Video Author 4',
            title: 'Video Title 4',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 5,
            thumbnail: cover,
            author: 'Video Author 5',
            title: 'Video Title 5',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 6,
            thumbnail: cover,
            author: 'Video Author 6',
            title: 'Video Title 6',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        ,
        {
            id: 5,
            thumbnail: cover,
            author: 'Video Author 4',
            title: 'Video Title 4',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 6,
            thumbnail: cover,
            author: 'Video Author 5',
            title: 'Video Title 5',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
        {
            id: 7,
            thumbnail: cover,
            author: 'Video Author 6',
            title: 'Video Title 6',
            videoUrl: require('../../src/assets/exampleVideo.mp4'),
        },
    ];


    return (
        <div className="music-app">

            <Sidebar></Sidebar>

            <div className="main-content">

                <TopBar></TopBar>

                <h2>Vídeos favoritos</h2>
                <div className="playlist-section">
                    {favoriteVideos.map((video) => (
                        <div className="playlist" key={video.id} onClick={() => handleVideoClick(video)}>
                            <div className="video-thumbnail">
                                <img src={video.thumbnail} alt="Video Thumbnail" />
                                <MdPlayCircleFilled className="play-icon-preview" />
                            </div>
                            <div className="video-info">
                                <p className="title">{video.title}</p>
                                <p className="artist-name">{video.author}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>VÍdeos</h2>
                <div className="playlist-section">
                    {videos.map((video) => (
                        <div className="playlist" key={video.id} onClick={() => handleVideoClick(video)}>
                            <div className="video-thumbnail">
                                <img src={video.thumbnail} alt="Video Thumbnail" />
                                <MdPlayCircleFilled className="play-icon-preview" />
                            </div>
                            <div className="video-info">
                                <p className="title">{video.title}</p>
                                <p className="artist-name">{video.author}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {selectedVideo && (
                <>
                    <VideoPlayer video={selectedVideo} onClose={handleVideoClose} />
                    <div className="comment-section">
                        <h3>Comentários</h3>
                        <ul>
                            {comments.map((comment, index) => (
                                <li key={index}>{comment}</li>
                            ))}
                        </ul>
                        <form onSubmit={handleCommentSubmit}>
                            <input type="text" name="comment" placeholder="Comente..." />
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </>
            )}

        </div>
    );
}

