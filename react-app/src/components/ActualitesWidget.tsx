import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
}

const ActualitesWidget: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Utiliser un proxy CORS pour accéder au flux Blogger
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const blogUrl = encodeURIComponent('https://ultimatebegles.blogspot.com/feeds/posts/default?alt=json&max-results=3');
        const response = await fetch(proxyUrl + blogUrl);
        const data = await response.json();
        
        const parsedArticles: Article[] = [];

        if (data.feed && data.feed.entry) {
          data.feed.entry.forEach((entry: any) => {
            const title = entry.title?.$t || '';
            const link = entry.link?.find((l: any) => l.rel === 'alternate')?.href || '';
            const pubDate = entry.published?.$t || '';

            parsedArticles.push({
              title,
              link,
              pubDate
            });
          });
        }

        setArticles(parsedArticles);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading || articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
        Dernières actualités
      </h3>

      <ul className="space-y-4">
        {articles.map((article, index) => (
          <li key={index} className="border-b border-gray-200 last:border-0 pb-3 last:pb-0">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 p-2 -m-2 rounded transition-colors"
            >
              <h4 className="font-medium text-gray-800 hover:text-blue-600 line-clamp-2 mb-1">
                {article.title}
              </h4>
              <time className="text-sm text-gray-500">
                {formatDate(article.pubDate)}
              </time>
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://ultimatebegles.blogspot.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Voir toutes les actualités →
      </a>
    </div>
  );
};

export default ActualitesWidget;
