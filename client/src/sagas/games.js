import {
    takeLatest
} from 'redux-saga';

import {
    put,
    select,
    call
} from 'redux-saga/effects';

import {
  GET_GAMES,
  DELETE_GAME,
  POST_GAME
} from '../constants/games';

import {
    getGamesSuccess,
    getGamesFailure ,
    deleteGameSuccess,
    deleteGameFailure,
    postGameSuccess,
    postGameFailure
} from '../actions/games';

const selectedGames = (state) => {
  return state.getIn(['games', 'list']).toJS();
}

const selectedPicture = (state) => {
  return state.getIn(['filestack', 'url'], '');
}

const fetchGames = () => {
  return fetch('http://localhost:8081/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json())
};

const deleteServerGame = (id) => {
  return fetch(`http://localhost:8081/games/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    method: 'DELETE',
  })
  .then(response => response.json());
}

const postServerGame = (game) => {
  return fetch('http://localhost:8081/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(game)
  })
  .then(response => response.json());
}

// yield call to fetchGames is in a try catch to control the flow even when the promise rejects
function* getGames () {
  try {
    const games = yield call(fetchGames);
    yield put(getGamesSuccess(games));
  } catch (err) {
    yield put(getGamesFailure());
  }
}

function* deleteGame (action) {
  const { id } = action;
  // We take the games from the state
  const games = yield select(selectedGames);
  try {
    yield call(deleteServerGame, id);
    // The new state will contain the games except for the deleted one.
    yield put(deleteGameSuccess(games.filter(game => game._id !== id)));
  } catch (e) {
    // In case of error 
    yield put(deleteGameFailure());
  }
}

const getGameForm = (state) => {
  return state.getIn(['form', 'game']).toJS();
}

function* postGame () {
  // Access the state to retrieve the new game information
  const picture = yield select(selectedPicture);
  const game = yield select(getGameForm);
  // Create the newGame object to be sent to the server
  const newGame = Object.assign({}, { picture }, game.values);
  try {
    // yield call postServerGame to post to the server
    yield call(postServerGame, newGame);
    yield put(postGameSuccess());
  } catch (e) {
    yield put(postGameFailure());
  }
}

// The watcher saga waits for dispatched GET_GAMES actions
function* watchGetGames () {
  yield takeLatest(GET_GAMES, getGames);
}

function* watchDeleteGame () {
    yield takeLatest(DELETE_GAME, deleteGame);
}

function* watchPostGame () {
  yield takeLatest(POST_GAME, postGame);
}

// Export the watcher to be run in parallel in sagas/index.js
export { 
    watchGetGames,
    watchDeleteGame,
    watchPostGame
};