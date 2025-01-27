import { createGlobalStyle } from 'styled-components'

// 創建全局樣式組件
const GlobalStyles = createGlobalStyle`
  body {
    // 移除默認的邊距
    margin: 0;
    // 移除默認的內邊距
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  }

  // 按鈕樣式
  button {
    // 移除邊框
    border: none;
    // 添加圓角
    border-radius: 4px;
    // 添加指針樣式
    cursor: pointer;
    // 添加過渡效果
    transition: all 0.3s ease;
  }
`

// 導出 GlobalStyles 組件以便在其他地方使用
export default GlobalStyles
