export default function DailyNewsStyles() {
  return (
    <style>{`
      .daily-news-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
      }

      .title {
        font-size: 2.5rem;
        font-weight: bold;
        color: #e91e63;
        margin-bottom: 10px;
      }

      .subtitle {
        font-size: 1.2rem;
        color: #666;
      }

      .news-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 30px;
      }

      .news-item {
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 15px 20px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .news-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
      }

      .news-item-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .news-item-day {
        background-color: #e91e63;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .news-item-question {
        font-size: 1.1rem;
        font-weight: 500;
      }

      .news-item-arrow {
        font-size: 1.5rem;
        color: #e91e63;
      }

      .no-news {
        text-align: center;
        padding: 30px;
        background-color: #f9f9f9;
        border-radius: 10px;
        color: #666;
      }

      .back-button-container {
        text-align: center;
      }

      .back-button {
        background-color: #e91e63;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .back-button:hover {
        background-color: #d81b60;
      }

      .loading-spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(233, 30, 99, 0.3);
        border-radius: 50%;
        border-top-color: #e91e63;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  )
}
