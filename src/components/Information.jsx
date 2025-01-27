import styled, { keyframes } from 'styled-components';
import { MAX_WIDTH, PAGE_PADDING, SNAKE_INITIAL_SPEED } from './constants';
import React from 'react';

// 分數變化時的動畫效果
const scoreChange = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

// 容器樣式
const InfoContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    padding: 10px;
    width: 100%;
    margin-left: 60px;  // 為主題切換按鈕留出空間
`;

// 分數顯示區塊樣式
const InfoItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.surface};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 100px;

    h3 {
        margin: 0;
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.8;
    }

    p {
        margin: 5px 0 0;
        font-size: 1.5rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

// Information 組件
const Information = ({ score, speed }) => {
    // 使用 useMemo 緩存計算結果,只有當 speed 改變時才重新計算
    const speedLevel = React.useMemo(() => {
        return Math.round((SNAKE_INITIAL_SPEED - speed) / 10) + 1;
    }, [speed]);
    
    return (
        <InfoContainer>
            <InfoItem>
                <h3>分數</h3>
                <p>{score}</p>
            </InfoItem>
            <InfoItem>
                <h3>速度</h3>
                <p>level {speedLevel}</p>
            </InfoItem>
        </InfoContainer>
    );
};

export default Information;