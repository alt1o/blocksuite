import { Direction } from './constants.js';
import { add, createKey, sub } from './geometry-utils.js';
import type { Grid } from './grid.js';
import type { PathFindingPointData, RouteEndpoint } from './types.js';

export function cloneDeep<T>(t: T): T {
  return JSON.parse(JSON.stringify(t));
}

export function extendBox(box: number[][], d: number) {
  const result = box.map(item => [...item]);

  result[0] = add(result[0], [-d, -d]);
  result[1] = add(result[1], [d, -d]);
  result[2] = add(result[2], [d, d]);
  result[3] = add(result[3], [-d, d]);

  return result;
}

export function inView(point: number[], box: number[][]) {
  return (
    point[0] >= box[0][0] &&
    point[0] <= box[1][0] &&
    point[1] >= box[0][1] &&
    point[1] <= box[2][1]
  );
}

export function uniquePoints(points: number[][]) {
  const map = new Map<string, true>();
  const result: number[][] = [];

  points.forEach(item => {
    const k = createKey(item);
    if (!map.has(k)) {
      result.push(item);
      map.set(k, true);
    }
  });

  return result;
}

export function getIntersectPoints(points: number[][]) {
  const results: number[][] = [];

  points.forEach((item, index) => {
    points.forEach((other, j) => {
      if (index !== j) {
        results.push([item[0], other[1]]);
        results.push([other[0], item[1]]);
      }
    });
  });

  return results;
}

export function checkDirectionIsValid(
  from: number[],
  to: number[],
  direction: Direction
) {
  const d = sub(to, from);

  let disabled = false;

  switch (direction) {
    case Direction.TOP:
      disabled = d[0] < 0;
      break;
    case Direction.LEFT:
      disabled = d[1] < 0;
      break;
    case Direction.RIGHT:
      disabled = d[1] > 0;

      break;
    default:
      disabled = d[0] > 0;
  }

  return !disabled;
}

const moveDeltaConfig = {
  [Direction.LEFT]: [0, -1],
  [Direction.RIGHT]: [0, 1],
  [Direction.TOP]: [-1, 0],
  [Direction.BOTTOM]: [1, 0],
};

const oppositeDirectionConfig = {
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.TOP]: Direction.BOTTOM,
  [Direction.BOTTOM]: Direction.TOP,
  [Direction.RIGHT]: Direction.LEFT,
};

function getOppositeDirection(dir: Direction) {
  return oppositeDirectionConfig[dir];
}

export function getMoveDelta(dir: Direction, first: boolean) {
  const dirs = Object.keys(moveDeltaConfig) as Direction[];

  if (first) {
    const current = dirs.filter(item => item !== getOppositeDirection(dir));

    current.sort(a => (a === dir ? -1 : 1));

    return current.map(item => moveDeltaConfig[item]);
  }

  dirs.sort((a, b) => (a === dir ? -1 : 1));

  return dirs.map(item => moveDeltaConfig[item]);
}

function isHorizontal(dir: Direction) {
  return dir === Direction.LEFT || dir === Direction.RIGHT;
}

export const isOppositeDirection = (dirs: Direction[]) => {
  const list = [
    [Direction.LEFT, Direction.RIGHT],
    [Direction.TOP, Direction.BOTTOM],
  ];

  const conditions = [[...dirs].reverse(), dirs];

  return list.some(item =>
    conditions.some(source => source[0] === item[0] && source[1] === item[1])
  );
};

export const checkCanFollowWaypoint = (
  start: PathFindingPointData,
  end: PathFindingPointData,
  waypoint: number[],
  grid: Grid,
  canThrough: (from: number[], to: number[]) => boolean
) => {
  if (!isOppositeDirection([start.direction, end.direction])) {
    return false;
  }

  const coord = grid.getGridPoint(waypoint);
  const startCoord = grid.getGridPoint(start.endpoint);
  const endCoord = grid.getGridPoint(end.endpoint);
  const xLimits = [startCoord[0], endCoord[0]];
  const yLimits = [startCoord[1], endCoord[1]];

  [xLimits, yLimits].forEach(item => {
    item.sort((a, b) => a - b);
  });

  const isH = isHorizontal(start.direction);
  const base = isH ? coord[1] : coord[0];
  const limits = isH ? yLimits : xLimits;

  const getCoord = (index: number) =>
    isH ? [coord[0], index] : [index, coord[1]];

  /**
   *  水平方向 检查水平方向都能通过 直到达到结束点开始点
   *  垂直方向 检查导航点垂直方向都能通过 直到达到结束点开始点
   */

  for (let i = base, j = base; i >= limits[0] && j <= limits[1]; i--, j++) {
    if (
      !canThrough(
        grid.getRealPoint(getCoord(i)),
        grid.getRealPoint(getCoord(i + 1))
      ) ||
      !canThrough(
        grid.getRealPoint(getCoord(j)),
        grid.getRealPoint(getCoord(j - 1))
      )
    ) {
      return false;
    }
  }

  return true;
};

function getPointConstraintsInfo(
  start: {
    origin: number[];
    direction: Direction;
  },
  end: {
    origin: number[];
    direction: Direction;
  }
): PathFindingPointData[] {
  return [start, end].map(item => ({
    ...item,
    endpoint: item.origin.slice(),
  }));
}

function checkIsContained(
  origin: number[],
  box: number[][] | undefined,
  axis: number[],
  otherBox: number[][] | undefined,
  otherAxis: number[],
  index: number
) {
  // 没边界比较时不需要考虑是否包含
  if (!otherBox) {
    return true;
  }

  // 这里不能用 <= >=
  if (box && otherBox) {
    return axis.some(
      j =>
        box[j][index] > otherBox[otherAxis[0]][index] &&
        box[j][index] < otherBox[otherAxis[1]][index]
    );
  }

  // 比存在

  return (
    origin[index] > otherBox[otherAxis[0]][index] &&
    origin[index] < otherBox[otherAxis[1]][index]
  );
}

type BoxConstraint = PathFindingPointData & {
  boundaryBox?: number[][];
  originBoundaryBox?: number[][];
  box?: number[][];
};

export function getBoxConstraints(
  start: RouteEndpoint,
  end: RouteEndpoint,
  minDist: number,
  isCovered: boolean
): BoxConstraint[] {
  if (!start.box && !end.box) {
    return getPointConstraintsInfo(start, end);
  }

  const list = [start, end].map(item => {
    const newItem: BoxConstraint = {
      ...cloneDeep(item),
      endpoint: cloneDeep(item.origin),
    };

    if (item.box) {
      newItem.boundaryBox = extendBox(item.box, minDist);
      newItem.originBoundaryBox = extendBox(item.box, minDist);
    }

    return newItem;
  }) as Array<
    PathFindingPointData & {
      boundaryBox: number[][];
      box: number[][];
      originBoundaryBox: number[][];
    }
  >;

  const deltaMap: Record<Direction, number> = {
    [Direction.TOP]: -1,
    [Direction.LEFT]: -1,
    [Direction.RIGHT]: 1,
    [Direction.BOTTOM]: 1,
  };

  const axisMap: Record<Direction, [number[], number[]]> = {
    // [from, compared]
    [Direction.TOP]: [
      [0, 1],
      [3, 2],
    ],
    [Direction.LEFT]: [
      [0, 3],
      [1, 2],
    ],
    [Direction.RIGHT]: [
      [1, 2],
      [0, 3],
    ],
    [Direction.BOTTOM]: [
      [3, 2],
      [0, 1],
    ],
  };

  // 内部相交直接按内部查找
  if (isCovered) {
    list.forEach(({ direction, endpoint, origin }) => {
      const currentD = deltaMap[direction];
      const index = isHorizontal(direction) ? 0 : 1;

      endpoint[index] = origin[index] + minDist * currentD;
    });

    return list;
  }

  const allDirs = Object.keys(deltaMap) as Direction[];

  list.forEach(
    (
      { box, direction, endpoint, origin, boundaryBox, originBoundaryBox },
      i
    ) => {
      allDirs.forEach(dir => {
        const axis = axisMap[dir];
        const other = list[(i + 1) % 2];
        const [currentAxis, otherAxis] = axis;
        const currentD = deltaMap[dir];
        const index = isHorizontal(dir) ? 0 : 1;
        const restIndex = index === 0 ? 1 : 0;

        const contained = checkIsContained(
          origin,
          originBoundaryBox,
          currentAxis,
          other.originBoundaryBox,
          otherAxis,
          restIndex
        );

        const base = box ? box[currentAxis[0]] : origin;

        const dist = other.box
          ? other.box[otherAxis[0]][index] - base[index]
          : other.origin[index] - base[index];
        // If point directly connected to another box, no need to consider
        const d = dist > 0 ? 1 : -1;
        const pointDist = Math.abs(dist) / 2;

        const shouldAdjust = d === currentD && Math.abs(dist) < minDist * 2;
        // Padding only needs to be adjusted if the direction is the current direction and another box exists
        const needContained = contained;

        /**
         * Direction relative
         * For example, [ ] - [ ]
         *          current => other
         * [ ] current
         *  |
         * [ ] other
         */
        if (needContained && shouldAdjust) {
          if (box && boundaryBox) {
            currentAxis.forEach(a => {
              boundaryBox[a][index] = box[a][index] + currentD * pointDist;
            });
          }

          if (other.box) {
            otherAxis.forEach(a => {
              // Distance increases oppositely for the compared box
              // FIXME: null check
              other.boundaryBox[a][index] =
                other.box[a][index] + currentD * pointDist * -1;
            });
          }

          if (dir === direction) {
            endpoint[index] = origin[index] + currentD * pointDist;
          }
        } else if (dir === direction) {
          endpoint[index] = origin[index] + minDist * currentD;
        }
      });
    }
  );

  return list;
}
