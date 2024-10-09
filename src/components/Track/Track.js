import React, { useState } from "react";

 const tracks = [{
    name: 'Llama',
    artist: 'Phish'
    album: 'A Picture of Nectar',
    id: 1,
 }, {
    name: 'Eliza',
    artist: 'Phish'
    album: 'A Picture of Nectar',
    id: 2,
 }, {
    name: 'Cavern',
    artist: 'Phish'
    album: 'A Picture of Nectar',
    id: 3,
 }, {
    name: 'Poor Heart',
    artist: 'Phish'
    album: 'A Picture of Nectar',
    id: 5,
 }, {
    name: 'Stash',
    artist: 'Phish'
    album: 'A Picture of Nectar',
    id: 6,
 }, 
 ];

const Track = (props) => {

    return (
        <div>
            <h2>{tracks.name}</h2>
            <div>
                    <p>{tracks.artist}</p>
                    <p>{tracks.album}</p>
            </div>
        </div>
    );
};

export default Track;


