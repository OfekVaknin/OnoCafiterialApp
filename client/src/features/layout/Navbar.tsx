import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../auth/services/authService';
import { UserRoleEnum } from '../user/enums/UserRoleEnum';
import './layout.scss';
import CartIcon from '../menu/CartIcon';

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  // Determine links based on user role
  let links = [
    { to: '/', key: 'home' },
    { to: '/menu', key: 'menu' },
    { to: '/orders', key: 'myOrders' },
    { to: '/feedback', key: 'feedback' },
    { to: '/logout', key: 'logout' },
  ];
  if (currentUser?.role === UserRoleEnum.Admin) {
    links = [
      { to: '/dashboard', key: 'dashboard' },
      { to: '/manage-menu', key: 'manageMenu' },
      { to: '/manage-orders', key: 'manageOrders' },
      { to: '/users', key: 'users' },
      { to: '/feedback', key: 'feedback' },
      { to: '/analytics', key: 'analytics' },
      { to: '/logout', key: 'logout' },
    ];
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    authService.logout();
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="menu">
        <FontAwesomeIcon icon={faBars} size="lg" color="#fff" />
      </button>
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map((link) => (
          <li key={link.key}>
            {link.key === 'logout' ? (
              <a href="/logout" onClick={handleLogout}>{t('logout')}</a>
            ) : (
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {t(link.key)}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
      {currentUser && (
        <div className="navbar-greeting" style={{ marginInlineStart: 16, fontWeight: 500 }}>
          {t('hello', { name: currentUser.name.split(' ')[0] })}
        </div>
      )}
      <div className="lang-switcher">
        <Link to="/cart" aria-label="Cart" style={{ position: 'relative', marginLeft: 16, display: 'inline-block' }}>
          <CartIcon />
        </Link>
        <select
          value={i18n.language}
          onChange={e => i18n.changeLanguage(e.target.value)}
          aria-label={t('language')}
        >
          <option value="he">{t('hebrew')}</option>
          <option value="en">{t('english')}</option>
        </select>
      </div>
    </nav>
  );
};
