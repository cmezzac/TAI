import React from 'react';


import '../../styles/transcript-audio.css';

import MicOnIcon from '../../assets/mic-svgrepo-com.svg?react';
import MicOffIcon from '../../assets/mic-off-svgrepo-com.svg?react';
import SettingsIcon from '../../assets/settings-2-svgrepo-com.svg?react';
import PauseIcon from '../../assets/pause-svgrepo-com.svg?react';
import PlayIcon from '../../assets/play-svgrepo-com.svg?react';
import StopIcon from '../../assets/stop-svgrepo-com.svg?react';


function TranscriptAudio() {

  



    return (
        <div className="audio-wrapper">
          <div className="button-wrapper">
            <button id="audio-settings"><SettingsIcon className="button-icon" id="settings-icon"/></button>
            <button id="pause/play"><PlayIcon className="button-icon" id="play-icon"/></button>
            <button id="end"><StopIcon className="button-icon" id="stop-icon"/></button>
          </div>
          <div className="transcripting">
            <button id="start-transcripting"></button>
            <div className="audio-animation"></div>
          </div>
        </div>
    );
}

export default TranscriptAudio;