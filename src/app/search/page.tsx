'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { useAuthStore } from '@/store/store';
import Cookies from 'js-cookie';
import Image from 'next/image';

interface SearchResult {
  id: string;
  name: string;
  type: 'category' | 'subcategory' | 'product' | 'auction' | 'post';
  url: string;
  description: string;
  image?: string | null;
  price?: number | null;
  category?: string;
  author?: string;
}

interface SearchResponse {
  data: {
    results: SearchResult[];
    total: number;
    query: string;
    type: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all';
  
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setError('Please enter a search term with at least 2 characters');
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = Cookies.get("token") as string;
        const headers: { [key: string]: string } = {
          "Content-Type": "application/json",
        };

        if (token && isLoggedIn) {
          headers["Authorization"] = `token ${token}`;
        }

        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`, {
          method: "GET",
          headers: headers,
        });

        if (response.ok) {
          const data: SearchResponse = await response.json();
          setSearchResults(data.data.results);
          setTotalResults(data.data.total);
        } else {
          setError('Failed to load search results');
        }
      } catch (error) {
        console.error('Search error:', error);
        setError('An error occurred while searching');
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query, type, isLoggedIn]);

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'category':
        return '📁';
      case 'subcategory':
        return '📂';
      case 'product':
        return '🛍️';
      case 'auction':
        return '🎯';
      case 'post':
        return '💬';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'category':
        return 'bg-blue-100 text-blue-700';
      case 'subcategory':
        return 'bg-green-100 text-green-700';
      case 'product':
        return 'bg-purple-100 text-purple-700';
      case 'auction':
        return 'bg-orange-100 text-orange-700';
      case 'post':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search</h1>
            <p className="text-gray-600">Please enter a search term to get started.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {isLoading ? 'Searching...' : 
             error ? 'Error occurred' :
             `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`
            }
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F25E26]"></div>
            <span className="ml-4 text-lg text-gray-600">Searching...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#F25E26] text-white rounded-md hover:bg-[#E54D26] transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Search Results */}
        {!isLoading && !error && searchResults.length > 0 && (
          <div className="grid gap-4">
            {searchResults.map((result) => (
              <div 
                key={`${result.type}-${result.id}`}
                onClick={() => handleResultClick(result)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Image or Icon */}
                  <div className="flex-shrink-0">
                   {/*  {result.image ? (
                      <img 
                        src={result.image} 
                        alt={result.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {getTypeIcon(result.type)}
                      </div>
                    )} */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                        {getTypeIcon(result.type)}
                      </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {result.name}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(result.type)}`}>
                        {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-2 line-clamp-2">
                      {result.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {result.price && (
                        <span className="font-semibold text-[#F25E26]">
                          ₦{result.price.toLocaleString()}
                        </span>
                      )}
                      {result.category && (
                        <span>Category: {result.category}</span>
                      )}
                      {result.author && (
                        <span>By: {result.author}</span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && !error && searchResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t find any results for &quot;{query}&quot;
            </p>
            <div className="text-sm text-gray-500">
              <p>Try:</p>
              <ul className="mt-2 space-y-1">
                <li>• Checking your spelling</li>
                <li>• Using different keywords</li>
                <li>• Using more general terms</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
} 