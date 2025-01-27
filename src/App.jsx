// 導入全局樣式組件
import GlobalStyles from './styles/GlobalStyles'
// 導入貪吃蛇遊戲組件
import SnakeGame from './components/SnakeGame'
// 導入 styled-components 的 ThemeProvider 組件
import { ThemeProvider } from 'styled-components'
// 導入自定義的主題
import { pinkPurpleTheme, pinkPurpleDarkTheme } from './styles/theme'
// 導入 React 的 useState hook
import { useState } from 'react'

// 定義 App 組件
function App() {
  // 使用 useState 來管理深色模式狀態
  const [isDarkMode, setIsDarkMode] = useState(true)
  // 根據深色模式狀態選擇對應的主題
  const theme = isDarkMode ? pinkPurpleDarkTheme : pinkPurpleTheme

  // 渲染 App 組件
  return (
    // 使用 ThemeProvider 包裹整個應用，提供主題
    <ThemeProvider theme={theme}>
      {/* 應用全局樣式 */}
      <GlobalStyles />
      {/* 渲染 SnakeGame 組件，傳遞深色模式狀態和切換函數 */}
      <SnakeGame isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ThemeProvider>
  )
}

// 導出 App 組件
export default App
