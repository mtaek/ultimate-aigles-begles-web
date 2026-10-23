import React, { useEffect, useState } from 'react';

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

const CACHE_KEY = 'ultimatebegles_articles_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 heure

// Articles de fallback en cas d'échec complet
const FALLBACK_ARTICLES: Article[] = [
  {
    title: "Suivez nos actualités sur le blog",
    link: "https://ultimatebegles.blogspot.com/",
    pubDate: new Date().toISOString(),
    description: "Retrouvez toutes les actualités, résultats et événements du club sur notre blog officiel.",
    thumbnail: "/images/logo_aigles_2025.png"
  }
];

const Actualites: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Vérifier le cache d'abord
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { articles: cachedArticles, timestamp } = JSON.parse(cachedData);
          const isCacheValid = Date.now() - timestamp < CACHE_DURATION;
          
          if (isCacheValid && cachedArticles.length > 0) {
            console.log('Utilisation du cache');
            setArticles(cachedArticles);
            setLoading(false);
            return;
          }
        }

        // Essayer de récupérer les articles
        const proxies = [
          'https://api.allorigins.win/raw?url=',
          'https://corsproxy.io/?'
        ];
        
        const blogUrl = 'https://ultimatebegles.blogspot.com/feeds/posts/default?alt=json&max-results=6';
        let data = null;
        let lastError = null;

        for (const proxyUrl of proxies) {
          try {
            console.log('Tentative avec:', proxyUrl);
            const response = await fetch(proxyUrl + encodeURIComponent(blogUrl), {
              method: 'GET',
              headers: {
                'Accept': 'application/json'
              }
            });
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            data = await response.json();
            console.log('Données reçues avec succès:', data);
            break;
          } catch (err) {
            console.warn('Échec avec ce proxy:', proxyUrl, err);
            lastError = err;
            continue;
          }
        }

        if (!data) {
          throw lastError || new Error('Tous les proxies ont échoué');
        }
        
        const parsedArticles: Article[] = [];

        if (data.feed && data.feed.entry) {
          console.log('Nombre d\'articles:', data.feed.entry.length);
          data.feed.entry.forEach((entry: any) => {
            const title = entry.title?.$t || '';
            const link = entry.link?.find((l: any) => l.rel === 'alternate')?.href || '';
            const pubDate = entry.published?.$t || '';
            
            // Extraire l'image du contenu HTML
            const content = entry.content?.$t || '';
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const img = tempDiv.querySelector('img');
            const thumbnail = img?.getAttribute('src') || '';
            
            // Extraire un extrait de texte (sans HTML)
            const textContent = tempDiv.textContent || '';
            const description = textContent.substring(0, 150) + '...';

            parsedArticles.push({
              title,
              link,
              pubDate,
              description,
              thumbnail
            });
          });
        }

        console.log('Articles parsés:', parsedArticles);
        
        // Sauvegarder dans le cache
        if (parsedArticles.length > 0) {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            articles: parsedArticles,
            timestamp: Date.now()
          }));
          setArticles(parsedArticles);
        } else {
          throw new Error('Aucun article trouvé');
        }
        
        setLoading(false);
        setError(null);
        setRetryCount(0);
      } catch (err) {
        console.error('Erreur complète:', err);
        
        // Essayer de charger depuis le cache même expiré
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { articles: cachedArticles } = JSON.parse(cachedData);
          if (cachedArticles.length > 0) {
            console.log('Utilisation du cache expiré comme fallback');
            setArticles(cachedArticles);
            setLoading(false);
            setError(null);
            return;
          }
        }
        
        // Utiliser les articles de fallback
        setArticles(FALLBACK_ARTICLES);
        setError('Chargement des actualités en cours...');
        setLoading(false);
        
        // Retry automatique toutes les 30 secondes (max 5 fois)
        if (retryCount < 5) {
          setTimeout(() => {
            console.log(`Tentative de rechargement ${retryCount + 1}/5`);
            setRetryCount(retryCount + 1);
            setLoading(true);
          }, 30000);
        }
      }
    };

    fetchArticles();
  }, [retryCount]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="actualites" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
          <div className="section-header mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
              Actualités
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
            </h2>
            <p className="text-gray-600 mt-8">
              Découvrez les dernières nouvelles du club
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                {/* Image skeleton */}
                <div className="w-full h-48 bg-gray-300"></div>
                
                {/* Contenu skeleton */}
                <div className="p-6">
                  {/* Date skeleton */}
                  <div className="h-4 bg-gray-300 rounded w-32 mb-3"></div>
                  
                  {/* Titre skeleton */}
                  <div className="h-6 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  
                  {/* Description skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="actualites" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
          <div className="section-header mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
              Actualités
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
            </h2>
            <p className="text-gray-600 mt-8">
              Découvrez les dernières nouvelles du club
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-blue-700">
              <i className="fas fa-sync-alt animate-spin mr-2"></i>
              {error}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {article.thumbnail && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <time className="text-sm text-blue-600 font-medium">
                    {formatDate(article.pubDate)}
                  </time>
                  
                  <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Lire la suite
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://ultimatebegles.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Voir toutes les actualités
            </a>
          </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="actualites" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container">
        <div className="max-w-5xl mx-auto">
        <div className="section-header mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary relative inline-block">
            Actualités
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-[3px] bg-secondary"></span>
          </h2>
          <p className="text-gray-600 mt-8">
            Découvrez les dernières nouvelles du club
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {article.thumbnail && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              )}
              
              <div className="p-6">
                <time className="text-sm text-blue-600 font-medium">
                  {formatDate(article.pubDate)}
                </time>
                
                <h3 className="text-xl font-bold mt-2 mb-3 text-gray-800 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Lire la suite
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://ultimatebegles.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Voir toutes les actualités
          </a>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Actualites;
