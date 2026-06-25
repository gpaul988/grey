/**
 * Auto-detect user name from browser API
 * Returns empty string — browser-based detection is unreliable and produces poor UX
 * (e.g., returning "Chrome" as the user's name). Greeting renders cleanly without a name.
 */

export function getAutoUserName(): string {
  // Clear any stale cached browser-name values from previous builds
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('grey-auto-user-name');
    // Remove legacy browser-name entries (Chrome, Firefox, Safari, Edge, there)
    const browserNames = ['Chrome', 'Firefox', 'Safari', 'Edge', 'there'];
    if (stored && browserNames.includes(stored)) {
      localStorage.removeItem('grey-auto-user-name');
    } else if (stored) {
      // User explicitly set their name — honour it
      return stored;
    }
  }

  // Return empty: greeting will render as "Good morning, working early" (no name appended)
  return '';
}

/**
 * Alternative: Try to get name from browser's Credential Management API
 * This requires user permission and might return password manager data
 */
export async function getNameFromCredentialAPI(): Promise<string> {
  if (typeof window === 'undefined' || !('credentials' in navigator)) {
    return '';
  }

  try {
    // This will prompt user to select a credential/profile
    // Not ideal for auto-detection, but available as fallback
    // Commenting out as it requires user interaction
    // const credential = await navigator.credentials.get({ 
    //   password: true, 
    //   mediation: 'optional' 
    // });
    // if (credential && 'id' in credential) {
    //   return credential.id as string;
    // }
  } catch (error) {
    console.warn('Could not access credentials:', error);
  }

  return '';
}
