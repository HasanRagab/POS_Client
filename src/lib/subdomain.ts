/**
 * Utility functions for subdomain-based organization handling
 */

export interface SubdomainInfo {
  subdomain: string;
  isMainDomain: boolean;
  isLocalhost: boolean;
}

/**
 * Extract subdomain information from the current hostname
 */
export const getSubdomainInfo = (): SubdomainInfo => {
  const hostname = window.location.hostname;
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
    return {
      subdomain: 'localhost',
      isMainDomain: false,
      isLocalhost: true,
    };
  }
  
  const parts = hostname.split('.');
  
  // If it's the main domain (pos.com or www.pos.com), there's no organization subdomain
  if (parts.length <= 2 || (parts.length === 3 && parts[0] === 'www')) {
    return {
      subdomain: '',
      isMainDomain: true,
      isLocalhost: false,
    };
  }
  
  // Extract the subdomain (first part)
  const subdomain = parts[0];
  
  return {
    subdomain,
    isMainDomain: false,
    isLocalhost: false,
  };
};

/**
 * Check if we're on a valid organization subdomain
 */
export const isOrganizationSubdomain = (): boolean => {
  const { isMainDomain, isLocalhost, subdomain } = getSubdomainInfo();
  return !isMainDomain && (isLocalhost || subdomain.length > 0);
};

/**
 * Get the current organization subdomain
 */
export const getCurrentSubdomain = (): string => {
  const { subdomain, isLocalhost } = getSubdomainInfo();
  
  // For localhost development, you might want to return a test subdomain
  // or read from localStorage/URL params
  if (isLocalhost) {
    // Check if subdomain is provided via URL param for development
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('org') || 'demo'; // fallback to 'demo' for development
  }
  
  return subdomain;
};

/**
 * Generate the main domain URL (for signup, marketing pages, etc.)
 */
export const getMainDomainUrl = (): string => {
  const { isLocalhost } = getSubdomainInfo();
  
  if (isLocalhost) {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  // Extract the main domain (e.g., pos.com from org.pos.com)
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const mainDomain = parts.slice(-2).join('.'); // Get last 2 parts (domain.com)
  
  return `${window.location.protocol}//${mainDomain}`;
};

/**
 * Generate organization subdomain URL
 */
export const getOrgUrl = (subdomain: string): string => {
  const { isLocalhost } = getSubdomainInfo();
  
  if (isLocalhost) {
    return `${window.location.protocol}//${window.location.host}?org=${subdomain}`;
  }
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const mainDomain = parts.slice(-2).join('.'); // Get domain.com
  
  return `${window.location.protocol}//${subdomain}.${mainDomain}`;
};

/**
 * Check if a subdomain is valid format
 */
export const isValidSubdomain = (subdomain: string): boolean => {
  const subdomainRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;
  return subdomain.length >= 3 && subdomain.length <= 20 && subdomainRegex.test(subdomain);
};
