import { router } from '@inertiajs/react';
import { useState } from 'react';

interface DailyNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    id: number;
    title: string;
    content: string;
    created_at: string;
  } | null;
}

export default function DailyNewsModal({ isOpen, onClose, news }: DailyNewsModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !news) {
    return null;
  }

  const handleMarkAsRead = () => {
    if (news.id === 0) {
      onClose();
      return;
    }
    
    setIsLoading(true);
    
    router.post('/daily-news/mark-read', {
      news_id: news.id
    }, {
      onSuccess: () => {
        setIsLoading(false);
        onClose();
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-question">{news.title}</h3>
        </div>
        <div className="modal-message">
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </div>
        <button
          onClick={handleMarkAsRead}
          disabled={isLoading}
          className="modal-close-button"
        >
          {isLoading ? 'Φόρτωση...' : news.id === 0 ? 'Εντάξει' : 'Το διάβασα'}
        </button>
      </div>
    </div>
  );
}
