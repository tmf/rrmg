import { createSelector } from 'reselect';

/**
 * Direct selector to the game state domain
 */
const selectGameState = () => (state) => state.get('game');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Game
 */

const selectRunning = () => createSelector(
  selectGameState(),
  (gameState) => gameState.get('running')
);

const selectEntities = () => createSelector(
  selectGameState(),
  (gameState) => gameState.get('entities')
);

export {
  selectRunning,
  selectEntities,
};
