var utils = require('../lib/utils.js');
const DIRECTIONS = ['north', 'east', 'south', 'west'];
const MOVES = ['shoot', 'move'];

const randomMove = () => {
  return Math.random() > 0.33 ? 'move' : DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
};

var turnToKill = (originalPosition, positionArray) => {
  return DIRECTIONS.reduce((result, currentDirection) => {
    if (result) return result;
    return positionArray.reduce((resultPositions, currentEnemyPosition) => {
      if (resultPositions) return resultPositions;
      return utils.isVisible(originalPosition, currentEnemyPosition, currentDirection) ? currentDirection : null;
    }, null);
  }, null);
};

var getShortestDirection = (start, endArray) => {
  var reducedArray = endArray.reduce(
    (reduced, currentPosition) => {
      if (reduced[0] === -1 || utils.getDistance(start, currentPosition) < reduced[0]) {
        reduced[0] = utils.getDistance(start, currentPosition);
        reduced[1] = currentPosition;
      }

      return reduced;
    },
    [-1, 0]
  );

  return utils.fastGetDirection(start, reducedArray[1]);
};


const isVisible = (originalPosition = [], finalPosition = [], direction = []) => {
  switch (direction) {
    case DIRECTIONS[0]:
      return originalPosition[1] === finalPosition[1] && originalPosition[0] > finalPosition[0];
    case DIRECTIONS[1]:
      return originalPosition[0] === finalPosition[0] && originalPosition[1] < finalPosition[1];
    case DIRECTIONS[2]:
      return originalPosition[1] === finalPosition[1] && originalPosition[0] < finalPosition[0];
    case DIRECTIONS[3]:
      return originalPosition[0] === finalPosition[0] && originalPosition[1] > finalPosition[1];
    default:
      break;
  }
};

const canKill = (currentPlayerState = {}, enemiesStates = []) => {
  return enemiesStates.some(enemyObject => {
    return enemyObject.isAlive &&
      isVisible(currentPlayerState.position, enemyObject.position, currentPlayerState.direction);
  });
};

const canBKilled = (currentPlayerState = {}, enemiesStates = []) => {
  return enemiesStates.some(enemyObject =>{


    return isVisible(enemyObject.position, currentPlayerState.position,enemyObject.direction)
    ;
  });
};

const player = {
  info: {
    name: "Roboberto",
    style: 4,
  },
  ai: (playerState, enemiesStates, gameEnvironment) => {
    let directionToPlayer
    let directionToAmmo

    if (canBKilled(playerState, enemiesStates)) return "move";

    if (gameEnvironment.ammoPosition.length && playerState.ammo == 0) {
      directionToAmmo = utils.fastGetDirection(playerState.position, gameEnvironment.ammoPosition[0]);

      if (directionToAmmo !== playerState.direction)      return directionToAmmo;
      return 'move';
    }

    if (utils.canKill(playerState, enemiesStates) && playerState.ammo) return "shoot";

    if (canBKilled(playerState, enemiesStates)) return "move";

    if (playerState.ammo) {
      directionToPlayer = turnToKill(playerState.position, enemiesStates.map(el => el.position));
      if (directionToPlayer) {
        return directionToPlayer;
      }

      directionToPlayer = getShortestDirection(playerState.position, enemiesStates.map(el => el.position));
      if (directionToPlayer !== playerState.direction) return directionToPlayer;
      return "move";
    }
  },
};

module.exports = player;
