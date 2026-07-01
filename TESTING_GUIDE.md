# Complete Testing Guide: Job Openings & Bulk Delete

## Testing the Job Openings API

### Prerequisites
- Admin backend running (Express server on port from `.backend-port.json`)
- Admin session authenticated
- curl or Postman installed

### Step 1: Create a Job Opening

```bash
curl -X POST http://localhost:3000/api/job-openings \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -d '{
    "title": "Senior Backend Engineer",
    "department": "Engineering",
    "location": "Remote",
    "type": "full-time",
    "experience_level": "5+ years",
    "salary_range": "$150k - $200k",
    "description": "We are looking for a talented backend engineer...",
    "responsibilities": [
      "Design and develop backend APIs",
      "Maintain code quality and performance"
    ],
    "requirements": [
      "Node.js/TypeScript",
      "Experience with databases"
    ],
    "nice_to_have": [
      "Docker experience",
      "GraphQL knowledge"
    ],
    "benefits": [
      "Remote work",
      "Health insurance",
      "Professional development"
    ],
    "status": "draft"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Job opening created",
  "data": {
    "id": 1
  }
}
```

### Step 2: List All Job Openings

```bash
curl http://localhost:3000/api/job-openings \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "OK",
  "data": [
    {
      "id": 1,
      "title": "Senior Backend Engineer",
      "status": "draft",
      ...
    }
  ]
}
```

### Step 3: Update a Job Opening

```bash
curl -X PUT http://localhost:3000/api/job-openings/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -d '{
    "status": "published"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Updated",
  "data": null
}
```

### Step 4: Delete a Single Job Opening

```bash
curl -X DELETE http://localhost:3000/api/job-openings/1 \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Job opening deleted successfully",
  "data": {
    "id": 1,
    "deleted": true
  }
}
```

### Step 5: Bulk Create Job Openings (for bulk delete testing)

Create 5 job openings first:

```bash
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/job-openings \
    -H "Content-Type: application/json" \
    -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
    -d "{
      \"title\": \"Job Opening $i\",
      \"status\": \"draft\"
    }"
done
```

### Step 6: Bulk Delete Job Openings

```bash
curl -X POST http://localhost:3000/api/job-openings/bulk-delete \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -d '{
    "ids": [1, 2, 3, 4, 5]
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Deleted 5 job opening(s)",
  "data": {
    "deleted": 5,
    "total": 5,
    "failed": 0
  }
}
```

## Testing Career Applications

### Create a Career Application

The frontend does this via `/api/career-apply` (public endpoint). Then test deletion:

```bash
# List applications
curl http://localhost:3000/api/career-applications \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Delete single
curl -X DELETE http://localhost:3000/api/career-applications/1 \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Bulk delete
curl -X POST http://localhost:3000/api/career-applications/bulk-delete \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

## Testing Submissions

```bash
# List submissions
curl http://localhost:3000/api/submissions \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Delete single
curl -X DELETE http://localhost:3000/api/submissions/1 \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"

# Bulk delete
curl -X POST http://localhost:3000/api/submissions/bulk-delete \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE" \
  -d '{
    "ids": [1, 2, 3]
  }'
```

## Troubleshooting

### Issue: "Session not found" or 401 error

**Solution**: Make sure you're logged into the admin panel first, then copy your `connect.sid` cookie from browser DevTools.

### Issue: "No valid IDs provided"

**Solution**: Ensure IDs in your request are integers, e.g., `[1, 2, 3]` not `["1", "2", "3"]`

### Issue: Partial deletion (some failed)

**Expected behavior** - The response will show:
```json
{
  "data": {
    "deleted": 3,
    "total": 5,
    "failed": 2
  }
}
```

This means 2 IDs were not found, but 3 were successfully deleted.

### Issue: "Bad response" from frontend

**Possible causes:**
1. Response format incorrect
2. Missing authentication header/cookie
3. Server error (check server logs)
4. Frontend is calling wrong endpoint

**Debug steps:**
```bash
# Check if API is responding
curl -v http://localhost:3000/api/job-openings

# Check response headers and body
curl -i http://localhost:3000/api/job-openings
```

## Testing with Postman

1. Create a new request
2. Set method to POST, URL to `http://localhost:3000/api/job-openings`
3. Go to "Headers" tab, add cookie: `connect.sid=YOUR_SESSION_ID`
4. Go to "Body" tab, select "raw" and "JSON"
5. Paste your JSON payload
6. Click "Send"

## Activity Logging

All deletions are logged. View the activity log:

```bash
curl http://localhost:3000/api/admin/activity \
  -H "Cookie: connect.sid=YOUR_SESSION_COOKIE"
```

You should see entries like:
```
- delete | job_opening | id: 1
- delete | career_application | id: 5
- delete | submission | id: 3
```

## Performance Notes

- Bulk delete is faster than individual deletes for multiple items
- For deleting 100+ items, consider implementing batch processing
- Activity logging adds minimal overhead (<1ms per delete)

## Security Considerations

✅ All endpoints require authentication via `ensureApiAuth` middleware
✅ All deletions are logged for audit trail
✅ Input validation prevents SQL injection
✅ ID validation ensures only positive integers are processed
