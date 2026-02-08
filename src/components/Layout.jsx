import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        {children}
      </main>
    </div>
  )
}
