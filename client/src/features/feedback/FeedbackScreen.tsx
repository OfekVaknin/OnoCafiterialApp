import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../shared/components/Input/Input';
import { Select } from '../../shared/components/Select/Select';
import { Button } from '../../shared/components/Button/Button';
import { Alert } from '../../shared/components/Alert/Alert';
import { feedbackService } from './services/feedbackService';

const ratingOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const FeedbackScreen = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!message || !rating) {
      setError(t('feedbackRequired'));
      return;
    }
    setLoading(true);
    try {
      feedbackService.create({
        id: crypto.randomUUID(),
        userId: 'current', // Replace with real userId from context
        message,
        rating: Number(rating),
        createdAt: new Date().toISOString(),
      });
      setSuccess(t('feedbackSuccess'));
      setMessage('');
      setRating('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h2>{t('feedback')}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label={t('feedbackMessage')}
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
        <Select
          label={t('rating')}
          options={ratingOptions}
          value={rating}
          onChange={e => setRating(e.target.value)}
          placeholder={t('selectRating')}
          required
        />
        {error && <Alert type="error">{error}</Alert>}
        {success && <Alert type="success">{success}</Alert>}
        <Button type="submit" disabled={loading}>{t('submit')}</Button>
      </form>
    </div>
  );
};
export default FeedbackScreen;
