/**
 * Bulk Delete Utility for Admin Panel
 * Provides reusable functions for multi-select delete operations
 */

export interface BulkDeleteResponse {
  ok: boolean;
  message: string;
  data?: {
    deleted: number;
    total: number;
    failed: number;
  };
}

export interface BulkDeleteResult {
  success: boolean;
  message: string;
  deleted: number;
  total: number;
  failed: number;
}

/**
 * Delete a single item
 * @param endpoint - API endpoint (e.g., '/api/job-openings')
 * @param id - Item ID to delete
 * @returns Result of deletion
 */
export async function deleteSingleItem(
  endpoint: string,
  id: number | string
): Promise<BulkDeleteResult> {
  try {
    const response = await fetch(`${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const result: BulkDeleteResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to delete item',
        deleted: 0,
        total: 1,
        failed: 1,
      };
    }

    return {
      success: true,
      message: result.message || 'Deleted successfully',
      deleted: 1,
      total: 1,
      failed: 0,
    };
  } catch (error) {
    console.error(`[deleteSingleItem] Error:`, error);
    return {
      success: false,
      message: 'Network error - failed to delete item',
      deleted: 0,
      total: 1,
      failed: 1,
    };
  }
}

/**
 * Delete multiple items at once
 * @param endpoint - API endpoint (e.g., '/api/job-openings')
 * @param ids - Array of item IDs to delete
 * @returns Result of bulk deletion
 */
export async function bulkDeleteItems(
  endpoint: string,
  ids: (number | string)[]
): Promise<BulkDeleteResult> {
  if (!Array.isArray(ids) || ids.length === 0) {
    return {
      success: false,
      message: 'No items selected for deletion',
      deleted: 0,
      total: 0,
      failed: 0,
    };
  }

  try {
    const response = await fetch(`${endpoint}/bulk-delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });

    const result: BulkDeleteResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to delete items',
        deleted: result.data?.deleted ?? 0,
        total: result.data?.total ?? ids.length,
        failed: result.data?.failed ?? ids.length,
      };
    }

    return {
      success: true,
      message: result.message || `Deleted ${result.data?.deleted ?? 0} item(s)`,
      deleted: result.data?.deleted ?? 0,
      total: result.data?.total ?? ids.length,
      failed: result.data?.failed ?? 0,
    };
  } catch (error) {
    console.error(`[bulkDeleteItems] Error:`, error);
    return {
      success: false,
      message: 'Network error - failed to delete items',
      deleted: 0,
      total: ids.length,
      failed: ids.length,
    };
  }
}

/**
 * Prompt user for deletion confirmation
 * @param itemCount - Number of items to delete
 * @param itemName - Name of the item type (e.g., 'job opening')
 * @returns true if user confirmed, false otherwise
 */
export function confirmBulkDelete(itemCount: number, itemName: string = 'item'): boolean {
  const plural = itemCount === 1 ? itemName : `${itemName}s`;
  return confirm(
    `Are you sure you want to delete ${itemCount} ${plural}? This action cannot be undone.`
  );
}

/**
 * Format bulk delete result into a user-friendly message
 * @param result - The result from bulkDeleteItems or deleteSingleItem
 * @returns Formatted message string
 */
export function formatDeleteMessage(result: BulkDeleteResult): string {
  if (result.success) {
    if (result.failed > 0) {
      return `✓ Deleted ${result.deleted} out of ${result.total} items. ${result.failed} failed.`;
    }
    return `✓ Successfully deleted ${result.deleted} item(s).`;
  }

  if (result.total === 0) {
    return '⚠ No items selected for deletion.';
  }

  if (result.deleted > 0) {
    return `⚠ Deleted ${result.deleted} out of ${result.total} items. ${result.failed} failed.`;
  }

  return `✗ ${result.message}`;
}

/**
 * Handle delete operation with confirmation, deletion, and notification
 * @param endpoint - API endpoint
 * @param ids - Item IDs to delete
 * @param itemName - Name of item type for confirmation
 * @param onSuccess - Callback after successful deletion
 * @param onError - Callback for error handling
 */
export async function handleBulkDelete(
  endpoint: string,
  ids: (number | string)[],
  itemName: string = 'item',
  onSuccess?: (result: BulkDeleteResult) => void,
  onError?: (result: BulkDeleteResult) => void
): Promise<BulkDeleteResult> {
  // Confirm deletion
  if (!confirmBulkDelete(ids.length, itemName)) {
    return {
      success: false,
      message: 'Deletion cancelled',
      deleted: 0,
      total: ids.length,
      failed: 0,
    };
  }

  // Perform deletion
  const result = ids.length === 1
    ? await deleteSingleItem(endpoint, ids[0])
    : await bulkDeleteItems(endpoint, ids);

  // Handle success/error callbacks
  if (result.success) {
    onSuccess?.(result);
  } else {
    onError?.(result);
  }

  return result;
}

/**
 * Create a selection manager for multi-select UI
 */
export class SelectionManager {
  private selectedIds: Set<number | string> = new Set();

  get ids(): (number | string)[] {
    return Array.from(this.selectedIds);
  }

  get count(): number {
    return this.selectedIds.size;
  }

  toggle(id: number | string): boolean {
    if (this.selectedIds.has(id)) {
      this.selectedIds.delete(id);
      return false;
    } else {
      this.selectedIds.add(id);
      return true;
    }
  }

  select(id: number | string): void {
    this.selectedIds.add(id);
  }

  deselect(id: number | string): void {
    this.selectedIds.delete(id);
  }

  isSelected(id: number | string): boolean {
    return this.selectedIds.has(id);
  }

  selectAll(ids: (number | string)[]): void {
    ids.forEach(id => this.selectedIds.add(id));
  }

  deselectAll(): void {
    this.selectedIds.clear();
  }

  clear(): void {
    this.selectedIds.clear();
  }
}
