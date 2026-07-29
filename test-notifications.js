#!/usr/bin/env node

/**
 * Notification System Test Suite
 * Tests all notification endpoints to ensure the system works correctly
 */

const BASE_URL = 'http://localhost:3000';
const ADMIN_SECRET = process.env.ADMIN_API_SECRET || 'default-secret-key';

async function test(name, fn) {
  try {
    console.log(`\n📋 Testing: ${name}`);
    await fn();
    console.log(`✅ PASS: ${name}`);
    return true;
  } catch (error) {
    console.error(`❌ FAIL: ${name}`);
    console.error(`   Error: ${error.message}`);
    return false;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function publicApiCall(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status}: ${data.message || 'Unknown error'}`);
  }

  return data;
}

async function adminApiCall(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-secret': ADMIN_SECRET,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${response.status}: ${data.message || 'Unknown error'}`);
  }

  return data;
}

async function runTests() {
  console.log('🚀 Starting Notification System Tests\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Testing Frontend API: /api/notifications\n`);

  let passed = 0;
  let failed = 0;

  // Test 1: Create a notification via /notify-submission (admin endpoint)
  if (await test('Create notification for form submission', async () => {
    const response = await adminApiCall('POST', '/admin/api/notify-submission', {
      action: 'create',
      type: 'submission',
      id: Date.now(),
      name: 'Test User',
      email: 'test@example.com',
    });
    if (!response.ok) {
      throw new Error('Failed to create notification');
    }
  })) {
    passed++;
  } else {
    failed++;
  }

  await sleep(500);

  // Test 2: Get all notifications via frontend API
  let notificationId = null;
  if (await test('Retrieve notifications via frontend API', async () => {
    const response = await publicApiCall('GET', '/api/notifications');
    if (!response.ok || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    if (response.data.length === 0) {
      throw new Error('No notifications found - creation may have failed');
    }
    notificationId = response.data[0].id;
    console.log(`   Found ${response.data.length} notifications`);
    console.log(`   First notification ID: ${notificationId}`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 3: Get notifications with status filter
  if (await test('Filter notifications by status', async () => {
    const response = await publicApiCall('GET', '/api/notifications?status=unread');
    if (!response.ok || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    console.log(`   Found ${response.data.length} unread notifications`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 4: Get notifications with pagination
  if (await test('Retrieve notifications with pagination', async () => {
    const response = await publicApiCall('GET', '/api/notifications?limit=5&offset=0');
    if (!response.ok || !Array.isArray(response.data)) {
      throw new Error('Invalid response format');
    }
    if (!response.pagination) {
      throw new Error('Missing pagination info');
    }
    console.log(`   Total: ${response.pagination.total}, Has more: ${response.pagination.hasMore}`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 5: Update notification status
  if (notificationId && await test('Mark notification as read', async () => {
    const response = await publicApiCall('PATCH', `/api/notifications?id=${notificationId}`, {
      status: 'read',
    });
    if (!response.ok || response.data.status !== 'read') {
      throw new Error('Status was not updated to read');
    }
    console.log(`   Notification ${notificationId} marked as read`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 6: Mark as unread
  if (notificationId && await test('Mark notification as unread', async () => {
    const response = await publicApiCall('PATCH', `/api/notifications?id=${notificationId}`, {
      status: 'unread',
    });
    if (!response.ok || response.data.status !== 'unread') {
      throw new Error('Status was not updated to unread');
    }
    console.log(`   Notification ${notificationId} marked as unread`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 7: Create multiple notifications for bulk test
  let bulkIds = [];
  if (await test('Create multiple notifications', async () => {
    for (let i = 0; i < 3; i++) {
      await adminApiCall('POST', '/admin/api/notify-submission', {
        action: 'create',
        type: i === 0 ? 'submission' : i === 1 ? 'application' : 'subscription',
        id: Date.now() + i,
        name: `Bulk Test ${i}`,
        email: `bulk${i}@example.com`,
      });
      await sleep(100);
    }
    console.log(`   Created 3 notifications`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 8: Retrieve the bulk notifications
  if (await test('Retrieve all notifications for bulk operations', async () => {
    const response = await publicApiCall('GET', '/api/notifications?limit=50');
    bulkIds = response.data.slice(0, 4).map(n => n.id);
    if (bulkIds.length < 4) {
      throw new Error(`Expected at least 4 notifications, got ${bulkIds.length}`);
    }
    console.log(`   Retrieved ${bulkIds.length} notifications for testing`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 9: Delete a single notification
  if (bulkIds.length > 0 && await test('Delete a single notification', async () => {
    const idToDelete = bulkIds[0];
    const response = await publicApiCall('DELETE', `/api/notifications?id=${idToDelete}`);
    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }
    console.log(`   Deleted notification ${idToDelete}`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 10: Verify notification was deleted
  if (bulkIds.length > 0 && await test('Verify notification was deleted', async () => {
    const response = await publicApiCall('GET', '/api/notifications');
    const stillExists = response.data.some(n => n.id === bulkIds[0]);
    if (stillExists) {
      throw new Error('Notification was not actually deleted');
    }
    console.log(`   Confirmed notification ${bulkIds[0]} no longer exists`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 11: Test various notification types
  if (await test('Verify different notification types', async () => {
    const response = await publicApiCall('GET', '/api/notifications?limit=50');
    const types = new Set(response.data.map(n => n.type));
    console.log(`   Found notification types: ${Array.from(types).join(', ')}`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Test 12: Response structure validation
  if (await test('Validate response structure', async () => {
    const response = await publicApiCall('GET', '/api/notifications?limit=1');
    if (!response.data || !response.pagination || !response.ok) {
      throw new Error('Missing required response fields');
    }
    const notif = response.data[0];
    const requiredFields = ['id', 'type', 'title', 'message', 'status', 'created_at'];
    for (const field of requiredFields) {
      if (!(field in notif)) {
        throw new Error(`Missing field: ${field}`);
      }
    }
    console.log(`   Response has all required fields`);
  })) {
    passed++;
  } else {
    failed++;
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Test Summary`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📊 Total:  ${passed + failed}`);
  console.log(`\n${failed === 0 ? '✅ All tests passed! Notification system is working correctly.' : '⚠️  Some tests failed. See details above.'}\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
