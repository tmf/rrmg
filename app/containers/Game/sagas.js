/**
 * 
 */

import { take, put, call, delay } from 'redux-saga/effects';
import { START } from 'containers/Game/constants';
import { tick } from 'containers/Game/actions';


const nextFrame = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export function* gameLoop() {
  
  while (true) {
    let { engine } = yield take(START);
    let delta = 1000 / 60;
    
    while (true) {
      yield nextFrame(delta);
      yield put(tick(engine, delta));
    }
  }
}


export default [
  gameLoop,
];