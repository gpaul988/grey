# Bulk Delete API Documentation

## Overview
The bulk delete endpoints allow you to delete multiple records at once, which is essential for the admin panel to support multi-select deletion.

## Endpoints

### Job Openings

#### Single Delete
```bash
DELETE /api/job-openings/:id
```
**Response:**
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

#### Bulk Delete
```bash
POST /api/job-openings/bulk-delete
Content-Type: application/json

{
  "ids": [1, 2, 3, 4, 5]
}
```
**Response:**
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

### Career Applications

#### Single Delete
```bash
DELETE /api/career-applications/:id
```
**Response:**
```json
{
  "ok": true,
  "message": "Career application deleted successfully",
  "data": {
    "id": 1,
    "deleted": true
  }
}
```

#### Bulk Delete
```bash
POST /api/career-applications/bulk-delete
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```
**Response:**
```json
{
  "ok": true,
  "message": "Deleted 3 career application(s)",
  "data": {
    "deleted": 3,
    "total": 3,
    "failed": 0
  }
}
```

### Submissions

#### Single Delete
```bash
DELETE /api/submissions/:id
```
**Response:**
```json
{
  "ok": true,
  "message": "Submission deleted successfully",
  "data": {
    "id": 1,
    "deleted": true
  }
}
```

#### Bulk Delete
```bash
POST /api/submissions/bulk-delete
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```
**Response:**
```json
{
  "ok": true,
  "message": "Deleted 3 submission(s)",
  "data": {
    "deleted": 3,
    "total": 3,
    "failed": 0
  }
}
```

## Error Responses

### Missing IDs
```json
{
  "ok": false,
  "message": "ids must be a non-empty array"
}
```
Status: 400

### Invalid IDs
```json
{
  "ok": false,
  "message": "No valid IDs provided"
}
```
Status: 400

### Server Error
```json
{
  "ok": false,
  "message": "Failed to delete [entity]"
}
```
Status: 500

## Frontend Implementation

### Example: React Component with Multi-Select Delete

```tsx
const [selectedIds, setSelectedIds] = useState<number[]>([]);
const [loading, setLoading] = useState(false);

const handleSelectChange = (id: number, checked: boolean) => {
  if (checked) {
    setSelectedIds(prev => [...prev, id]);
  } else {
    setSelectedIds(prev => prev.filter(i => i !== id));
  }
};

const handleBulkDelete = async () => {
  if (selectedIds.length === 0) {
    alert('Please select items to delete');
    return;
  }

  if (!confirm(`Delete ${selectedIds.length} item(s)?`)) return;

  setLoading(true);
  try {
    const response = await fetch('/api/job-openings/bulk-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds }),
    });

    const result = await response.json();

    if (result.ok) {
      alert(`Successfully deleted ${result.data.deleted} item(s)`);
      setSelectedIds([]);
      // Refresh the list
      await fetchData();
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    alert('Failed to delete items');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// In your JSX:
return (
  <div>
    {items.map(item => (
      <div key={item.id}>
        <input
          type="checkbox"
          checked={selectedIds.includes(item.id)}
          onChange={(e) => handleSelectChange(item.id, e.target.checked)}
        />
        <span>{item.title}</span>
      </div>
    ))}
    <button 
      onClick={handleBulkDelete} 
      disabled={selectedIds.length === 0 || loading}
    >
      Delete Selected ({selectedIds.length})
    </button>
  </div>
);
```

## Features

✅ **Error Handling**: Proper HTTP status codes and error messages
✅ **Validation**: Validates IDs are numeric and non-zero
✅ **Partial Success**: If some IDs fail, others still get deleted with reporting
✅ **Logging**: All deletions are logged in the activity log
✅ **Consistency**: Standard response format across all endpoints

## Usage Flow

1. User selects items using checkboxes in the admin panel
2. User clicks "Delete Selected" button
3. Frontend sends POST to `/api/{entity}/bulk-delete` with array of IDs
4. Backend validates and deletes each item
5. Backend returns { deleted: N, total: N, failed: N }
6. Frontend shows success/failure message
7. Frontend refreshes the list

## Notes

- All deletions are immediately committed to the database
- Activity log entries are created for audit trail
- No soft-delete or recovery - this is permanent deletion
- Ensure proper authentication before exposing these endpoints
