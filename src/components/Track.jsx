import React from 'react';

import styles from './styles/Track.module.css';
import { secondary_container } from '../App.module.css';

function Track({ track }) {

    function openSpotify({target}) {
        window.open(`https://open.spotify.com/track/${target.id}`, '_blank');
    }

    return (
        <div className={`${secondary_container} ${styles.track}`}>
            <img
                src={track.album.images[1].url}
                alt={track.name}
                className={styles.track_image}
            />
            <div className={styles.track_info}>
                <p className={styles.track_name}>{track.name}</p>
                <p className={styles.album_name}>{track.album.name}</p>
                <p className={styles.artist_name}>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <div className={styles.buttons}>
                <img
                    src='/icons/play.svg'
                    className={styles.icon}
                    title='Play Preview'
                    alt='Play'
                />
                <img
                    src='/icons/add.svg'
                    className={styles.icon}
                    title='Add to playlist'
                    alt='Add'
                />
                <img
                    src='/icons/open_spotify.svg'
                    className={styles.icon}
                    onClick={openSpotify}
                    id={track.id}
                    title='Open in Spotify'
                    alt='Open in Spotify'
                />
            </div>
        </div>
    );
}

export { Track };