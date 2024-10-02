export default function getCookie(name: string): string | undefined {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
    // Return undefined or handle the case where the cookie isn't found more gracefully
    return undefined;
}