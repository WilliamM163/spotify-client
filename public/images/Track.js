import React from 'react';

import styles from '../styles/Track.module.css';

function Track({ track, setCurrentTrack }) {
    function openSpotify({target}) {
        window.open(`https://open.spotify.com/track/${target.id}`, '_blank');
    }
    function playPreview() {
        setCurrentTrack(track);
    }

    return (
        <div className={styles.track}>
            <img
                src={track.album.images[1].url}
                style={{
                    'width': 80,
                    'height': 80
                }}
            />
            <div className={styles['track-info']}>
                <p className={styles.track_name}>{track.name}</p>
                <p className={styles.album_name}>{track.album.name}</p>
                <p className={styles.artist_name}>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <div className={styles.buttons}>
                <img
                    src='./images/play.svg'
                    className={styles.icon}
                    onClick={playPreview}
                    title='Play Preview'
                />
                <img
                    src='./images/add.svg'
                    className={styles.icon}
                    title='Add to playlist'
                />
                <img
                    src='./images/open_spotify.svg'
                    className={styles.icon}
                    onClick={openSpotify}
                    id={track.id}
                    title='Open in Spotify'
                />
            </div>
        </div>
    );
}

export default Track;