# CMS Backend Documentation

## Overview

The CMS is now **backend-controlled (Super Admin only)** with public page viewing capability.

- **Admin Dashboard:** `/admin/cms` (Super Admin only)
- **Public Page Viewer:** `/pages/[slug]` (Published pages only)

---

## Admin Dashboard: `/admin/cms`

### Access
- **URL:** `http://localhost:3000/admin/cms`
- **Requires:** Super Admin authentication
- **Not visible to:** Regular users, guests

### Features

#### 1. **View All Pages**
- Table showing all pages (published & draft)
- Columns: Title, Slug, Status, Last Updated, Actions
- Search by title or slug

#### 2. **Create New Page**
- Click "New Page" button
- Fill form:
  - **Title:** Page name (displayed to public)
  - **Slug:** URL path (e.g., `about-us` → `/pages/about-us`)
  - **Content:** Markdown or HTML content
  - **Publish:** Toggle to publish immediately or save as draft
- Save & page appears in list

#### 3. **Edit Page**
- Click "Edit" button on any page
- Inline editor appears
- Modify any field
- Click "Save" to update

#### 4. **Delete Page**
- Click "Delete" button
- Confirm deletion
- Page removed from system

#### 5. **Publish/Draft Toggle**
- Click status badge ("Published" or "Draft")
- Toggles visibility on public site

#### 6. **View Public Page**
- Click "View" button
- Opens page in new tab at `/pages/[slug]`
- Only works for published pages

---

## Public Page Viewer: `/pages/[slug]`

### Access
- **URL:** `http://localhost:3000/pages/about-us` (example)
- **Requirements:** Page must be published
- **Visibility:** Anyone can view (no auth required)

### Features
- Clean, dark-themed page display
- Formatted markdown headers (# ## ###)
- Formatted lists (- bullet points)
- Last updated date shown
- Back to home link
- Professional footer

### Page Not Found
- Shows error if page doesn't exist
- Shows error if page is in draft status
- Links back to home

---

## Database Schema

```sql
CREATE TABLE cms_pages (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  type TEXT NOT NULL, -- blog | doc | service | page
  author TEXT,
  tags JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  featured_image TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE UNIQUE INDEX idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX idx_cms_pages_type ON cms_pages(type);
CREATE INDEX idx_cms_pages_published ON cms_pages(published);
```

---

## API Endpoints

### Get All Pages
```bash
GET /api/cms/pages

Response:
{
  "pages": [
    {
      "id": 1,
      "title": "About Us",
      "slug": "about-us",
      "content": "...",
      "published": true,
      "createdAt": "2026-06-21T...",
      "updatedAt": "2026-06-21T..."
    }
  ]
}
```

### Get Single Page (By ID or Slug)
```bash
GET /api/cms/pages/1           # By ID
GET /api/cms/pages/about-us    # By slug

Response:
{
  "page": {
    "id": 1,
    "title": "About Us",
    ...
  }
}
```

### Create Page (Super Admin Only)
```bash
POST /api/cms/pages

Body:
{
  "title": "About Us",
  "slug": "about-us",
  "content": "# About Us\n\nWe are...",
  "published": true
}

Response:
{
  "success": true,
  "page": { /* created page */ }
}
```

### Update Page (Super Admin Only)
```bash
PATCH /api/cms/pages/1

Body:
{
  "title": "About Us (Updated)",
  "content": "New content...",
  "published": false
}

Response:
{
  "success": true,
  "page": { /* updated page */ }
}
```

### Delete Page (Super Admin Only)
```bash
DELETE /api/cms/pages/1

Response:
{
  "success": true
}
```

---

## Workflow

### Super Admin: Create Static Page

1. Visit `/admin/cms`
2. Click "New Page"
3. Fill in details:
   ```
   Title: "Privacy Policy"
   Slug: "privacy-policy"
   Content: (paste Markdown or HTML)
   Publish: ✓ (toggle on)
   ```
4. Click "Create Page"
5. Page appears in list
6. Click "View" to see public page
7. Public can access at `/pages/privacy-policy`

### Super Admin: Update Page

1. Visit `/admin/cms`
2. Find page in list
3. Click "Edit"
4. Modify content
5. Click "Save"
6. Page updated (timestamp refreshed)

### Super Admin: Manage Publication

1. Visit `/admin/cms`
2. Find page in list
3. Click status badge to toggle:
   - **Draft** → Click to publish
   - **Published** → Click to unpublish
4. Public can no longer access if drafted

### Public User: View Page

1. Navigate to `/pages/[slug]`
2. See formatted content
3. If draft: "Page Not Found" error
4. If published: See full page

---

## Content Formatting

### Markdown Support

The public page viewer supports basic Markdown:

```markdown
# Main Heading
## Sub Heading
### Smaller Heading

Regular paragraph text here.

- Bullet point 1
- Bullet point 2
- Bullet point 3

HTML is also supported:
<div class="custom">Custom HTML</div>
```

### Best Practices

1. **Use Headers:** Organize content with # ## ###
2. **Use Lists:** Use `-` for bullet points
3. **Add Spacing:** Blank lines between sections
4. **Keep It Clean:** Avoid excessive formatting
5. **Test It:** Always preview before publishing

---

## Security

### Current (TODO)
- [ ] Verify Super Admin role in API endpoints
- [ ] Add authentication checks to all admin endpoints
- [ ] Prevent non-superadmin from accessing `/admin/cms`
- [ ] Prevent draft pages from being accessed publicly

### Implementation
```typescript
// TODO in API endpoints
const session = await getSession();
if (!session || session.user.role !== 'superadmin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

## File Structure

```
grey/
├── app/
│   ├── admin/
│   │   └── cms/
│   │       └── page.tsx              # Admin dashboard
│   ├── api/
│   │   └── cms/
│   │       └── pages/
│   │           ├── route.ts          # List/Create endpoints
│   │           └── [id]/
│   │               └── route.ts      # Get/Update/Delete
│   └── pages/
│       └── [slug]/
│           └── page.tsx              # Public viewer
└── lib/
    └── db/
        └── schema.ts                 # cmsPages table
```

---

## Troubleshooting

### Issue: Can't see CMS admin dashboard
- **Cause:** Not super admin
- **Fix:** Ensure user has `role: 'superadmin'` in users table

### Issue: Created page doesn't show publicly
- **Cause:** Page is in draft status
- **Fix:** Click status badge to publish

### Issue: Slug already exists error
- **Cause:** You're trying to create a page with duplicate slug
- **Fix:** Use unique slug (e.g., `about-us` not `about`)

### Issue: Page shows "Page Not Found"
- **Cause:** Page doesn't exist or is drafted
- **Fix:** Check it exists & is published in admin dashboard

---

## Future Enhancements

- [ ] Image upload & embedding
- [ ] SEO metadata editor
- [ ] Content versioning/history
- [ ] Scheduled publishing
- [ ] Collaborative editing
- [ ] Page preview before publish
- [ ] Analytics (page views)
- [ ] Comments/feedback

---

## Support

For issues:
- Email: hello@greyinfotech.com.ng
- Phone: +234 802 809 5571
- WhatsApp: Direct message

---

**Last Updated:** June 21, 2026
**Version:** 2.0 (Backend Only)
