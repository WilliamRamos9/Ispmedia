import React, { useState, useEffect } from 'react';
import './Home.css';
import cover from '../../src/assets/image3.jpg';
import cover1 from '../../src/assets/image.jpg';
import cover2 from '../../src/assets/image2.jpg';
import { MdPlayCircleFilled, MdPauseCircleFilled, MdSkipNext, MdSkipPrevious, MdShare } from 'react-icons/md';
import artist1 from '../../src/assets/artist1.jpg';
import artist2 from '../../src/assets/artist2.jpg';
import artist3 from '../../src/assets/artist3.jpg';
import profilePicture from '../../src/assets/artist4.webp';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import Sidebar from '../components/Sidebar.jsx'
import {  doc, getDoc,getFirestore, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { FIREBASE_DB } from '../firebase.ts';
import { useLocation } from 'react-router-dom';
import { async } from '@firebase/util';

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

function Home({route}) {


    const [isPlaying, setIsPlaying] = useState(false); // State for play/pause toggle
    const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
    const [currentSong, setCurrentSong] = useState(null); // State for current song
    const [currentTime, setCurrentTime] = useState(0); // State for current playback time
    const [isLiked, setIsLiked] = useState(false); // State for heart icon
    const [comments, setComments] = useState([]);
    const [duration, setDuration] = useState(0); // State for the duration of the current song
    const [currentRadioStation, setCurrentRadioStation] = useState(null); // State for current radio station
    const [radioStations, setRadioStations] = useState([]);
    const location = useLocation();
    const personId = location.state?.personId;
    const [personName, setPersonName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [videos, setVideos] = useState([]);
  const [musicas, setMusicas] = useState([]);

    const getAudioDuration = () => {
        if (currentSong) {
            const audioElement = document.getElementById('audio');
            if (audioElement) {
                return audioElement.duration;
            }
        }
        return 0;
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setIsPlaying(false);
    };

    const handleVideoClose = () => {
        setSelectedVideo(null);
        setIsPlaying(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const handleSongPlayPause = () => {

        try {

            if (isPlaying) {
                setIsPlaying(false);
            } else {
                setIsPlaying(true);

                if (document.getElementById('audio')) {

                    const audioElement = document.getElementById('audio');

                    audioElement.currentTime = currentTime;
                    audioElement.play();
                    audioElement.ondurationchange = () => setDuration(audioElement.duration);
                }
            }
            setCurrentRadioStation(null); // Reset the current radio station when a song is clicked

        } catch (error) {
            console.error('An error occurred:', error);
        }

    };

    const handleRadioClick = (station) => {
        try {
            if (currentRadioStation === station) {
                setIsPlaying(!isPlaying);
            } else {
                setCurrentRadioStation(station);
                setIsPlaying(true);
                setCurrentTime(0);
                const audioElement = document.getElementById('audio');
                if (audioElement) {
                    audioElement.src = station.audioUrl;
                    audioElement.load();
                }
            }
            setCurrentSong(null); // Reset the current song when a radio station is clicked
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleSongClick = (song) => {
        try {
            if (currentSong === song) {
                setIsPlaying(!isPlaying);
            } else {
                setCurrentSong(song);
                setIsPlaying(true);
                setCurrentTime(0);
                const audioElement = document.getElementById('audio');
                if (audioElement && !audioElement.src) {
                    audioElement.src = song.audioUrl;
                    audioElement.load();
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const commentInput = e.target.elements.comment;
        const newComment = commentInput.value;
        setComments([...comments, newComment]);
        commentInput.value = '';
    };


    useEffect(()=>{
        fetchVid();
    });
    const fetchVid=()=>{
        const videosList = collection(FIREBASE_DB, 'videos');
        const videosQuery = query(videosList,orderBy('createdAt', 'description'));

        onSnapshot(videosQuery,(snapshot)=>{
            const videosData = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data(),
            }));
            setVideos(videosData);
        });
    }
    
    useEffect(()=>{
        subscribeToRadioStations();
    })
    
    const subscribeToRadioStations = async() => {
        try{
        const radioStationsCollection = collection(FIREBASE_DB, 'radioStations');
        const radioStationsQuery = await getDoc(radioStationsCollection);
        const radiosData = radioStationsQuery.docs.map((doc)=>doc.data());
        setRadioStations(radiosData);
        }catch(error){
            console.log('Erro ao carregar as estações de rádio:',error);
        }
      };

    useEffect(()=>{
        fetchAud();
    });
    const fetchAud= async()=>{
            try{
                const musicList = collection(FIREBASE_DB, 'audios');
                const querySnapshot = await getDoc(musicList);
                const audiosData = querySnapshot.docs.map((doc)=>doc.data());
                setMusicas(audiosData);
            } catch(error){
                console.log('Erro ao Obter os áudios:', error);
            };
        }
    
    const artists = [
        {
            id: 1,
            name: 'Artist Name 1',
            picture: artist1,
        },
        {
            id: 2,
            name: 'Artist Name 2',
            picture: artist2,
        },
        {
            id: 3,
            name: 'Artist Name 3',
            picture: artist3,
        },
        {
            id: 4,
            name: 'Artist Name 4',
            picture: artist2,
        },
        {
            id: 5,
            name: 'Artist Name 5',
            picture: artist1,
        },
    ];

    useEffect(() => {
        if (!isPlaying) {
            const audioElement = document.getElementById('audio');
            if (audioElement) {
                audioElement.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (currentSong) {
            const audioElement = document.getElementById('audio');
            audioElement.src = currentSong.audioUrl;
            audioElement.currentTime = currentTime;
            audioElement.play();

            audioElement.onTimeUpdate = () => setCurrentTime(audioElement.currentTime);
        }
    }, [currentSong,currentTime]);

    useEffect(() => {
        const fetchPersonName = async () => {
          try {
            const docRef = doc(FIREBASE_DB, 'pessoa', personId);
            const docSnapshot = await getDoc(docRef);
    
            if (docSnapshot.exists()) {
              const data = docSnapshot.data();
              setPersonName(data.name);
              setProfileImageUrl(data.imageUrl);
            }
          } catch (error) {
            console.log('Error fetching person name:', error);
          }
        };
    
        fetchPersonName();
      }, [personId]);
    
    return (
        <div className="music-app">

            <Sidebar></Sidebar>

            <div className="main-content">
                <div className="top-bar">
                    <input className="search" type="search" placeholder="Search..." />

                    <p>Olá, {personName}</p>
                    <img src={profileImageUrl} className="profile-picture" alt="Owner's Photo" />
                </div>

                <h2>Videos</h2>
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

                <h2>Músicas</h2>
                <div className="chart-section">
                    {musicas.map((musica) => (
                        <div className="chart" key={musica.id} onClick={() => handleSongClick(musica)}>
                            <img src={musica.cover} alt="Music Cover" />
                            <p className="title">{musica.title}</p>
                            <p className="artist-name">{musica.artist}</p>
                        </div>
                    ))}
                </div>

                <h2>Artistas Recomendados</h2>
                <div className="artist-section">
                    {artists.map((artist) => (
                        <div className="artist" key={artist.id}>
                            <img src={artist.picture} alt="Artist Picture" />
                            <p className="artist-name-singular">{artist.name}</p>
                        </div>
                    ))}
                </div>

                <h2>Estações de Rádio</h2>
                <div className="radio-section">
                    {radioStations.map((station) => (
                        <div className={`radio ${currentRadioStation === station ? 'active' : ''}`} key={station.frequency} onClick={() => handleRadioClick(station)}>
                            <img src={station.thumbnailURL} alt="Radio Station Cover" />
                            <p className="station-title">{station.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="player-section">
                <div className="player-info">
                    {currentSong && (
                        <img src={currentSong.cover} className="song-cover" alt="Song Cover" />
                    )}
                </div>
                <div className="player-controls">
                    <MdSkipPrevious className="player-icon" />
                    {isPlaying ? (
                        <MdPauseCircleFilled className="player-icon" onClick={handleSongPlayPause} />
                    ) : (
                        <MdPlayCircleFilled className="player-icon" onClick={handleSongPlayPause} />
                    )}
                    <MdSkipNext className="player-icon" />
                </div>

                <div className="progress-bar" >
                    <div className="song-text">
                        <p className="song-artist">{currentSong?.artist}</p>
                        <p className="song-name">{currentSong?.title}</p>
                    </div>
                    <div className="song-duration">
                        <p className="song-name">{formatTime(currentTime)}</p>
                        <p className="song-name">{formatTime(getAudioDuration())}</p>
                    </div>
                </div>

                <div className="share-like-icons">

                    <MdShare className="icon-home" />
                    {isLiked ? (
                        <MdFavorite className="icon-home" onClick={handleLikeClick} />
                    ) : (
                        <MdFavoriteBorder className="icon-home" onClick={handleLikeClick} />
                    )}

                </div>

                {currentSong && (
                    <audio id="audio" onTimeUpdate={() => setCurrentTime(document.getElementById('audio').currentTime)}>
                        <source src={currentSong.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}

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

export default Home;