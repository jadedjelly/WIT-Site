import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import PostsIndex from './pages/PostsIndex'
import PostPage from './pages/PostPage'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostsIndex />} />
          <Route path="/posts/:slug" element={<PostPage />} />
          <Route path="/contact" element={<Contact />} />   {/* ← add this */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}