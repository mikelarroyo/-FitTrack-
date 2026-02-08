import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WorkoutProvider } from './context/WorkoutContext'
import Layout from './components/Layout'
import WorkoutList from './components/WorkoutList'
import WorkoutEditor from './components/WorkoutEditor'
import WorkoutDetail from './components/WorkoutDetail'

function App() {
  return (
    <Router>
      <WorkoutProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<WorkoutList />} />
            <Route path="/new" element={<WorkoutEditor />} />
            <Route path="/edit/:id" element={<WorkoutEditor />} />
            <Route path="/detail/:id" element={<WorkoutDetail />} />
          </Routes>
        </Layout>
      </WorkoutProvider>
    </Router>
  )
}

export default App
