import { redirect } from '@remix-run/node';
import appConfig from '~/app-config';

/**
 * Checks if the site is in maintenance mode and redirects accordingly
 * Call this in your loader functions to protect routes during maintenance
 */
export function checkMaintenanceMode(pathname: string) {
    // Skip maintenance check for maintenance page itself
    if (pathname === '/maintenance') {
        return null;
    }

    // If maintenance mode is enabled, redirect to maintenance page
    if (appConfig.maintenanceMode === true) {
        return redirect('/maintenance');
    }

    return null;
}

/**
 * Checks if a page requires authentication
 * Returns true if the page requires auth based on its configuration
 */
export function requiresAuthentication(pageName: string): boolean {
    const pageConfig = appConfig.pages[pageName];
    return pageConfig?.requires_auth === true;
}

/**
 * Checks if a user has the required role to access a page
 */
export function hasRequiredRole(pageName: string, userRoles: string[]): boolean {
    const pageConfig = appConfig.pages[pageName];

    if (!pageConfig?.requires_auth) {
        return true; // No auth required
    }

    const allowedRoles = pageConfig.allowed_roles;

    // If no specific roles defined, any authenticated user can access
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }

    // Check if user has at least one of the allowed roles
    return userRoles.some(role => allowedRoles.includes(role));
}

/**
 * Applies redirect rules configured in the site config
 */
export function applyRedirectRules(pathname: string) {
    if (!appConfig.redirectRules || appConfig.redirectRules.length === 0) {
        return null;
    }

    const matchingRule = appConfig.redirectRules.find(rule => {
        // Support exact match or wildcard patterns
        if (rule.from === pathname) {
            return true;
        }

        // Support wildcard redirect rules (e.g., /old-path/* -> /new-path/*)
        if (rule.from.endsWith('/*')) {
            const baseFrom = rule.from.slice(0, -2);
            return pathname.startsWith(baseFrom);
        }

        return false;
    });

    if (matchingRule) {
        let targetUrl = matchingRule.to;

        // Handle wildcard redirects
        if (matchingRule.from.endsWith('/*') && matchingRule.to.endsWith('/*')) {
            const baseFrom = matchingRule.from.slice(0, -2);
            const baseTo = matchingRule.to.slice(0, -2);
            const remainder = pathname.slice(baseFrom.length);
            targetUrl = baseTo + remainder;
        }

        return redirect(targetUrl, matchingRule.status || 301);
    }

    return null;
}
