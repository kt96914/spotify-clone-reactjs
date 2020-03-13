import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistSongsStart } from './searchActions';
import LibraryItem from '../../components/LibraryItem/LibraryItem';
import { LibraryItemsContainer } from '../../components/LibraryItem/playlistItemStyles';
import Loader from '../../components/Loader/Loader';
import useNotifier from '../../hooks/useNotifier';

const Artist = () => {
  const dispatch = useDispatch();
  const { artist, loading, error } = useSelector(({ search }) => search);

  const { showSnackbar } = useNotifier({
    message: 'Oooops something went wrong.'
  });

  const { name } = useParams();
  const { state } = useLocation();

  React.useEffect(() => {
    dispatch(getArtistSongsStart({ id: state.id }));
  }, [dispatch, state.id]);

  if (loading) return <Loader isLoading={loading} />;
  if (!loading && error) showSnackbar();

  return (
    <div style={{ color: '#fff' }}>
      <h1>Showing Songs for "{name}"</h1>
      <LibraryItemsContainer>
        {artist.map(track => (
          <LibraryItem
            key={track.id}
            id={track.id}
            title={track.name}
            subtitle={track.artists[0].name}
            cover={track.album.images[0].url}
          />
        ))}
      </LibraryItemsContainer>
    </div>
  );
};

export default Artist;
