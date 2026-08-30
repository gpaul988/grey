# Grey AI & Tawk.to Setup Guide

## Overview
Grey AI is a professional customer care assistant powered by your knowledge base (with optional LLM enhancement). Tawk.to provides live human chat. Both run side-by-side on the home page.

---

## 1. Tawk.to Setup (Live Chat Widget)

### Get Your Credentials
1. Go to [Tawk.to](https://www.tawk.to) and create/log into your account
2. Create a new Property (or use existing)
3. In Dashboard → **Settings** → **Get Code**, you'll see:
   ```html
   <script async src="https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID"></script>
   ```
4. Extract:
   - **PROPERTY_ID**: The long alphanumeric string (e.g., `1234567890abcdef`)
   - **WIDGET_ID**: Usually `default` unless you created custom widgets

### Enable in Local Dev
Add to `.env.local`:
```
NEXT_PUBLIC_TAWK_PROPERTY_ID=YOUR_PROPERTY_ID
NEXT_PUBLIC_TAWK_WIDGET_ID=YOUR_WIDGET_ID
```

### Verify
- Restart dev server (`npm run dev`)
- Go to `http://localhost:3000`
- **Bottom-right**: Tawk widget should appear (blue chat button)
- If missing: Check console for warnings; confirm env vars are set

---

## 2. Grey AI Setup (Knowledge Bot)

Grey AI works in two modes:

### Mode A: Local Lexical (No API Key Required)
- Uses keyword matching against knowledge base
- Fast, free, no external dependencies
- **Good for**: MVP, local dev, low-cost production

**No additional setup needed.** Just add questions to the knowledge base in `/lib/aiKnowledge.ts`.

### Mode B: LLM-Powered (OpenAI or Compatible)
- Uses GPT-4o mini (or custom model) with RAG
- Generates natural, conversational responses
- Can be configured for Azure OpenAI, Together.ai, etc.
- **Good for**: High-quality, nuanced customer interactions

#### Enable LLM Mode
Add to `.env.local`:
```
OPENAI_API_KEY=sk_test_YOUR_KEY_HERE
# Optional:
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

If using **Azure OpenAI**:
```
OPENAI_API_KEY=your_key
OPENAI_BASE_URL=https://YOUR_RESOURCE.openai.azure.com/
OPENAI_MODEL=YOUR_DEPLOYMENT_NAME
```

#### Verify
- Restart dev server
- Bottom-left: Grey AI button (teal with bot icon) should appear
- Click and ask: **"What services do you offer?"**
- Should see detailed response citing sources

---

## 3. Enhancing the Knowledge Base

Grey AI learns from `/lib/aiKnowledge.ts`. Every doc should have:
- **title**: Short identifier
- **url**: Link to relevant page
- **body**: Plain text explanation (100-300 words)
- **tags**: Keywords for retrieval (synonyms, related terms)

### Add a New Doc
```typescript
{
    title: 'Custom Feature Name',
    url: '/services/feature',
    body: 'Detailed explanation of what this feature does, how it works, typical use cases...',
    tags: ['feature', 'synonym1', 'synonym2', 'related-concept'],
},
```

### Update Existing Docs
Find the doc in the KB array and update `body` or `tags`. Changes take effect on next restart.

---

## 4. Optional: Web Enrichment (Google Custom Search)

To allow Grey AI to cite external sources (industry trends, best practices, comparisons):

### Setup Google Custom Search
1. Go to [Google Custom Search Engine](https://cse.google.com)
2. Create a new search engine (index your domain + industry sites)
3. Get your **Engine ID** (cx)
4. Create a service account API key at [Google Cloud Console](https://console.cloud.google.com)

### Enable in .env.local
```
SEARCH_API_KEY=YOUR_GOOGLE_API_KEY
SEARCH_ENGINE_ID=YOUR_ENGINE_ID
```

### What It Does
When a user asks about trends or comparisons (e.g., "latest React patterns"), Grey AI will:
- Search the web for recent articles
- Include snippets in the response
- Cite sources users can click
- **Only when KB doesn't have a clear answer**

---

## 5. Production Deployment

### On cPanel
1. Add secrets to **Environment Variables**:
   - `NEXT_PUBLIC_TAWK_PROPERTY_ID`
   - `NEXT_PUBLIC_TAWK_WIDGET_ID`
   - `OPENAI_API_KEY` (if using LLM)
   - `SEARCH_API_KEY` (if using web enrichment)

2. **Do NOT include** in git/version control (they're in `.env.local` which is `.gitignored`)

3. Restart application via cPanel dashboard

### Test
- Visit live site
- Bottom-right: Tawk widget should appear
- Bottom-left: Grey AI should respond to questions
- Check browser console for warnings

---

## 6. Monitoring & Troubleshooting

### Grey AI Not Responding
**Check:**
- Is OPENAI_API_KEY set? (If not, falls back to lexical—still works)
- Are there docs matching the question? (Add more to KB if not)
- Browser console for JS errors

### Tawk Widget Not Appearing
**Check:**
- `NEXT_PUBLIC_TAWK_PROPERTY_ID` and `NEXT_PUBLIC_TAWK_WIDGET_ID` set?
- Restart dev server after adding env vars
- Check browser Network tab: script should load from `embed.tawk.to`
- Tawk account active? (no trial expiration)

### AI Responses Too Generic
**Improve by:**
- Adding more detailed docs to KB (longer body text, better tags)
- Enabling LLM mode with OpenAI key
- Adding web enrichment (Google Custom Search)

---

## 7. Customization

### Change AI Personality
Edit system prompts in `/app/api/ai/chat/route.ts`:
- `SYSTEM_PROMPT` — fallback lexical mode
- `LLM_SYSTEM_PROMPT` — OpenAI mode

### Change Widget Colors/Position
AIChat component: `/components/AIChat.tsx`
TawkChat positioning: `/components/TawkChat.tsx` (offsetPx parameter)

### Change Suggestions
In AIChat.tsx, update the `SUGGESTIONS` array:
```typescript
const SUGGESTIONS = [
    'Your question 1?',
    'Your question 2?',
    'Your question 3?',
];
```

---

## Support

**For Graham Sobiribo Paul:**
- Email: hello@greyinfotech.com.ng
- WhatsApp: +234-802-809-5571
- Contact: /contact

**For Tawk.to issues:**
- Tawk Support: https://support.tawk.to

**For OpenAI API issues:**
- OpenAI Docs: https://platform.openai.com/docs
- Status: https://status.openai.com
