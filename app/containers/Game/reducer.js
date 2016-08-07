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
              id: body.id,
              position: { x: body.position.x.toFixed(1) , y: body.position.y.toFixed(1) },
              vertices: body.vertices.map(vertex => ({ x: vertex.x.toFixed(1) , y: vertex.y.toFixed(1) })),
            };
          });

      return state
        .set('entities', entities);

    default:
      return state;
  }
}

export default gameReducer;
