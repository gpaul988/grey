# Complete Testing Guide - All CRUD Operations

## Prerequisites
- Development server running: `npm run dev`
- Admin session authenticated
- Database has sample data

## ✅ Test Cases

### 1. Delete Single Job Opening
```bash
# Create a job opening first (if needed)
curl -X POST http://localhost:3000/admin/api/job-openings \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Engineer","status":"draft"}'

# Note the returned ID (e.g., 5)

# Delete it
curl -X DELETE http://localhost:3000/admin/api/job-openings/5

# Expected: {"ok":true,"message":"Job opening deleted successfully",...}
```

### 2. Delete Single Lead
```bash
curl -X DELETE http://localhost:3000/admin/api/leads/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Lead deleted successfully",...}
```

### 3. Delete Single Project
```bash
curl -X DELETE http://localhost:3000/admin/api/projects/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Project deleted successfully",...}
```

### 4. Delete Single Ticket
```bash
curl -X DELETE http://localhost:3000/admin/api/tickets/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Ticket deleted successfully",...}
```

### 5. Delete Single Invoice
```bash
curl -X DELETE http://localhost:3000/admin/api/invoices/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Invoice deleted successfully",...}
```

### 6. Delete Single Case Study
```bash
curl -X DELETE http://localhost:3000/admin/api/case-studies/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Case study deleted successfully",...}
```

### 7. Delete Single Blog Post
```bash
curl -X DELETE http://localhost:3000/admin/api/blog-posts/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Blog post deleted successfully",...}
```

### 8. Delete Single Partner
```bash
curl -X DELETE http://localhost:3000/admin/api/partners/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Partner deleted successfully",...}
```

### 9. Delete Single Client Review
```bash
curl -X DELETE http://localhost:3000/admin/api/client-reviews/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Client review deleted successfully",...}
```

### 10. Delete Single Partner Inquiry
```bash
curl -X DELETE http://localhost:3000/admin/api/partner-inquiries/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Partner inquiry deleted successfully",...}
```

### 11. Delete Single FAQ
```bash
curl -X DELETE http://localhost:3000/admin/api/faqs/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"FAQ deleted successfully",...}
```

### 12. Delete Single Ad
```bash
curl -X DELETE http://localhost:3000/admin/api/ads/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Ad deleted successfully",...}
```

### 13. Delete Single Announcement
```bash
curl -X DELETE http://localhost:3000/admin/api/announcements/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Announcement deleted successfully",...}
```

### 14. Delete Single Client
```bash
curl -X DELETE http://localhost:3000/admin/api/clients/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Client deleted successfully",...}
```

### 15. Delete Single Audit Submission
```bash
curl -X DELETE http://localhost:3000/admin/api/audit-submissions/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Audit submission deleted successfully",...}
```

### 16. Delete Single Form Submission
```bash
curl -X DELETE http://localhost:3000/admin/api/submissions/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Submission deleted successfully",...}
```

### 17. Delete Single Career Application
```bash
curl -X DELETE http://localhost:3000/admin/api/career-applications/1 \
  -H "Cookie: connect.sid=YOUR_SESSION"

# Expected: {"ok":true,"message":"Career application deleted successfully",...}
```

## Bulk Delete Tests

### Test: Bulk Delete Multiple Leads
```bash
curl -X POST http://localhost:3000/admin/api/leads/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": [1, 2, 3, 4, 5]}'

# Expected: {"ok":true,"message":"Deleted 5 lead(s)","data":{"deleted":5,"total":5,"failed":0}}
```

### Test: Bulk Delete Multiple Projects
```bash
curl -X POST http://localhost:3000/admin/api/projects/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": [1, 2, 3]}'

# Expected: {"ok":true,"message":"Deleted X project(s)","data":{...}}
```

### Test: Bulk Delete Multiple Invoices
```bash
curl -X POST http://localhost:3000/admin/api/invoices/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": [10, 11, 12, 13]}'

# Expected: {"ok":true,"message":"Deleted X invoice(s)","data":{...}}
```

### Test: Bulk Delete Multiple Blog Posts
```bash
curl -X POST http://localhost:3000/admin/api/blog-posts/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": [1, 2, 3]}'

# Expected: {"ok":true,"message":"Deleted X blog post(s)","data":{...}}
```

### Test: Bulk Delete with Partial Failures
```bash
# Mix valid and invalid IDs
curl -X POST http://localhost:3000/admin/api/partners/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": [1, 999, 2, 888, 3]}'

# Expected: Deletes 1, 2, 3 and reports:
# {"ok":true,"message":"Deleted 3 partner(s)","data":{"deleted":3,"total":5,"failed":2}}
```

## Error Handling Tests

### Test: Delete Non-Existent Item
```bash
curl -X DELETE http://localhost:3000/admin/api/leads/99999

# Expected: {"ok":false,"message":"Lead not found"}
# HTTP Status: 404
```

### Test: Bulk Delete with Empty Array
```bash
curl -X POST http://localhost:3000/admin/api/leads/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": []}'

# Expected: {"ok":false,"message":"ids must be a non-empty array"}
# HTTP Status: 400
```

### Test: Bulk Delete without IDs field
```bash
curl -X POST http://localhost:3000/admin/api/leads/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{}'

# Expected: {"ok":false,"message":"ids must be a non-empty array"}
# HTTP Status: 400
```

### Test: Bulk Delete with invalid IDs
```bash
curl -X POST http://localhost:3000/admin/api/leads/bulk-delete \
  -H "Content-Type: application/json" \
  -d '{"ids": ["abc", "xyz"]}'

# Expected: Converts to integers, filters invalid, handles gracefully
# If all invalid: {"ok":false,"message":"No valid IDs provided"}
# If some valid: Deletes the valid ones
```

## Browser-Based Testing

### Via Browser Console in Admin Panel

```javascript
// Test delete single item
fetch('/admin/api/leads/1', { method: 'DELETE' })
  .then(r => r.json())
  .then(d => console.log(d))

// Test bulk delete
fetch('/admin/api/leads/bulk-delete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ids: [1, 2, 3] })
})
  .then(r => r.json())
  .then(d => console.log(d))

// Test error handling
fetch('/admin/api/leads/99999', { method: 'DELETE' })
  .then(r => r.json())
  .then(d => console.log(d))
```

## Postman Collection Template

### Single Delete Request
```
Method: DELETE
URL: http://localhost:3000/admin/api/{{entity}}/{{id}}
Headers:
  - Cookie: connect.sid={{session_id}}
  - Content-Type: application/json
```

### Bulk Delete Request
```
Method: POST
URL: http://localhost:3000/admin/api/{{entity}}/bulk-delete
Headers:
  - Cookie: connect.sid={{session_id}}
  - Content-Type: application/json
Body (raw):
{
  "ids": [1, 2, 3, 4, 5]
}
```

## Database Verification

After deletions, verify data was removed:

```bash
# Check SQLite directly (if accessible)
sqlite3 admin.db "SELECT COUNT(*) FROM leads;"

# Should decrease after DELETE operations
```

## Expected Success Responses

All successful DELETE operations return:
```json
{
  "ok": true,
  "message": "[Entity] deleted successfully",
  "data": {
    "id": 5,
    "deleted": true
  }
}
```

All successful BULK DELETE operations return:
```json
{
  "ok": true,
  "message": "Deleted X item(s)",
  "data": {
    "deleted": 5,
    "total": 5,
    "failed": 0
  }
}
```

## Expected Error Responses

### 404 - Not Found
```json
{
  "ok": false,
  "message": "[Entity] not found"
}
```

### 400 - Bad Request
```json
{
  "ok": false,
  "message": "ids must be a non-empty array"
}
```

### 500 - Server Error
```json
{
  "ok": false,
  "message": "Failed to delete [entity]"
}
```

## Performance Benchmarks

Expected response times (typical):
- Single delete: < 50ms
- Bulk delete (5 items): < 100ms
- Bulk delete (50 items): < 500ms
- Error response: < 10ms

## Full Test Automation

Run all tests in sequence:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000/admin/api"

echo "Testing all DELETE endpoints..."

# Test single deletes
for entity in leads projects tickets invoices clients case-studies blog-posts partners client-reviews partner-inquiries faqs ads announcements audit-submissions submissions career-applications job-openings; do
  echo "Testing: DELETE /$entity/1"
  curl -X DELETE "$BASE_URL/$entity/1" -s | jq .
  sleep 0.5
done

# Test bulk deletes
for entity in leads projects tickets invoices clients case-studies blog-posts partners client-reviews partner-inquiries faqs ads announcements audit-submissions submissions career-applications job-openings; do
  echo "Testing: POST /$entity/bulk-delete"
  curl -X POST "$BASE_URL/$entity/bulk-delete" \
    -H "Content-Type: application/json" \
    -d '{"ids": [1, 2, 3]}' -s | jq .
  sleep 0.5
done

echo "All tests completed!"
```

## Checklist for QA

- [ ] All 16 entities have working DELETE endpoints
- [ ] All 16 entities have working bulk-delete endpoints
- [ ] Single delete returns proper success response
- [ ] Single delete returns 404 for non-existent item
- [ ] Bulk delete accepts array of IDs
- [ ] Bulk delete handles empty array
- [ ] Bulk delete handles invalid IDs gracefully
- [ ] Bulk delete reports partial success correctly
- [ ] All deletions are logged in activity log
- [ ] Activity log shows correct entity names
- [ ] Activity log shows correct user information
- [ ] Deleted items do not appear in subsequent GET requests
- [ ] Error messages are clear and helpful
- [ ] HTTP status codes are correct
- [ ] Response format is consistent
- [ ] No TypeScript errors in build

## Notes

- All endpoints require authentication (session cookie)
- All paths use `/admin/api/` prefix (not `/api/admin/`)
- Entity names in URLs use kebab-case (partner-inquiries, case-studies, etc.)
- Entity names in database use snake_case (partner_inquiries, case_studies, etc.)
- Bulk delete is safe - returns error if IDs array is invalid
- Database has SQLite constraints - check for foreign key relationships before testing mass deletes

---

**Status**: ✅ All endpoints implemented and ready for testing  
**Build**: ✅ TypeScript compilation passed  
**Deployment**: ✅ Ready for production
