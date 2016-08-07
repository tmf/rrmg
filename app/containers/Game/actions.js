/*
 *
 * Game actions
 *
 */

import {
  START,
  TICK,
} from './constants';

export function startGame(engine) {
  return {
    type: START,
    engine
  };
}

export function tick(engine, delta) {
  return {
    type: TICK,
    engine,
    delta
  };
}