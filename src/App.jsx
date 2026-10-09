import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import PendingPage from './pages/PendingPage.jsx'
import { ROUTES } from './routes.js'
import { PAGE_COMPONENTS } from './pages/registry.js'

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            {ROUTES.map((r) => {
              const Page = PAGE_COMPONENTS[r.path] || PendingPage
              return <Route key={r.path} path={r.path} element={<Page />} />
            })}
            {/* Extra registered paths (e.g. /__preview/* section previews used during the build) */}
            {Object.entries(PAGE_COMPONENTS)
              .filter(([path]) => !ROUTES.some((r) => r.path === path))
              .map(([path, Page]) => (
                <Route key={path} path={path} element={<Page />} />
              ))}
            <Route path="*" element={<PendingPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
