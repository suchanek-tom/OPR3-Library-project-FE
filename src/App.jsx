import { Outlet, Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <h1>Library System</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/books">Books</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App