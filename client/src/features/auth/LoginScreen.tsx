import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from './services/authService';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import './auth.scss';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      authService.login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="main-content auth-content">
      <h2>{t('login')}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label={t('email')}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('password')}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="auth-error">{error}</div>}
        <Button type="submit">{t('login')}</Button>
      </form>
      <div className="auth-toggle">
        {t('noAccount')}{' '}
        <Link to="/register">{t('register')}</Link>
      </div>
    </div>
  );
};
