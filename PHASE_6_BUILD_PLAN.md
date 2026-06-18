# Phase 6.6-6.10 Full Build Plan

## Objective
Build 5 remaining differentiator features (AI Code Analyzer, Live Demos, API Playground, Performance Benchmarking, Tech Stack Scanner) without modifying existing code. Deploy cleanly to cPanel Node.js.

## Strategy
- **Additive only:** All new features in separate modules/APIs—zero breaking changes
- **Free APIs:** GitHub free tier, free tools only (no paid APIs)
- **cPanel compatible:** No exotic dependencies, standard Node.js patterns
- **Testable:** Each feature has unit tests, all tests must pass
- **Deployable:** No build-time config, env-based runtime config

## Phase 6.6: AI Code Analyzer (8-10h)
**Concept:** Scan GitHub repos → analyze code → recommend services

### Files to Create
```
lib/ai/code-analyzer.ts          # Core analyzer logic (AST, patterns)
lib/ai/github-scanner.ts         # GitHub API integration (Octokit)
lib/ai/service-recommender.ts    # Service suggestion engine
pages/api/ai/analyze-code.ts      # POST /api/ai/analyze-code
pages/api/ai/scan-github.ts       # POST /api/ai/scan-github
pages/api/ai/recommend.ts         # POST /api/ai/recommend
components/AI/CodeAnalyzer.tsx    # UI component
lib/__tests__/code-analyzer.test.ts # Tests
```

### Implementation Details
- **Code Analysis:** Parse TypeScript/JavaScript, detect patterns (async, error handling, complexity)
- **GitHub Scanning:** Public repos via Octokit (free auth or unauthenticated), analyze code quality metrics
- **Recommendations:** Match detected tech stack → suggest grey.git services (Node.js → backend service, React → frontend, etc.)
- **Performance:** Cache results, rate-limit API calls
- **Dependencies:** octokit/rest, @babel/parser (free)

### API Endpoints
- `POST /api/ai/analyze-code` — Analyze code snippet
- `POST /api/ai/scan-github` — Scan GitHub repo (owner/repo)
- `POST /api/ai/recommend` — Get service recommendations (tech stack input)

### Tests (8 tests)
- Analyze code snippet
- Detect language/patterns
- Scan GitHub repo
- Extract tech stack
- Generate recommendations
- Rate limiting
- Error handling
- Cache validation

---

## Phase 6.7: Live Demo Environments (10-12h)
**Concept:** Spin up isolated temporary demo instances on request

### Files to Create
```
lib/demo/demo-manager.ts          # Demo instance lifecycle
lib/demo/docker-runner.ts         # Docker-based execution (optional, can use mock)
lib/demo/cleanup.ts               # Cleanup scheduler
pages/api/demo/start.ts           # POST /api/demo/start
pages/api/demo/stop.ts            # POST /api/demo/stop
pages/api/demo/status.ts          # GET /api/demo/status
pages/api/demo/list.ts            # GET /api/demo/list
components/Demo/DemoEnvironment.tsx # UI component
lib/__tests__/demo-manager.test.ts  # Tests
```

### Implementation Details
- **Demo Manager:** Track active demos, sessions, timeouts (in-memory + DB)
- **Docker Runner:** Spawn containers for service previews (or mock if cPanel doesn't support Docker)
- **Cleanup:** Auto-kill demos after 1h, cleanup resources
- **Security:** Isolated environments, rate-limit per user, no data persistence
- **cPanel:** Use mock/local filesystem fallback if Docker unavailable
- **Dependencies:** None (or `dockerode` if Docker available)

### API Endpoints
- `POST /api/demo/start` — Spin up demo (service type)
- `POST /api/demo/stop` — Kill demo (demo ID)
- `GET /api/demo/status` — Check demo status
- `GET /api/demo/list` — List active demos

### Tests (10 tests)
- Start demo instance
- Stop demo instance
- Auto-cleanup on timeout
- Resource limits
- Session management
- Error recovery
- Rate limiting
- Concurrent demos
- Cleanup validation
- Status tracking

---

## Phase 6.8: Interactive API Playground (6-8h)
**Concept:** Execute GraphQL/REST queries live in browser

### Files to Create
```
lib/playground/query-executor.ts  # Execute GraphQL/REST
lib/playground/sandbox.ts         # Safe query execution
pages/api/playground/execute.ts   # POST /api/playground/execute
pages/api/playground/schema.ts    # GET /api/playground/schema
components/Playground/GraphQLPlayground.tsx # UI
components/Playground/RESTPlayground.tsx    # UI
lib/__tests__/query-executor.test.ts # Tests
```

### Implementation Details
- **Query Executor:** Parse + validate GraphQL/REST, execute against live API
- **Sandbox:** Timeout queries, memory limits, no mutation unless allowed
- **Schema Introspection:** Export GraphQL schema for IDE
- **Query History:** Track recent queries per session
- **Validation:** Check query syntax, field existence, auth
- **cPanel:** Native Node.js, no browser APIs needed
- **Dependencies:** graphql, express-graphql (already have Apollo)

### API Endpoints
- `POST /api/playground/execute` — Execute GraphQL/REST query
- `GET /api/playground/schema` — Get GraphQL schema
- `POST /api/playground/validate` — Validate query without executing

### Tests (7 tests)
- Execute valid query
- Reject invalid query
- Timeout handling
- Memory limits
- Schema introspection
- Query history
- Auth validation

---

## Phase 6.9: Performance Benchmarking Tool (8-10h)
**Concept:** Test & compare performance across services

### Files to Create
```
lib/bench/benchmark-runner.ts     # Run performance tests
lib/bench/metrics.ts              # Collect metrics (speed, memory, requests)
lib/bench/comparator.ts           # Compare results
pages/api/bench/run.ts            # POST /api/bench/run
pages/api/bench/compare.ts        # POST /api/bench/compare
pages/api/bench/results.ts        # GET /api/bench/results/:id
components/Bench/BenchmarkDashboard.tsx # UI
lib/__tests__/benchmark.test.ts   # Tests
```

### Implementation Details
- **Benchmark Runner:** Execute functions, measure time/memory/heap
- **Metrics:** Latency (p50, p95, p99), throughput, memory usage
- **Comparison:** Baseline vs current, % improvement/regression
- **Results:** Store in DB, export CSV/JSON
- **Parallel:** Run multiple benchmarks concurrently
- **cPanel:** Use native Node.js perf hooks
- **Dependencies:** autocannon (lightweight HTTP benchmarking)

### API Endpoints
- `POST /api/bench/run` — Run benchmark on endpoint
- `POST /api/bench/compare` — Compare two endpoints
- `GET /api/bench/results/:id` — Fetch results

### Tests (9 tests)
- Run benchmark
- Measure latency
- Measure throughput
- Memory profiling
- Compare baselines
- Parallel benchmarking
- Results storage
- CSV export
- Error recovery

---

## Phase 6.10: Tech Stack Scanner (6-8h)
**Concept:** Detect tech stack from websites

### Files to Create
```
lib/scanner/tech-detector.ts      # Detect tech from headers, HTML, JS
lib/scanner/website-crawler.ts    # Crawl website
lib/scanner/tech-db.ts            # Tech signature database
pages/api/scanner/scan.ts         # POST /api/scanner/scan
pages/api/scanner/compare.ts      # POST /api/scanner/compare
components/Scanner/TechScanner.tsx # UI
lib/__tests__/tech-detector.test.ts # Tests
```

### Implementation Details
- **Tech Detection:** Analyze HTTP headers, HTML meta, JS globals, CSS frameworks
- **Crawler:** Fetch homepage, check common tech indicators
- **Tech DB:** Local database of tech signatures (no external API)
- **Comparison:** Detect your tech vs competitor tech
- **Results:** Identify gaps, recommend upgrades
- **cPanel:** Pure Node.js, use node-fetch or axios
- **Dependencies:** axios, cheerio (HTML parsing)

### API Endpoints
- `POST /api/scanner/scan` — Scan website (URL)
- `POST /api/scanner/compare` — Compare two websites

### Tests (8 tests)
- Scan website
- Detect framework (React/Vue/Angular)
- Detect backend (Node.js/PHP/etc)
- Detect CDN
- Detect analytics
- Compare tech stacks
- Error handling
- Rate limiting

---

## Implementation Order

### Day 1: Phase 6.6 (AI Code Analyzer) — 8-10h
1. Create Octokit GitHub scanner
2. Implement code analyzer (AST parsing)
3. Build service recommender
4. Create API endpoints
5. Tests + verification

### Day 2: Phase 6.7 (Live Demos) — 10-12h
1. Build demo manager
2. Mock Docker runner (or real if available)
3. Cleanup scheduler
4. API endpoints
5. Tests + verification

### Day 3: Phase 6.8 (API Playground) — 6-8h
1. Query executor
2. Sandbox safety
3. Schema introspection
4. API endpoints
5. Tests + verification

### Day 4: Phase 6.9 (Performance Benchmarking) — 8-10h
1. Benchmark runner
2. Metrics collection
3. Comparison logic
4. API endpoints
5. Tests + verification

### Day 5: Phase 6.10 (Tech Scanner) — 6-8h
1. Tech detector
2. Website crawler
3. Tech signature DB
4. API endpoints
5. Tests + verification

### Final: Integration & Deployment
1. Run full test suite
2. Verify build (0 TS errors, all pages)
3. Test on cPanel Node.js locally
4. Commit all phases
5. Create deployment guide

---

## Build Requirements

### Dependencies to Add
```json
{
  "octokit": "^3.1.2",
  "@babel/parser": "^7.24.0",
  "axios": "^1.6.5",
  "cheerio": "^1.0.0-rc.12",
  "autocannon": "^7.11.0"
}
```

### No Changes To
- Existing components
- Existing APIs
- Database schema (Phase 6 already set up)
- Config files
- Build process

### New Directories
```
lib/ai/           # AI features
lib/demo/         # Demo features
lib/playground/   # API playground
lib/bench/        # Benchmarking
lib/scanner/      # Tech scanning
pages/api/ai/     # AI endpoints
pages/api/demo/   # Demo endpoints
pages/api/playground/ # Playground endpoints
pages/api/bench/  # Benchmark endpoints
pages/api/scanner/ # Scanner endpoints
components/AI/    # AI components
components/Demo/  # Demo components
components/Playground/ # Playground UI
components/Bench/ # Benchmark UI
components/Scanner/ # Scanner UI
```

---

## Deployment Checklist (cPanel Node.js)

- [ ] All 5 phases pass tests
- [ ] 0 TypeScript errors
- [ ] 0 build warnings
- [ ] npm install completes without errors
- [ ] npm run build completes in <180s
- [ ] All endpoints respond correctly
- [ ] Free APIs only (no paid API keys needed)
- [ ] Environment variables documented (.env.example)
- [ ] No external services required (Docker optional)
- [ ] Production build optimized
- [ ] Memory usage reasonable (<500MB)

---

## Timeline
- **Estimate:** 38-48 hours total
- **Feasibility:** Can complete in 5 days full-time
- **Risk:** Low (all additive, free tools, proven patterns)
- **Testing:** Comprehensive (50+ new tests)
- **Deployment:** Ready for cPanel immediately after completion

