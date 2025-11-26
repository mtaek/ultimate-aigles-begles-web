import { useState, useEffect } from 'react';

interface UseGoogleSheetCSVOptions<T> {
  csvUrl: string;
  parser: (csvText: string) => T[];
  fallbackData?: T[];
}

interface UseGoogleSheetCSVReturn<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

/**
 * Hook personnalisé pour charger et parser des données depuis Google Sheets CSV
 * @param csvUrl - URL publique du Google Sheet en format CSV
 * @param parser - Fonction qui convertit le texte CSV en tableau d'objets
 * @param fallbackData - Données à utiliser en cas d'erreur de chargement
 */
export function useGoogleSheetCSV<T>({
  csvUrl,
  parser,
  fallbackData = []
}: UseGoogleSheetCSVOptions<T>): UseGoogleSheetCSVReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const parsedData = parser(csvText);
        setData(parsedData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des données Google Sheets:', err);
        setError(err instanceof Error ? err : new Error('Erreur inconnue'));
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [csvUrl, fallbackData, parser]);

  return { data, loading, error };
}

/**
 * Parser CSV simple pour des données avec 2 colonnes (question/réponse, clé/valeur, etc.)
 * @param csvText - Texte brut du CSV
 * @param skipHeader - Si true, ignore la première ligne (défaut: true)
 */
export function parseTwoColumnCSV<T extends { [key: string]: string }>(
  csvText: string,
  keys: [string, string],
  skipHeader: boolean = true
): T[] {
  const lines = csvText.split('\n');
  const startIndex = skipHeader ? 1 : 0;
  
  return lines
    .slice(startIndex)
    .filter(line => line.trim())
    .map(line => {
      // Parse CSV avec support des guillemets doubles échappés
      let first = '';
      let second = '';
      
      // Si la ligne commence par un guillemet, c'est du CSV avec guillemets
      if (line.startsWith('"')) {
        // Extraire les valeurs entre guillemets en gérant les guillemets échappés ("")
        const regex = /"((?:[^"]|"")*)","((?:[^"]|"")*)"/;
        const match = line.match(regex);
        if (match) {
          first = match[1].replace(/""/g, '"'); // Remplacer "" par "
          second = match[2].replace(/""/g, '"');
        }
      } else {
        // CSV simple sans guillemets
        [first, second] = line.split(',').map(s => s?.trim() || '');
      }
      
      return {
        [keys[0]]: first,
        [keys[1]]: second
      } as T;
    })
    .filter(item => item[keys[0]] && item[keys[1]]);
}
