import { BrowserRouter as Router } from 'react-router-dom'

import { Routings } from './router/routings'
import { ThemeProvider } from './providers/theme-provider'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Routings />
      </ThemeProvider>
    </Router>
  )
}

export default App
