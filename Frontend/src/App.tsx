import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes/routes'
import { TooltipProvider } from './components/ui/tooltip'
import { UserProvider } from './lib/user-provider'
import ClickSpark from './components/Custom/ClickSpark ';

const router = createBrowserRouter(routes)

function App() {
  return (
    <UserProvider>
      <TooltipProvider>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <RouterProvider router={router} />
        </ClickSpark>
      </TooltipProvider>
    </UserProvider>
  )
}

export default App
