import React from 'react';
import styled from 'styled-components';

// 定義遮罩層樣式
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    z-index: 10;
`;

// 定義標題樣式
const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.5s ease-in;

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// 定義分數顯示樣式
const Score = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.primary};
`;

// 定義按鈕樣式
const Button = styled.button`
    padding: 1rem 2rem;
    font-size: 1.2rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(1px);
    }
`;

// 定義提示文字樣式
const Hint = styled.p`
    font-size: 1.2rem;
    margin-top: 1rem;
    opacity: 0.8;
`;

// GameOverlay 組件
const GameOverlay = ({ isGameStarted, isGameOver, score, onStart, onRestart }) => {
    if (!isGameStarted) {
        return (
            <Overlay>
                <Title>貪吃蛇遊戲</Title>
                <Hint>使用方向鍵或 W/A/S/D 控制蛇的移動</Hint>
                <Hint>吃到食物可以增加分數和蛇的長度</Hint>
                <Hint>撞到自己會結束遊戲</Hint>
                <Button onClick={onStart}>開始遊戲</Button>
            </Overlay>
        );
    }

    if (isGameOver) {
        return (
            <Overlay>
                <Title>遊戲結束</Title>
                <Score>最終分數: {score}</Score>
                <Button onClick={onRestart}>再玩一次</Button>
            </Overlay>
        );
    }

    return null;
};

export default GameOverlay;
