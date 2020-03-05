import { all, fork, put, takeLatest } from 'redux-saga/effects';

import * as constants from './artistConstants';
import * as actions from './artistActions';
import * as services from './artistServices';

function* getArtist({ payload: { id } }) {
  try {
    const artist = yield services.getArtist(id);
    if (artist) yield put(actions.getArtistSuccess({ artist }));
  } catch (err) {
    yield put(actions.getArtistFailure({ error: err.message }));
  }
}

function* getArtistSaga() {
  yield takeLatest(constants.GET_ARTIST_START, getArtist);
}

// Get artist Tracks
function* getArtistTopTracks({ payload: { id } }) {
  try {
    const tracks = yield services.getArtistTracks(id);
    console.log(tracks);
    if (tracks) yield put(actions.getArtistTracksSuccess({ tracks }));
  } catch (err) {
    yield put(actions.getArtistTracksFailure({ error: err.message }));
  }
}

function* getArtistTopTracksSaga() {
  yield takeLatest(constants.GET_ARTIST_TRACKS_START, getArtistTopTracks);
}

// Get Artist Albums
function* getArtistAlbums({ payload: { id } }) {
  try {
    const albums = yield services.getArtistAlbums(id);
    if (albums) yield put(actions.getArtistAlbumsSuccess({ albums }));
  } catch (err) {
    yield put(actions.getArtistAlbumsFailure({ error: err.message }));
  }
}

function* getArtistAlbumsSaga() {
  yield takeLatest(constants.GET_ARTIST_ALBUMS_START, getArtistAlbums);
}

// Get Artist Related
function* getArtistRelated({ payload: { id } }) {
  try {
    const artists = yield services.getArtistsRelated(id);
    if (artists) yield put(actions.getArtistRelatedSuccess({ artists }));
  } catch (err) {
    yield put(actions.getArtistRelatedFailure({ error: err.message }));
  }
}

function* getArtistRelatedSaga() {
  yield takeLatest(constants.GET_ARTIST_RELATED_START, getArtistRelated);
}

export default function* artistSaga() {
  yield all([
    fork(getArtistSaga),
    fork(getArtistTopTracksSaga),
    fork(getArtistAlbumsSaga),
    fork(getArtistRelatedSaga)
  ]);
}
