import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes/routes'
import { TooltipProvider } from './components/ui/tooltip'
import { UserProvider } from './lib/user-provider'

const router = createBrowserRouter(routes)

function App() {
  return (
    <UserProvider>
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </UserProvider>
  )
}

export default App
