# Code review: search, usability and data access

Reviewed the web UI, search and version APIs, data paths, shared types, locale/theme handling, downloader/release discovery, stream downloads, service worker, build configuration and CI. Baseline: `ba746f82b9`. Existing uncommitted event-description edits were kept in the original worktree.

## Changes selected

- Debounce search by 300 ms, suppress incomplete IME input, and use URL search parameters as the source of truth for search, platforms and version. Native history updates avoid server-component navigations for filter changes.
- Paginate browsing and search in 50-event pages. Report the complete matching total and let users reach results beyond the former 100-result search limit.
- Show loading, empty selection, no-match, version-list failure and event-request failure states with recovery controls. Preserve filters when changing language.
- Keep mobile search visible, add accessible control names/pressed states, use native buttons and disclosures, and place the promotional panel in document flow so it cannot cover event results.
- Share version resolution/localization between APIs. Cache web data for 60 seconds with a 16-entry bound, coalesce concurrent loads, evict failed loads and reuse normalized event fields. Downloader factories default to fresh reads.
- Align whitespace search with the documented AND behavior, preserve quoted phrases, and update API/skill documentation.
- Resolve only the requested proxy metadata in parallel after server snapshots are prepared, instead of resolving all five sources sequentially and discarding the server entries.
- Await complete stream pipelines for artifact/archive downloads, propagate output errors and accept responses without Content-Length.
- Run all regression tests and both TypeScript projects in CI with lockfile-based installation.

## Measurements

Local Node 24 handler benchmark, same committed dataset, 25 sequential requests per query, limit 50. These measurements include data access and JSON serialization but exclude HTTP transport, Next.js routing overhead and browser rendering. The first request populates the new cache; medians represent repeated requests.

| Query                    | Before median | After median |
| ------------------------ | ------------: | -----------: |
| player                   |      16.74 ms |      1.23 ms |
| join OR login OR connect |      15.96 ms |      1.26 ms |
| チャット OR chat         |      12.52 ms |      0.51 ms |

Version-list handler mean over 25 requests: 9.03 ms → 0.04 ms.

The Japanese desktop page initially rendered 553 event rows / 5,689 DOM elements; the paginated page rendered 50 rows / 730 elements. Total results remain 553. A burst of search input produced one search API request and no server-component navigation.

Run `npm run benchmark` to repeat the handler benchmark. Absolute timing depends on the machine and cache state; these are not Core Web Vitals or production latency measurements.

## Other findings

- Full virtualization and a database/search-engine migration were deferred: pagination and reuse remove the observed initial rendering and repeated-read costs with the current dataset.
- Release discovery and remote Javadoc parsing still have broad concurrency and permissive fallback handling. Changing those policies needs dedicated fixture coverage of historical sources and upstream behavior; this PR fixes the independently reproducible stream-completion issue.
- Dependency upgrades, visual redesign, event description changes and service-worker strategy changes were not needed for the selected fixes.
- The existing Ko-Fi image lint warnings remain; the images now have dimensions and the desktop trigger is keyboard-operable.

## Verification

- 28 automated tests pass, including pagination beyond 100 results, AND/OR/phrase semantics, language/version/source validation, cache expiry/retry/eviction, HTTP failures, complete stream writes and selective proxy metadata reads.
- Web and downloader TypeScript checks, lint and the production build pass. Lint reports only the existing two Ko-Fi image warnings.
- Browser checks cover desktop and 390px mobile layouts, Japanese/English, light/dark themes, keyboard activation, Back/Forward, a burst of input, 150 visible search results, source deselection, and preservation of search/version when changing language.
- Network-blocking checks cover initial search failure, additional-page failure with 50 existing results retained, version-list failure and successful retries. Invalid version URLs recover through the reset action.
- Synthetic composition events confirm that IME input produces no search request before composition end, followed by the committed Japanese query. A native OS IME session was not automated.
