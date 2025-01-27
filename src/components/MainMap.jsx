// 導入必要的 styled-components 函數和常數
import { css } from 'styled-components';
import styled from 'styled-components';
import { MAX_WIDTH, PAGE_PADDING, GRID_SIZE } from "./constants";

// 定義地圖大小的 CSS
const mapSize = css`
    // 計算地圖的寬度和高度
    // 使用 min 函數來選擇較小的值，確保地圖不會超出螢幕
    // calc(100vw - ${PAGE_PADDING*2}px) 計算螢幕寬度減去兩側內邊距
    // ${MAX_WIDTH-(PAGE_PADDING*2)}px 是預設的最大寬度，考慮內邊距
    width: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
    height: min(calc(100vw - ${PAGE_PADDING*2}px), ${MAX_WIDTH-(PAGE_PADDING*2)}px);
`;

// 定義地圖容器的樣式
const MapContainer = styled.div`
    ${mapSize} // 應用上面定義的 mapSize
    border: 2px solid ${({ theme }) => theme.colors.border}; // 設置邊框
    background-color: ${({ theme }) => theme.colors.background}; // 設置背景色
    position: relative; // 設置相對定位
    margin: ${({ theme }) => theme.spacing.medium} auto; // 設置外邊距，使其水平居中
    display: grid; // 使用網格布局
    grid-template-columns: repeat(${GRID_SIZE}, 1fr); // 設置列數為 GRID_SIZE，每列寬度相等
    grid-template-rows: repeat(${GRID_SIZE}, 1fr); // 設置行數為 GRID_SIZE，每行高度相等
`;

// 定義網格單元格的樣式
const GridCell = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.border}40; // 設置邊框，40 表示透明度
    width: 100%; // 寬度填滿父容器
    height: 100%; // 高度填滿父容器
`;

// 定義蛇頭的樣式
const SnakeHead = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
        transform: (() => {
            if (props.direction.x === 1) return 'rotate(0deg)';
            if (props.direction.x === -1) return 'rotate(180deg)';
            if (props.direction.y === 1) return 'rotate(90deg)';
            if (props.direction.y === -1) return 'rotate(-90deg)';
            return 'rotate(0deg)';
        })(),
        transition: props.$isCrossing ? 'none' : `all ${props.speed * 0.25}ms linear`
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    z-index: 1;
    animation: mouthMove 0.3s infinite linear;

    @keyframes mouthMove {
        0% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
        50% { clip-path: polygon(100% 35%, 50% 50%, 100% 65%, 0 100%, 0 0); }
        100% { clip-path: polygon(100% 0, 50% 50%, 100% 100%, 0 100%, 0 0); }
    }

    &:after {
        content: '';
        position: absolute;
        width: 20%;
        height: 20%;
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 50%;
        top: 20%;
        left: 20%;
    }
`;

// 定義蛇身體的樣式
const SnakeBody = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
        zIndex: 10 - props.$index,
        // 設定固定的較短動畫時間,最多30ms
        transition: props.$isCrossing ? 'none' : `all ${Math.min(30, props.speed * 0.15)}ms linear`,
        transform: props.$isCrossing ? 'none' : undefined
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme, $index }) => {
        const hue = 330;
        const saturation = 100;
        const lightness = Math.max(50, 70 - $index * 2);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }};
    border-radius: 40%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    &:after {
        content: '';
        position: absolute;
        width: 60%;
        height: 60%;
        background-color: ${({ theme, $index }) => {
            const hue = 330;
            const saturation = 100;
            const lightness = Math.max(60, 80 - $index * 2);
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }};
        border-radius: 40%;
        top: 20%;
        left: 20%;
        filter: brightness(1.1);
    }
`;

// 定義食物的樣式
const Food = styled.div.attrs(props => ({
    style: {
        left: `${(props.x * 100 / GRID_SIZE)}%`,
        top: `${(props.y * 100 / GRID_SIZE)}%`,
    }
}))`
    position: absolute;
    width: calc(100% / ${GRID_SIZE});
    height: calc(100% / ${GRID_SIZE});
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    transform: scale(0.8);
    animation: pulse 1s infinite;

    @keyframes pulse {
        0% { transform: scale(0.8); }
        50% { transform: scale(0.9); }
        100% { transform: scale(0.8); }
    }

    &:before {
        content: '';
        position: absolute;
        width: 30%;
        height: 30%;
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 50%;
        top: 15%;
        right: 15%;
        opacity: 0.7;
    }
`;

// 主地圖組件
const MainMap = ({ snake, food }) => {
    // 檢查是否是邊界穿越
    const isCrossingBoundary = (pos1, pos2) => {
        const dx = Math.abs(pos1.x - pos2.x);
        const dy = Math.abs(pos1.y - pos2.y);
        return dx > 1 || dy > 1;
    };

    return (
        <MapContainer>
            {/* 生成網格 */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
                <GridCell key={index} />
            ))}
            
            {/* 渲染蛇頭 */}
            <SnakeHead 
                x={snake.head.x} 
                y={snake.head.y} 
                direction={snake.direction} 
                speed={snake.speed}
                $isCrossing={snake.bodyList.length > 0 && isCrossingBoundary(snake.head, snake.bodyList[0])}
            />

            {/* 渲染蛇身 */}
            {snake.bodyList.map((body, index) => {
                // 使用前一個位置作為參考點
                const prevPos = index === 0 ? snake.head : snake.bodyList[index - 1];
                return (
                    <SnakeBody 
                        key={index} 
                        x={body.x} 
                        y={body.y} 
                        $index={index} 
                        speed={snake.speed}
                        $isCrossing={isCrossingBoundary(body, prevPos)}
                    />
                );
            })}

            {/* 渲染食物 */}
            {food && <Food x={food.x} y={food.y} />}
        </MapContainer>
    );
};

// 導出 MainMap 組件，使其可以在其他文件中引入使用
export default MainMap;
