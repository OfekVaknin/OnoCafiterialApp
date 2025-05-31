import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from './services/authService';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import './auth.scss';

export const RegisterScreen = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      authService.register({ name, email, password });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="main-content auth-content">
      <h2>{t('register')}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label={t('name')}
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <Button type="submit">{t('register')}</Button>
      </form>
      <div className="auth-toggle">
        {t('haveAccount')}{' '}
        <a href="/login">{t('login')}</a>
      </div>
    </div>
  );
};
