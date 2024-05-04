import { Link, useLocation } from 'react-router-dom';

export default function Navlink({ to, name, ...rest }) {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <button
        className={`px-3 py-2 rounded-md hover:bg-gray-200 ${isActive ? 'bg-gray-200' : ''}`}
        {...rest}
      >
        {name}
      </button>
    </Link>
  );
}
