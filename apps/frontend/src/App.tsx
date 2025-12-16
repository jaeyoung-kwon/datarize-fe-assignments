import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from './pages/Index'
import { GlobalStyles } from './styles/GlobalStyles'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Index />
    </QueryClientProvider>
  )
}

export default App
