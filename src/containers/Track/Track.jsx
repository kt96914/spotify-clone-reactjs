import React from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { pauseSong, resumeSong } from './trackActions';
// styles
import {
  TrackContainer,
  PlayIconWrapper,
  PlayIcon,
  PauseIcon,
  PlayerCenter,
  PlayerRight,
  PlayerCenterButtonsContainer,
  PlayerProgressContainer
} from './trackStyles';
import Volume from '../../components/TrackControls/Volume';
import Duration from '../../components/TrackControls/Duration';
import { useHistory } from 'react-router-dom';
import TrackLeft from '../../components/Track/TrackLeft/TrackLeft';

const Track = () => {
  const dispatch = useDispatch();
  const { song, isPlaying, list } = useSelector(({ track }) => track);
  const audioRef = React.useRef();

  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [volume, setVolume] = React.useState(
    localStorage.getItem('volume') ?? 1.0
  );

  const history = useHistory();

  React.useEffect(() => {
    const { current: audio } = audioRef;
    if (isPlaying) audio.play();
    else audio.pause();
  }, [isPlaying, song]);

  React.useEffect(() => {
    if (audioRef) audioRef.current.volume = volume;
  }, [audioRef, volume]);

  const handleAudio = () => {
    if (isPlaying) dispatch(pauseSong());
    else dispatch(resumeSong());
  };

  const handleChangeRoute = route => history.push(`/app/${route}`);

  return (
    <TrackContainer>
      <audio src={song.preview_url} ref={audioRef}></audio>

      <TrackLeft song={song} handleChangeRoute={handleChangeRoute} />

      <PlayerCenter>
        <PlayerCenterButtonsContainer>
          <PlayIconWrapper>
            {!isPlaying ? (
              <PlayIcon onClick={handleAudio} />
            ) : (
              <PauseIcon onClick={handleAudio} />
            )}
          </PlayIconWrapper>
        </PlayerCenterButtonsContainer>

        <PlayerProgressContainer>
          <Duration
            timeElapsed={timeElapsed}
            setTimeElapsed={setTimeElapsed}
            isPlaying={isPlaying}
            songId={song.id}
            songList={list}
          />
        </PlayerProgressContainer>
      </PlayerCenter>

      <PlayerRight>
        <Volume ref={audioRef} volume={volume} setVolume={setVolume} />
      </PlayerRight>
    </TrackContainer>
  );
};

export default Track;
