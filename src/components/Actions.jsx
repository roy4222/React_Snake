// 引入 React 和 useEffect hook
import React, { useEffect } from 'react';
// 引入 styled-components 用於樣式化組件
import styled from 'styled-components';
// 從常量文件中引入遊戲所需的常量
import { 
    direction,     // 方向對象，包含各個方向的坐標變化
    ARROW_UP,      // 向上箭頭鍵常量
    ARROW_DOWN,    // 向下箭頭鍵常量
    ARROW_LEFT,    // 向左箭頭鍵常量
    ARROW_RIGHT,   // 向右箭頭鍵常量
    KEY_W,         // W 鍵常量，用於向上移動
    KEY_S,         // S 鍵常量，用於向下移動
    KEY_A,         // A 鍵常量，用於向左移動
    KEY_D,         // D 鍵常量，用於向右移動
    INITIAL_SNAKE  // 蛇的初始狀態
} from './constants';

// 定義控制區域樣式
const ControlArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: ${({ theme }) => theme.spacing.medium};
`;

// 定義方向鍵容器樣式
const DirectionPad = styled.div`
    display: grid;
    grid-template-areas:
        ". up ."
        "left . right"
        ". down .";
    gap: 8px;
    margin: ${({ theme }) => theme.spacing.medium} 0;
`;

// 定義方向鍵按鈕樣式
const DirectionButton = styled.button`
    // 設置按鈕的基本尺寸
    width: 60px;
    height: 60px;
    padding: 0;

    // 使用主題顏色設置背景和文字顏色
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background};

    // 移除邊框，添加圓角
    border: none;
    border-radius: 8px;

    // 設置鼠標樣式為指針
    cursor: pointer;

    // 設置文字大小
    font-size: 24px;

    // 使用 flex 布局居中內容
    display: flex;
    align-items: center;
    justify-content: center;

    // 添加過渡效果
    transition: all 0.3s ease;

    // 添加陰影效果
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    // 設置相對定位，用於偽元素
    position: relative;
    overflow: hidden;

    // 懸停效果
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    // 點擊效果
    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    // 添加漸變效果的偽元素
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            rgba(255, 255, 255, 0.1),
            rgba(255, 255, 255, 0.05)
        );
        pointer-events: none;
    }

    // 為每個方向按鈕設置特定樣式
    &[data-direction="up"] {
        grid-area: up;
        &:before { content: '↑'; }
    }

    &[data-direction="down"] {
        grid-area: down;
        &:before { content: '↓'; }
    }

    &[data-direction="left"] {
        grid-area: left;
        &:before { content: '←'; }
    }

    &[data-direction="right"] {
        grid-area: right;
        &:before { content: '→'; }
    }
`;

// Actions 組件：處理遊戲控制和用戶輸入
const Actions = ({
    currentDirection,       // 當前蛇的移動方向
    setCurrentDirection,    // 設置蛇的移動方向的函數
    setSnake,               // 設置蛇的狀態的函數
    isGameStarted,          // 遊戲是否已開始的標誌
    setIsGameStarted,       // 設置遊戲開始狀態的函數
    isPaused,               // 遊戲是否暫停的標誌
    setIsPaused,            // 設置遊戲暫停狀態的函數
    setScore,               // 設置遊戲分數的函數
    isDarkMode,             // 是否為深色模式的標誌
    isGameOver,            // 遊戲是否結束的標誌
    setIsGameOver,         // 設置遊戲結束狀態的函數
    resetGame             // 重置遊戲的函數
}) => {
    // 處理方向改變的函數
    const handleDirectionChange = (newDirection) => {
        // 防止反向移動（蛇不能立即掉頭）
        // 檢查新方向是否與當前方向相反
        if (
            (currentDirection.x === -newDirection.x && currentDirection.y === -newDirection.y) ||
            (currentDirection.y === -newDirection.y && currentDirection.x === -newDirection.x)
        ) {
            return; // 如果是反向移動，直接返回，不改變方向
        }
        
        // 更新方向狀態
        setCurrentDirection(newDirection);
        
        // 更新蛇的狀態，包括新的方向
        setSnake(prev => ({
            ...prev,
            direction: newDirection
        }));
        
        // 如果遊戲尚未開始，則開始遊戲
        if (!isGameStarted) {
            setIsGameStarted(true);
        }
    };

    // 使用 useEffect 鉤子來處理鍵盤事件
    useEffect(() => {
        // 定義處理鍵盤按下事件的函數
        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            
            // 如果遊戲暫停，只處理空白鍵
            if (key === ' ') {
                if (!isGameStarted) {
                    setIsGameStarted(true);
                    setIsPaused(false);
                } else {
                    setIsPaused(prev => !prev);
                }
                return;
            }

            // 如果遊戲暫停，不處理方向鍵
            if (isPaused) return;

            // 處理方向鍵
            switch (key) {
                case 'w':
                    handleDirectionChange(direction[KEY_W]);
                    break;
                case 's':
                    handleDirectionChange(direction[KEY_S]);
                    break;
                case 'a':
                    handleDirectionChange(direction[KEY_A]);
                    break;
                case 'd':
                    handleDirectionChange(direction[KEY_D]);
                    break;
                case 'arrowup':
                    handleDirectionChange(direction[ARROW_UP]);
                    break;
                case 'arrowdown':
                    handleDirectionChange(direction[ARROW_DOWN]);
                    break;
                case 'arrowleft':
                    handleDirectionChange(direction[ARROW_LEFT]);
                    break;
                case 'arrowright':
                    handleDirectionChange(direction[ARROW_RIGHT]);
                    break;
                default:
                    break;
            }
        };

        // 添加鍵盤事件監聽器
        window.addEventListener('keydown', handleKeyDown);

        // 清理函數：移除事件監聽器
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGameStarted, isPaused, currentDirection]);

    // 渲染遊戲控制界面
    return (
        <ControlArea>
            {/* 方向控制按鈕 */}
            <DirectionPad>
                <DirectionButton
                    data-direction="up"
                    onClick={() => !isPaused && !isGameOver && handleDirectionChange(direction[ARROW_UP])}
                />
                <DirectionButton
                    data-direction="left"
                    onClick={() => !isPaused && !isGameOver && handleDirectionChange(direction[ARROW_LEFT])}
                />
                <DirectionButton
                    data-direction="right"
                    onClick={() => !isPaused && !isGameOver && handleDirectionChange(direction[ARROW_RIGHT])}
                />
                <DirectionButton
                    data-direction="down"
                    onClick={() => !isPaused && !isGameOver && handleDirectionChange(direction[ARROW_DOWN])}
                />
            </DirectionPad>
        </ControlArea>
    );
};

// 導出 Actions 組件供其他部分使用
export default Actions;