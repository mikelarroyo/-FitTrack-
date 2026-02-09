import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WorkoutProvider } from './context/WorkoutContext'
import Layout from './components/Layout'
import WorkoutList from './components/WorkoutList'
import WorkoutEditor from './components/WorkoutEditor'
import WorkoutDetail from './components/WorkoutDetail'
import WorkoutSession from './components/WorkoutSession'
import Analysis from './components/Analysis'
import About from './components/About'
import Sitemap from './components/Sitemap'

function App() {
  return (
    <Router>
      <WorkoutProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<WorkoutList />} />
            <Route path="/new" element={<WorkoutEditor />} />
            <Route path="/edit/:id" element={<WorkoutEditor />} />
            <Route path="/template/:id" element={<WorkoutDetail />} />
            <Route path="/session/:id" element={<WorkoutDetail />} />
            <Route path="/start/:templateId" element={<WorkoutSession />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/about" element={<About />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </Layout>
      </WorkoutProvider>
    </Router>
  )
}

export default App
