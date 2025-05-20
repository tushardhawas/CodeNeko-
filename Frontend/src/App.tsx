import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes/routes'
import { TooltipProvider } from './components/ui/tooltip'

const router = createBrowserRouter(routes)

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  )
}

export default App
