import { ThemeProvider } from '@/lib/theme-provider'
import { Hero } from '@/components/sections/Hero'
import { Features } from '@/components/sections/Features'
import { DemoPreview } from '@/components/sections/DemoPreview'
import { Testimonials } from '@/components/sections/Testimonials'
import { Footer } from '@/components/sections/Footer'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="codeneko-theme">
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">
          <Hero />
          <Features />
          <DemoPreview />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
