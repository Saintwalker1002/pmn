import { Link } from 'react-router-dom';

function NavLog() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#eee' }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Mi Sitio</Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Login</Link>
        <Link to="/home">Home</Link>
      </div>
    </nav>
  );
}

export default NavLog;