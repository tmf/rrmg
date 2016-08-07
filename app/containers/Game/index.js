/*
 *
 * Game
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { 
  selectRunning,
  selectEntities,
} from './selectors';

import styles from './styles.css';

import Matter from 'matter-js';

import { 
  startGame 
} from './actions';

export class Game extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static childContextTypes = {
    engine: React.PropTypes.object
  }
  static propTypes = {
    startGame: React.PropTypes.func,
  }

  getChildContext() {
    return { engine: this.engine };
  }
  componentWillMount() {
    let { Engine, Bodies, World } = Matter;
    
    let boxA = Bodies.rectangle(400, 200, 80, 80);
    let boxB = Bodies.rectangle(450, 50, 80, 80);
    let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    this.engine = Engine.create();
    // add all of the bodies to the world
    World.add(this.engine.world, [boxA, boxB, ground]);
  }
  componentDidMount() {
    this.props.startGame(this.engine);
  }
  componentWillUnmount() {
    this.engine.clear();
  }

  render() {
    return (
      <div className={styles.game}>
        <svg width="800" height="800"
             viewBox="0 0 800 800">
         {this.props.entities.map((entity, index) => (
          <rect x={entity.position.x} y={entity.position.y} width="80" height="80" key={`entity-${index}`}/>
          ))}
        </svg>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  running: selectRunning(),
  entities: selectEntities(),
});

function mapDispatchToProps(dispatch) {
  return {
    startGame: (engine) => dispatch(startGame(engine)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
