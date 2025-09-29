'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { socialIcon, headerMenu, marqueeInfo } from '../static-data';
import { IoCartOutline } from 'react-icons/io5';
import { BiBell } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore, userNavStore } from '@/store/store';
import { useMutateData } from '@/hooks/useMutateData';
import Brand from '../asset/logo.svg';
import { CiSearch } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryData } from '@/hooks/useQueryData';
import { useGetDatanew } from '@/hooks/useGetData';
import { AuctionMarquee } from './Auction-Marquee';
import React from 'react';
import Cookies from "js-cookie";
import axios from "axios";

interface HeaderProps {
  onSearch?: React.Dispatch<React.SetStateAction<string>>;
}

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

function Search({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
  const [searchInput, setSearchInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Debounced search function
  const performSearch = async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const token = Cookies.get("token") as string;
      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };

      if (token && isLoggedIn) {
        headers["Authorization"] = `token ${token}`;
      }

      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=all`, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data: SearchResponse = await response.json();
        setSearchResults(data.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchInput(input);
    setIsDropdownOpen(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(input);
    }, 300);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchInput) {
      // Navigate to search results page or perform search
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
    setIsDropdownOpen(false);
    onClose?.();
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsDropdownOpen(false);
    onClose?.();
  };

  return (
    <div ref={dropdownRef} className='relative w-full'>
      <form className='relative flex w-full' onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className={`bg-[#F5F5F5] p-2 w-full text-sm rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F25E26] focus:border-transparent ${
            isMobile ? 'py-3 text-base' : ''
          }`}
          value={searchInput}
          onChange={handleSearchChange}
          onClick={() => setIsDropdownOpen(true)}
          placeholder="Search products..."
        />
        <button 
          type="submit" 
          className={`bg-[#F5F5F5] px-3 rounded-r-md hover:bg-[#E5E5E5] transition-colors border border-l-0 border-gray-200 ${
            isMobile ? 'px-4' : ''
          }`}
        >
          <CiSearch className={`text-black ${isMobile ? 'text-xl' : 'text-lg'}`} />
        </button>
      </form>

      {isDropdownOpen && (
        <div className={`absolute left-0 right-0 z-50 mt-1 bg-white shadow-lg rounded-md max-h-80 overflow-y-auto border border-gray-200 ${
          isMobile ? 'max-h-96' : ''
        }`}>
          {isSearching ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#F25E26]"></div>
              <span className="ml-2 text-sm text-gray-500">Searching...</span>
            </div>
          ) : searchResults.length > 0 ? (
            <div>
              {searchResults.map((result, index) => (
                <div 
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="block px-4 py-3 text-sm text-[#504D4D] font-Poppins hover:bg-gray-50 border-b border-gray-100 last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                   {/*  {result.image && (
                      <image
                        src={result.image} 
                        alt={result.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )} */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#2A2A2A] truncate">
                          {result.name}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          result.type === 'category' ? 'bg-blue-100 text-blue-700' :
                          result.type === 'subcategory' ? 'bg-green-100 text-green-700' :
                          result.type === 'product' ? 'bg-purple-100 text-purple-700' :
                          result.type === 'auction' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {result.type}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {result.description}
                      </div>
                      {result.price && (
                        <div className="text-xs font-medium text-[#F25E26] mt-1">
                          ₦{result.price.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {searchResults.length >= 20 && (
                <div className="px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                  Showing top 20 results. <button 
                    onClick={handleSearchSubmit}
                    className="text-[#F25E26] hover:underline"
                  >
                    View all results
                  </button>
                </div>
              )}
            </div>
          ) : searchInput && searchInput.length >= 2 ? (
            <div className={`p-4 text-sm text-gray-500 ${isMobile ? 'text-base' : ''}`}>
              No results found for &quot;{searchInput}&quot;
            </div>
          ) : (
            <div className={`p-4 text-sm text-gray-500 ${isMobile ? 'text-base' : ''}`}>
              Start typing to search...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const pathname = usePathname();
  const isRootPath = pathname === '/';
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [expandedNotifications, setExpandedNotifications] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false); // Disabled until backend supports pagination
  const [notificationError, setNotificationError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [previousNotificationCount, setPreviousNotificationCount] = useState(0);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showDesktopNav, setShowDesktopNav] = useState(false);
  const [navigationWidth, setNavigationWidth] = useState(0);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigationRef = useRef<HTMLElement>(null);
  
  const { isLoggedIn, clearAuthCookies, cartCount, setCartCount, cartRefreshTrigger } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    clearAuthCookies: state.clearAuthCookies,
    cartCount: state.cartCount,
    setCartCount: state.setCartCount,
    cartRefreshTrigger: state.cartRefreshTrigger,
  }));
  
  const { setHeaderNav, headerNav } = userNavStore(state => ({
    setHeaderNav: state.setHeaderNav,
    headerNav: state.headerNav,
  }));

  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  // Improved hover handlers to prevent flickering
  const handleMenuEnter = (index: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredMenu(index);
    
    // Force a small delay to ensure the DOM is updated for positioning calculations
    setTimeout(() => {
      // This triggers a re-render to recalculate positioning if needed
      if (hoveredMenu !== index) {
        setHoveredMenu(index);
      }
    }, 10);
  };

  const handleMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150); // 150ms delay before closing
  };

  // Smart dropdown positioning that prevents overflow
  const getSmartDropdownPosition = (index: number, menuRef?: HTMLElement) => {
    if (!windowWidth) return { position: 'left-0', transform: '' }; // Default for SSR
    
    // Get the menu item element to calculate its position
    const menuItems = document.querySelectorAll('[data-menu-index]');
    const currentMenuItem = menuItems[index] as HTMLElement;
    
    if (!currentMenuItem) return { position: 'left-0', transform: '' };
    
    const rect = currentMenuItem.getBoundingClientRect();
    const dropdownWidth = windowWidth < 768 ? 160 : windowWidth < 1024 ? 176 : windowWidth < 1280 ? 192 : 208; // Dropdown width in pixels
    
    // Calculate available space on right and left
    const spaceOnRight = windowWidth - rect.right;
    const spaceOnLeft = rect.left;
    
    // If dropdown would overflow on right, position it to the left
    if (spaceOnRight < dropdownWidth && spaceOnLeft > dropdownWidth) {
      return { position: 'right-0', transform: '' };
    }
    
    // If there's not enough space on either side, center it and make it fit
    if (spaceOnRight < dropdownWidth && spaceOnLeft < dropdownWidth) {
      const availableWidth = Math.min(windowWidth - 32, 320); // Max width with padding
      return { 
        position: 'left-1/2', 
        transform: 'transform -translate-x-1/2',
        maxWidth: `max-w-[${availableWidth}px]`
      };
    }
    
    // Default to left positioning
    return { position: 'left-0', transform: '' };
  };

  // Responsive dropdown width with max constraints
  const getResponsiveDropdownWidth = () => {
    if (!windowWidth) return 'w-44'; // Default for SSR
    
    if (windowWidth < 768) return 'w-40 max-w-[160px]';
    if (windowWidth < 1024) return 'w-44 max-w-[176px]';
    if (windowWidth < 1280) return 'w-48 max-w-[192px]';
    return 'w-52 max-w-[208px]';
  };

  // Smart dropdown classes that adapt to viewport boundaries
  const getAdaptiveDropdownClass = (index: number) => {
    const { position, transform, maxWidth } = getSmartDropdownPosition(index);
    const width = getResponsiveDropdownWidth();
    
    // Base classes with proper text handling
    const baseClasses = 'absolute top-full bg-white shadow-lg rounded-md border border-gray-200 py-2 z-[60]';
    const textClasses = maxWidth ? 'break-words' : 'whitespace-nowrap'; // Allow text wrapping only when width is constrained
    const responsiveClasses = maxWidth || width;
    const positionClasses = `${position} ${transform || ''}`;
    
    return `${baseClasses} ${textClasses} ${responsiveClasses} ${positionClasses}`.trim();
  };

  const hamburgerfunc = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleSuccess = () => {
    clearAuthCookies();
    localStorage.clear();
    router.push('/signin');
  };

  const handleError = () => {
   /*  console.log('Something went wrong...'); */
    clearAuthCookies();
    localStorage.clear();
    router.push('/signin');
  };

  const { mutate } = useMutateData(
    'signout',
    handleSuccess,
    handleError
  );

  const SignoutFunc = () => {
    mutate({
      url: '/api/signout',
      payload: {},
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setHoveredMenu(null); // Also close desktop dropdowns when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [headerNav, menuRef]);

  // Cleanup body scroll and hover timeout on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Calculate if navigation fits in available space
  const calculateNavigationFit = useCallback(() => {
    if (!navigationRef.current || typeof window === 'undefined') return;

    // Always show desktop nav if window is very wide
    if (window.innerWidth >= 1200) {
      setShowDesktopNav(true);
      return;
    }

    const headerContainer = navigationRef.current.closest('[class*="flex"]');
    if (!headerContainer) return;

    // Get all elements in header to calculate available space
    const logoContainer = headerContainer.querySelector('[class*="flex-shrink-0"]:first-child');
    const rightActionsContainer = headerContainer.querySelector('[class*="flex-shrink-0"]:last-child');

    if (!logoContainer || !rightActionsContainer) return;

    const headerWidth = headerContainer.clientWidth;
    const logoWidth = logoContainer.clientWidth;
    const rightActionsWidth = rightActionsContainer.clientWidth;
    
    // Account for padding, gaps, and search box when desktop nav is visible
    const padding = 80;
    const searchBoxWidth = showDesktopNav ? 192 : 0; // Approximate search box width
    
    // Calculate available space for navigation
    const availableSpace = headerWidth - logoWidth - rightActionsWidth - padding - searchBoxWidth;
    
    // Calculate current navigation width (temporarily show it to measure)
    const tempShow = !showDesktopNav;
    if (tempShow) {
      navigationRef.current.style.visibility = 'hidden';
      navigationRef.current.style.position = 'absolute';
      navigationRef.current.style.display = 'flex';
    }
    
    const navWidth = navigationRef.current.scrollWidth;
    setNavigationWidth(navWidth);
    
    if (tempShow) {
      navigationRef.current.style.visibility = '';
      navigationRef.current.style.position = '';
      navigationRef.current.style.display = '';
    }
    
    // Show desktop navigation only if it fits comfortably
    const shouldShowDesktop = availableSpace > navWidth + 60; // Extra buffer for safety
    setShowDesktopNav(shouldShowDesktop);
  }, [showDesktopNav]);

  // Track window width and navigation fit
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close any open dropdowns on resize to prevent positioning issues
      if (hoveredMenu !== null) {
        setHoveredMenu(null);
      }
      
      // Recalculate navigation fit after a short delay to ensure layout is complete
      setTimeout(calculateNavigationFit, 100);
    };

    // Set initial width and calculate fit
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      // Initial calculation with multiple attempts to ensure DOM is ready
      setTimeout(calculateNavigationFit, 100);
      setTimeout(calculateNavigationFit, 300);
      setTimeout(calculateNavigationFit, 500);
      
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [hoveredMenu, calculateNavigationFit]);

  // Recalculate when navigation items might change
  useEffect(() => {
    calculateNavigationFit();
  }, [isLoggedIn, calculateNavigationFit]);

  // Force recalculation when component mounts and layout is ready
  useEffect(() => {
    const observer = new MutationObserver(() => {
      calculateNavigationFit();
    });

    if (navigationRef.current) {
      observer.observe(navigationRef.current.parentElement!, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
      });
    }

    return () => observer.disconnect();
  }, [calculateNavigationFit]);

  // Determine if a parent menu item should be highlighted as active
  const isParentActive = (menuItem: any): boolean => {
    try {
      if (!menuItem) return false;
      if (pathname === menuItem.path) return true;
      if (Array.isArray(menuItem.submenu)) {
        return menuItem.submenu.some((sub: any) => typeof sub?.path === 'string' && pathname?.startsWith(sub.path));
      }
      return false;
    } catch {
      return false;
    }
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartItemsn, setCartItemsn] = useState<any[]>([]);

  const tkn_: string = Cookies.get("token") as string;

  // Fetch notifications data using authenticated hook
  const notificationsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/notifications/`;
  
  const { data: notificationsData, isLoading: notificationsLoading, refetch: refetchNotifications } = useGetDatanew(
    isLoggedIn && tkn_ ? notificationsUrl : "", // Only pass URL when logged in and token exists
    'get_notifications', 
    tkn_ || "",
    {
      cacheTime: 0, // disable cache for real-time updates
      staleTime: 0 // data will be considered stale immediately
    }
  );

  // Set up real-time polling for notifications
  useEffect(() => {
    if (!isLoggedIn || !tkn_) return;

    const pollInterval = setInterval(() => {
    
      refetchNotifications();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(pollInterval);
  }, [isLoggedIn, tkn_, refetchNotifications]);

  // Handle notifications data and count
  useEffect(() => {
  
    
    if (notificationsData?.data && Array.isArray(notificationsData.data)) {
      // Direct backend API response: { status: "success", data: [...] }
    
      
      const transformedNotifications = notificationsData.data.map((notification: any, index: number) => ({
        ...notification,
        id: index + 1, // Generate an ID since the real API doesn't provide one
        read: false, // Default to unread since the real API doesn't track read status
        type: 'notification', // Default type
        url: '/profile' // Default URL for navigation
      }));
      
     
      
      // Check for new notifications
      const newCount = transformedNotifications.length;
      if (previousNotificationCount > 0 && newCount > previousNotificationCount) {
        setHasNewNotifications(true);

        
        // Clear the "new" indicator after 3 seconds
        setTimeout(() => {
          setHasNewNotifications(false);
        }, 3000);
      }
      
      setNotifications(transformedNotifications);
      setNotificationCount(newCount);
      setPreviousNotificationCount(newCount);
      setNotificationError(null);
    } else if (notificationsData?.status === 'success' && (!notificationsData.data || notificationsData.data.length === 0)) {
      // Successful response but no notifications
     
      setNotifications([]);
      setNotificationCount(0);
      setPreviousNotificationCount(0);
      setNotificationError(null);
    } else if (notificationsData?.status === 'failed') {
      // Backend API error

      setNotificationError(notificationsData.message || 'Unable to load notifications');
      setNotifications([]);
      setNotificationCount(0);
      setPreviousNotificationCount(0);
    } else if (notificationsData) {
      console.log('');
    }
  }, [notificationsData, previousNotificationCount]);

  // Handle loading states and errors from useGetDatanew hook
  useEffect(() => {
    if (notificationsLoading) {
      // Reset error when starting to load
      setNotificationError(null);
    }
    
    // Handle authentication errors when not logged in
    if (!isLoggedIn) {
      setNotifications([]);
      setNotificationCount(0);
      setNotificationError(null); // Don't show error when not logged in
    }
  }, [notificationsLoading, isLoggedIn]);

  // Function to fetch cart items
  const fetchCartItems = useCallback(async () => {
    setLoading(true);

    let sessionKey = Cookies.get("session_key");

    if (!sessionKey) {
      sessionKey = `session_${Math.random().toString(36).substr(2, 9)}`;
      Cookies.set('session_key', sessionKey, { expires: 7 });
    }

    let headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (tkn_) {
      headers["Authorization"] = `token ${tkn_}`;
    }

    let config = {
      method: "GET",
      maxBodyLength: Infinity,
      url: `https://staging.ajiroba.ng/v1/commerce/cart/?session_key=${sessionKey}`,
      headers: headers,
    };

    try {
      const response = await axios.request(config);
      const newCartCount = Number(response.data?.data?.[0]?.cart_items_count || 0);
      setCartCount(newCartCount); // Update global cart count
      setCartItemsn(response.data?.data[0]?.items || []);
    } catch (error) {
      setError("Error loading cart items");
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [tkn_, setCartCount]);

  // Fetch cart items on initial load and when dependencies change
  useEffect(() => {
    fetchCartItems();
  }, [isRootPath, tkn_, fetchCartItems]);

  // Refetch cart items when cartRefreshTrigger changes (triggered by cart additions)
  useEffect(() => {
    if (cartRefreshTrigger > 0) {
      fetchCartItems();
    }
  }, [cartRefreshTrigger, fetchCartItems]);

  // Handle notification accordion toggle
  const toggleNotification = (index: number) => {
    setExpandedNotifications(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Handle notification modal close
  const closeNotificationModal = () => {
    setShowNotificationModal(false);
    setExpandedNotifications([]);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeNotificationModal();
    }
  };

  // Focus management
  useEffect(() => {
    if (showNotificationModal) {
      // Focus the first focusable element in the modal
      const firstButton = document.querySelector('[role="dialog"] button') as HTMLElement;
      if (firstButton) {
        firstButton.focus();
      }
    }
  }, [showNotificationModal]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setNotificationCount(0);
  };

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setNotificationCount(prev => Math.max(0, prev - 1));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationCount(0);
    setExpandedNotifications([]);
  };

  // Handle notification click
  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.url) {
      router.push(notification.url);
      closeNotificationModal();
    }
  };

  // Manual refresh notifications
  const handleRefreshNotifications = () => {

    refetchNotifications();
  };

  // Load more notifications (pagination)
  const loadMoreNotifications = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true);
      // Simulate loading more notifications
      setTimeout(() => {
        setIsLoadingMore(false);
        setHasMore(false); // For demo, we'll stop after first page
      }, 1000);
    }
  };

  return (
    <>
      <section className='relative w-full'>
        {/* Top Bar - Responsive */}
        <div className='bg-[#2A2A2A] p-1 sm:p-2 md:p-3 text-xs sm:text-sm text-white'>
          <div className='container flex items-center justify-between gap-1 sm:gap-2 md:gap-3'>
            {/* Marquee - Takes available space */}
            <div className='flex-1 min-w-0 overflow-hidden'>
              <AuctionMarquee info={marqueeInfo} />
            </div>
            
            {/* Social Icons - Hidden on mobile, shown on larger screens */}
            <div className='hidden md:flex gap-1 lg:gap-2 xl:gap-3 flex-shrink-0'>
              {socialIcon.map((val, index) => (
                <a 
                  key={index} 
                  href={val.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className='w-3 lg:w-4 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity'
                >
                  <Image src={val.icon} alt={val.name} className='w-full h-auto' />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Header - Responsive */}
        <div className='relative bg-white shadow-md overflow-visible'>
          {/* Mobile Menu Overlay */}
          {isOpen && !showDesktopNav && (
            <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={hamburgerfunc} />
          )}

          <div className='relative z-50'>
            <div className='container flex w-full items-center justify-between gap-1 sm:gap-2 md:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 overflow-visible'>
              
              {/* Left Section - Logo */}
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Link href={'/'} className={`${isOpen ? 'opacity-50' : ''} transition-opacity duration-200`}>
                  <Image src={Brand} alt='brand-logo' className='h-8 sm:h-10 w-auto' />
                </Link>
              </div>

              {/* Center Section - Navigation (Dynamic Responsive) */}
              <div className={`${showDesktopNav ? 'flex' : 'hidden'} items-center flex-1 justify-center relative overflow-visible`}>
                <nav 
                  ref={navigationRef}
                  className='flex items-center gap-1 md:gap-2 lg:gap-4 xl:gap-6 relative max-w-full overflow-visible'
                >
                  {headerMenu?.map((val, index) => (
                    <div
                      key={index}
                      className='relative'
                      data-menu-index={index}
                      onMouseEnter={() => handleMenuEnter(index)}
                      onMouseLeave={handleMenuLeave}
                    >
                      {val.submenu ? (
                        <div className='relative'>
                          <span 
                            className={`flex items-center gap-1 cursor-pointer font-Poppins text-xs md:text-sm lg:text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${isParentActive(val) ? 'text-[#F25E26]' : 'text-[#A09F9F] hover:text-[#F25E26]'}`}
                            onClick={() => setHoveredMenu(hoveredMenu === index ? null : index)}
                          >
                            {val.name}
                            <IoIosArrowDown className={`text-xs transition-transform duration-200 ${
                              hoveredMenu === index ? 'rotate-180' : ''
                            }`} />
                          </span>
                          
                          {/* Dropdown Menu */}
                          {hoveredMenu === index && (
                            <div 
                              className={getAdaptiveDropdownClass(index)}
                              style={{ 
                                display: 'block',
                                visibility: 'visible',
                                opacity: 1
                              }}
                              onMouseEnter={() => handleMenuEnter(index)}
                              onMouseLeave={handleMenuLeave}
                            >
                              {val.submenu.map((subItem, subIndex) => (
                                <div
                                  key={subIndex}
                                  className={`${
                                    (subItem.name === 'Profile' && !isLoggedIn) || 
                                    (subItem.name === 'Wallet' && !isLoggedIn) || 
                                    (subItem.name === 'Community' && !isLoggedIn) || 
                                    (subItem.name === 'Referral Code' && !isLoggedIn) || 
                                    (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'
                                  } ${
                                    (subItem.name === 'Sign Up' && isLoggedIn) || 
                                    (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''
                                  }`}
                                >
                                  <button
                                    onClick={() =>
                                      subItem.name === 'Sign Out'
                                        ? SignoutFunc()
                                        : router.push(`${subItem.path}`)
                                    }
                                    className='w-full text-left font-Poppins text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#F25E26] transition-colors duration-200 px-3 py-2 text-sm min-w-0 truncate'
                                  >
                                    {subItem.name}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={isRootPath ? val.path : `${val.path}`}
                          className={`font-Poppins text-xs md:text-sm lg:text-sm xl:text-base font-medium transition-colors duration-200 whitespace-nowrap ${isParentActive(val) ? 'text-[#F25E26]' : 'text-[#A09F9F] hover:text-[#F25E26]'}`}
                        >
                          {val.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Right Section - Actions */}
              <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>
                
                {/* Desktop Search - Show when desktop nav is visible */}
                <div className={`${showDesktopNav ? 'block' : 'hidden'} w-40 md:w-48 lg:w-64 xl:w-72 flex-shrink-0`}>
                  <Search />
                </div>

                {/* Mobile Search Button - Show when desktop nav is hidden */}
                <button 
                  className={`${!showDesktopNav ? 'block' : 'hidden'} p-2 hover:bg-gray-100 rounded-full transition-colors duration-200`}
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <CiSearch className='text-xl text-[#A09F9F]' />
                </button>

                {/* Notifications */}
                <button 
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={() => isLoggedIn && setShowNotificationModal(true)}
                  title="Notifications"
                  aria-label={`Notifications (${notificationCount} unread)`}
                  aria-expanded={showNotificationModal}
                  aria-haspopup="dialog"
                >
                  <BiBell className='text-xl text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200' />
                  {isLoggedIn && notificationCount > 0 && (
                    <span 
                      className={`absolute -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] text-center transition-all duration-300 ${
                        hasNewNotifications 
                          ? 'bg-green-500 animate-pulse scale-110' 
                          : 'bg-[#F25E26]'
                      }`}
                      aria-label={`${notificationCount} unread notifications${hasNewNotifications ? ' (new!)' : ''}`}
                    >
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button 
                  className='relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                  onClick={() => router.push('/cart')}
                >
                  <IoCartOutline className='text-xl text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200' />
                  {cartCount > 0 && (
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] text-center'>
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Toggle - Show when desktop nav is hidden */}
                <button 
                  className={`${!showDesktopNav ? 'block' : 'hidden'} p-2 hover:bg-gray-100 rounded-full transition-colors duration-200`}
                  onClick={hamburgerfunc}
                >
                  {isOpen ? (
                    <IoClose className='text-xl text-[#A09F9F]' />
                  ) : (
                    <FiMenu className='text-xl text-[#A09F9F]' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
              !showDesktopNav ? 'block' : 'hidden'
            } ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className='flex flex-col h-full'>
              {/* Mobile Menu Header */}
              <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                <Link href={'/'} onClick={() => setIsOpen(false)}>
                  <Image src={Brand} alt='brand-logo' className='h-8 w-auto' />
                </Link>
                <button 
                  onClick={hamburgerfunc}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                >
                  <IoClose className='text-xl text-[#A09F9F]' />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className='flex-1 overflow-y-auto py-4'>
                <nav className='px-4 space-y-2'>
                  {headerMenu?.map((val, index) => (
                    <div key={index} className='border-b border-gray-100 pb-2'>
                      {val.submenu ? (
                        <div>
                          <button
                            onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                            className='w-full flex items-center justify-between py-3 px-2 text-left font-Poppins text-base font-medium text-[#A09F9F] hover:text-[#F25E26] transition-colors duration-200'
                          >
                            {val.name}
                            <IoIosArrowDown className={`text-sm transition-transform duration-200 ${
                              activeMenu === index ? 'rotate-180' : ''
                            }`} />
                          </button>
                          
                          {/* Mobile Submenu */}
                          {activeMenu === index && (
                            <div className='pl-4 space-y-1'>
                              {val.submenu.map((subItem, subIndex) => (
                                <div
                                  key={subIndex}
                                  className={`${
                                    (subItem.name === 'Profile' && !isLoggedIn) || 
                                    (subItem.name === 'Wallet' && !isLoggedIn) || 
                                    (subItem.name === 'Community' && !isLoggedIn) || 
                                    (subItem.name === 'Referral Code' && !isLoggedIn) || 
                                    (subItem.name === 'Sign Out' && !isLoggedIn) ? 'hidden' : 'block'
                                  } ${
                                    (subItem.name === 'Sign Up' && isLoggedIn) || 
                                    (subItem.name === 'Sign In' && isLoggedIn) ? 'hidden' : ''
                                  }`}
                                >
                                  <button
                                    onClick={() => {
                                      if (subItem.name === 'Sign Out') {
                                        SignoutFunc();
                                      } else {
                                        router.push(`${subItem.path}`);
                                      }
                                      setIsOpen(false);
                                    }}
                                    className='w-full text-left py-2 px-3 text-sm font-Poppins text-[#2A2A2A] hover:bg-[#FCDFD4] hover:text-[#F25E26] rounded-md transition-colors duration-200'
                                  >
                                    {subItem.name}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={isRootPath ? val.path : `${val.path}`}
                          onClick={() => setIsOpen(false)}
                          className={`block py-3 px-2 font-Poppins text-base font-medium hover:text-[#F25E26] transition-colors duration-200 ${
                            pathname === val.path ? 'text-[#F25E26]' : 'text-[#A09F9F]'
                          }`}
                        >
                          {val.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          {showMobileSearch && !showDesktopNav && (
            <div className='absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40'>
              <div className='p-3 sm:p-4'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div className='flex-1 min-w-0'>
                    <Search isMobile={true} onClose={() => setShowMobileSearch(false)} />
                  </div>
                  <button 
                    onClick={() => setShowMobileSearch(false)}
                    className='p-2 text-gray-500 hover:text-gray-700 flex-shrink-0'
                  >
                    <IoClose className='text-xl' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Modal - Full Page Overlay */}
        {showNotificationModal && (
          <div className='fixed inset-0 z-50 flex'>
            {/* Main Content Area with Opacity */}
            <div className='flex-1 bg-black bg-opacity-30' onClick={closeNotificationModal}></div>
            
            {/* Notification Side Panel */}
            <div 
              className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl bg-white shadow-2xl h-full overflow-hidden'
              role="dialog"
              aria-labelledby="notification-title"
              aria-modal="true"
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              {/* Modal Header */}
              <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-white'>
                <h3 
                  id="notification-title" 
                  className="text-xl font-semibold text-[#2A2A2A] font-Poppins text-center w-full"
                  style={{ textAlign: 'center', flex: 1 }}
                >
                  Notification
                </h3>
                <div className='flex items-center gap-2'>
                  <button 
                    onClick={handleRefreshNotifications}
                    className='px-3 py-1 text-sm text-[#F25E26] hover:bg-[#FCDFD4] rounded-md transition-colors duration-200 flex items-center gap-1'
                    title="Refresh notifications"
                    disabled={notificationsLoading}
                  >
                    <svg 
                      className={`w-4 h-4 ${notificationsLoading ? 'animate-spin' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                 {/*  {notifications.length > 0 && (
                    <>
                      <button 
                        onClick={markAllAsRead}
                        className='px-3 py-1 text-sm text-[#F25E26] hover:bg-[#FCDFD4] rounded-md transition-colors duration-200'
                        title="Mark all as read"
                      >
                        Mark all read
                      </button>
                      <button 
                        onClick={clearAllNotifications}
                        className='px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200'
                        title="Clear all notifications"
                      >
                        Clear all
                      </button>
                    </>
                  )} */}
                  <button 
                    onClick={closeNotificationModal}
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'
                    aria-label="Close notifications"
                  >
                    <IoClose className='text-xl text-[#A09F9F]' />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className='h-full overflow-y-auto'>
         {/*        {console.log(notifications)} */}
                {notificationsLoading ? (
                  <div className='flex items-center justify-center py-12'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#F25E26]'></div>
                  </div>
                ) : notificationError ? (
                  <div className='text-center py-12 px-6'>
                    <div className='text-red-500 text-4xl mb-3'>⚠️</div>
                    <p className='text-gray-600 font-Poppins mb-2'>{notificationError}</p>
                    <button 
                      onClick={() => window.location.reload()}
                      className='px-4 py-2 bg-[#F25E26] text-white rounded-md hover:bg-[#E54D26] transition-colors duration-200'
                    >
                      Try Again
                    </button>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className='p-6 space-y-4'>
                    {notifications.map((notification: any, index: number) => (
                      <div 
                        key={notification.id}
                        className={`border border-gray-200 rounded-lg bg-[#F6F6F6CC] shadow-sm hover:shadow-md transition-shadow duration-200 ${
                          !notification.read ? 'border-l-4  bg-blue-50' : ''
                        }`}
                      >
                        {/* Notification Header */}
                        <button
                          onClick={() => toggleNotification(index)}
                          className='w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 rounded-t-lg'
                        >
                          <div className='flex-1'>
                            <h4 className={`font-Poppins text-base ${
                              !notification.read ? 'font-semibold text-[#2A2A2A]' : 'font-medium text-[#504D4D]'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className='text-sm text-gray-500 mt-1'>
                              {new Date(notification.date_created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className='flex items-center gap-2'>
                           {/*  {!notification.read && (
                              <div className='w-2 h-2 bg-[#F25E26] rounded-full'></div>
                            )} */}
                            <IoIosArrowDown 
                              className={`text-lg text-[#A09F9F] transition-transform duration-200 ${
                                expandedNotifications.includes(index) ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </button>

                        {/* Notification Content (Accordion) */}
                        {expandedNotifications.includes(index) && (
                          <div className='px-4 pb-4 border-t border-gray-100'>
                            <p className='text-sm text-[#504D4D] font-Poppins leading-relaxed mt-3'>
                              {notification.message}
                            </p>
                            {/* {notification.ticket_number && (
                              <div className='mt-3 p-3 bg-[#FCDFD4] rounded-md'>
                                <p className='text-sm font-medium text-[#F25E26]'>
                                  Ticket Number: <span className='font-bold'>{notification.ticket_number}</span>
                                </p>
                                <p className='text-xs text-[#504D4D] mt-1'>
                                  Kindly go to &apos;auction wins&apos; on your profile to redeem your prize.
                                </p>
                              </div>
                            )} */}
                           {/*  {notification.url && (
                              <button
                                onClick={() => handleNotificationClick(notification)}
                                className='mt-3 w-full px-4 py-2 bg-[#F25E26] text-white rounded-md hover:bg-[#E54D26] transition-colors duration-200 text-sm font-medium'
                              >
                                View Details
                              </button>
                            )} */}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Load More Button */}
                    {hasMore && (
                      <div className='text-center pt-4'>
                        <button
                          onClick={loadMoreNotifications}
                          disabled={isLoadingMore}
                          className='px-6 py-2 text-[#F25E26] border border-[#F25E26] rounded-md hover:bg-[#F25E26] hover:text-white transition-colors duration-200 disabled:opacity-50'
                        >
                          {isLoadingMore ? 'Loading...' : 'Load More'}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className='text-center py-12'>
                    <BiBell className='text-4xl text-gray-300 mx-auto mb-3' />
                    <p className='text-gray-500 font-Poppins'>No notifications yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Search;