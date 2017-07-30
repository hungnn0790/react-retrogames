import React, { Component } from 'react';
 // We import connect from react-redux
import { connect } from 'react-redux';
// bindActionCreators comes handy to wrap action creators in dispatch calls
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, GamesListManager } from '../components';
// we import the action-creators to be binde with bindActionCreators
import * as gamesActionCreators from '../actions/games';

// We do not export GamesContainer as it is 'almost' a dumb component
class GamesContainer extends Component {
  constructor (props) {
    super();
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
  }

  componentDidMount () {
    this.getGames();
  }

  toggleModal (index) {
    this.props.gamesActions.showSelectedGame(this.props.games[index]);
    $('#game-modal').modal();
  }

  getGames () {
    this.props.gamesActions.getGames();
  }

  deleteGame (id) {
    this.props.gamesActions.deleteGame(id);
  }

  setSearchBar (event) {
    this.props.gamesActions.setSearchBar(event.target.value.toLowerCase());
  }

  render () {
    const { games, selectedGame, searchBar } = this.props;
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
        />
      </div>
    );
  }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return { // We get all the games to list in the page
    games: state.getIn(['games', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['games', 'searchBar'], ''),
    selectedGame: state.getIn(['games', 'selectedGame'], Immutable.List()).toJS() 
  }
}
// We can dispatch actions to the reducer and sagas
function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch)
  };
}
// Finally we export the connected GamesContainer
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);