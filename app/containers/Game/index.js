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
    let random = (offset, span) => (offset + Math.random() * span);
    
    let boxes = [
      ...Array.from(new Array(100), () => Bodies.rectangle(random(0, 1000), random(0, 1000), random(40, 60), random(40, 60), { friction: 10, frictionStatic: 10})),
      Bodies.rectangle(400, 800, 810, 60, { isStatic: true })
    ];

    this.engine = Engine.create();
    this.engine.enableSleeping = true;
    // add all of the bodies to the world
    World.add(this.engine.world, boxes);
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
        <svg width="100vw" height="100vh"
             viewBox="0 0 1000 1000">
         {this.props.entities.filter((entity) => (entity.position.x >= 0 && entity.position.y >= 0 && entity.position.x <= 1000 && entity.position.y <= 1000)).map((entity, index) => (
          <polygon points={entity.vertices.map(vertex => `${vertex.x},${vertex.y}`).join(' ')} key={`entity-${entity.id}`}/>
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
