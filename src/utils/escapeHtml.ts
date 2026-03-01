/**
 * Escape HTML to prevent XSS when inserting API/user data into innerHTML.
 * Use this for any dynamic string that is rendered with innerHTML.
 */
export function escapeHtml(unsafe: string): string {
  if (unsafe == null || typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
