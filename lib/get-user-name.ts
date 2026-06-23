/**
 * Auto-detect user name from browser API
 * Tries multiple sources: navigator.userAgent, Chrome user profile, localStorage fallback
 */

export function getAutoUserName(): string {
  // If running on server, return empty
  if (typeof window === 'undefined') {
    return '';
  }

  // Try to extract from navigator.userAgent profile name
  const userAgent = navigator.userAgent;
  
  // Some browsers expose user profile in userAgent
  // e.g., Chrome: "Mozilla/5.0 ... Chrome/... Chrome Profile Name"
  // This is limited and not always available
  
  // Try to get from browser storage if previously detected
  const storedName = localStorage.getItem('grey-auto-user-name');
  if (storedName) {
    return storedName;
  }

  // Try modern approach: Check for chrome://version equivalent
  // Unfortunately, most browsers don't expose user profile via JavaScript for security
  // Fallback: Use a generic greeting with timestamp
  
  // Extract any available identifier (browser, device info)
  let detectedName = '';
  
  // Try to detect browser type for a generic fallback name
  if (userAgent.includes('Edge')) {
    detectedName = 'Edge';
  } else if (userAgent.includes('Chrome')) {
    detectedName = 'Chrome';
  } else if (userAgent.includes('Firefox')) {
    detectedName = 'Firefox';
  } else if (userAgent.includes('Safari')) {
    detectedName = 'Safari';
  } else {
    detectedName = 'there';
  }

  // Cache it for consistency in the same session
  localStorage.setItem('grey-auto-user-name', detectedName);
  
  return detectedName;
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
