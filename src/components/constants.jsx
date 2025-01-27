//地圖為30x30格子
export const GRID_SIZE = 30; 

// 定義蛇的初始速度（毫秒）
export const SNAKE_INITIAL_SPEED = 100;

export const PAGE_PADDING = 8;
export const MAX_WIDTH = 650;

// 定義方向鍵常量
export const ARROW_UP = "ARROW_UP";
export const ARROW_DOWN = "ARROW_DOWN";
export const ARROW_LEFT = "ARROW_LEFT";
export const ARROW_RIGHT = "ARROW_RIGHT";

// 定義WASD按鍵常量
export const KEY_W = "KEY_W";
export const KEY_S = "KEY_S";
export const KEY_A = "KEY_A";
export const KEY_D = "KEY_D";

// 定義方向對應的坐標變化
export const direction = {
    [ARROW_UP]: { x: 0, y: -1 },    // 向上移動：y減少
    [ARROW_DOWN]: { x: 0, y: 1 },   // 向下移動：y增加
    [ARROW_LEFT]: { x: -1, y: 0 },  // 向左移動：x減少
    [ARROW_RIGHT]: { x: 1, y: 0 },  // 向右移動：x增加
    [KEY_W]: { x: 0, y: -1 },       // W：向上移動
    [KEY_S]: { x: 0, y: 1 },        // S：向下移動
    [KEY_A]: { x: -1, y: 0 },       // A：向左移動
    [KEY_D]: { x: 1, y: 0 }         // D：向右移動
};

// 定義蛇的初始狀態
export const INITIAL_SNAKE = {
    head: { x: 2, y: 0 },
    bodyList: [
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ],
    maxLength: 3,
    direction: direction[ARROW_RIGHT],
    speed: SNAKE_INITIAL_SPEED,
};