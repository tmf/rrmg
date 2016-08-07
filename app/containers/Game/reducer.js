/*
 *
 * Game reducer
 *
 */

import { fromJS } from 'immutable';
import {
  START,
  TICK,
} from './constants';

import Matter from 'matter-js';

const initialState = fromJS({
  running: false,
  entities: []
});

function gameReducer(state = initialState, action) {
  switch (action.type) {
    case START:
      return state
        .set('running', true);

    case TICK: 
      let { engine, delta } = action;

      Matter.Engine.update(engine, delta);

      let bodies = Matter.Composite.allBodies(engine.world),
          entities = bodies.map((body) => {

            return {
              position: body.position
            };
          });

      return state
        .set('entities', entities);

    default:
      return state;
  }
}

export default gameReducer;
