import type { Feedback } from '../../../shared/types/Feedback';

const STORAGE_KEY = 'feedbacks';

function getAll(): Feedback[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function getById(id: string): Feedback | undefined {
  return getAll().find(f => f.id === id);
}

function create(feedback: Feedback): Feedback {
  const feedbacks = getAll();
  if (feedbacks.some(f => f.id === feedback.id)) throw new Error('Feedback already exists');
  feedbacks.push(feedback);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  return feedback;
}

function update(id: string, updates: Partial<Feedback>): Feedback | undefined {
  const feedbacks = getAll();
  const idx = feedbacks.findIndex(f => f.id === id);
  if (idx === -1) throw new Error('Feedback not found');
  feedbacks[idx] = { ...feedbacks[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbacks));
  return feedbacks[idx];
}

function remove(id: string): boolean {
  const feedbacks = getAll();
  const filtered = feedbacks.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return feedbacks.length !== filtered.length;
}

export const feedbackService = { getAll, getById, create, update, delete: remove };
