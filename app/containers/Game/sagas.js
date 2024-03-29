/**
 * 
 */

import { take, put } from 'redux-saga/effects';
import { START } from 'containers/Game/constants';
import { tick } from 'containers/Game/actions';


const nextFrame = () => new Promise(resolve => requestAnimationFrame(resolve));

export function* gameLoop() {
  
  while (true) {
    let { engine } = yield take(START);
    let delta = 1000 / 30;
    
    while (true) {
      yield nextFrame();
      yield put(tick(engine, delta));
    }
  }
}


export default [
  gameLoop,
];