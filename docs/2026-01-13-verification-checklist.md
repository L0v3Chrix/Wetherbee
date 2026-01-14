# Verification Checklist & QA Protocols
## Winner Name Correction System

**Document:** WF-CHECKLIST-2026-01-13
**Parent:** WF-PDR-2026-01-13
**Version:** 1.0

---

## 1. Pre-Flight Verification Checklist

### Environment Checks

| # | Check | Command/Action | Expected Result | Status |
|---|-------|----------------|-----------------|--------|
| PF-01 | Git clean state | `git status` | No uncommitted changes | ☐ |
| PF-02 | Node modules installed | `pnpm install` | Exit code 0 | ☐ |
| PF-03 | TypeScript compiles | `pnpm exec tsc --noEmit` | Exit code 0 | ☐ |
| PF-04 | Build succeeds | `pnpm build` | Exit code 0 | ☐ |
| PF-05 | Dev server starts | `pnpm dev` | Server on localhost:3000 | ☐ |
| PF-06 | Winner gallery loads | Browser check | 21 winners visible | ☐ |

### Backup Checks

| # | Check | Command/Action | Expected Result | Status |
|---|-------|----------------|-----------------|--------|
| PF-07 | Create docs/backups dir | `mkdir -p docs/backups` | Directory exists | ☐ |
| PF-08 | Backup data file | `cp site/lib/data/sample-winners.ts docs/backups/` | File copied | ☐ |
| PF-09 | Verify backup readable | `cat docs/backups/sample-winners-*.ts` | File contents display | ☐ |
| PF-10 | Create docs/audit dir | `mkdir -p docs/audit/{before,after}` | Directories exist | ☐ |

### Image Accessibility Checks

| # | Check | Command/Action | Expected Result | Status |
|---|-------|----------------|-----------------|--------|
| PF-11 | All images exist | `ls site/public/winners/*.JPG \| wc -l` | 21 files | ☐ |
| PF-12 | Images are readable | Open each in image viewer | All 21 viewable | ☐ |
| PF-13 | Check names visible | Visual inspection | Pay-to line readable | ☐ |

---

## 2. Per-Winner Extraction Verification

### Winner #1 - IMG_0813.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #2 - IMG_0814.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #3 - IMG_0815.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #4 - IMG_0816.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #5 - IMG_0817.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #6 - IMG_0818.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #7 - IMG_0819.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #8 - IMG_0820.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #9 - IMG_0821.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #10 - IMG_0822.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #11 - IMG_0823.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #12 - IMG_0824.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #13 - IMG_0825.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #14 - IMG_0826.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #15 - IMG_0827.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #16 - IMG_0828.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #17 - IMG_0829.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #18 - IMG_0830.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #19 - IMG_0832.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #20 - IMG_0833.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

### Winner #21 - IMG_0834.JPG

| Step | Check | Result | Verified |
|------|-------|--------|----------|
| 1 | Image loads correctly | ☐ Yes ☐ No | ☐ |
| 2 | "Pay to Order of" visible | ☐ Yes ☐ No | ☐ |
| 3 | Extracted Name | `_______________` | ☐ |
| 4 | Extracted House | `_______________` | ☐ |
| 5 | Confidence Level | ☐ High ☐ Medium ☐ Low | ☐ |
| 6 | Current Name matches? | ☐ Yes ☐ No | ☐ |
| 7 | Correction approved | ☐ Yes ☐ No ☐ N/A | ☐ |

**Notes:** ________________________________________________

---

## 3. Update Verification Checklist

### Per-Update Checks

For EACH name correction applied:

| # | Check | Command/Action | Expected Result | Status |
|---|-------|----------------|-----------------|--------|
| U-01 | Edit applied | Manual file edit | Name changed | ☐ |
| U-02 | TS compiles | `pnpm exec tsc --noEmit` | Exit 0 | ☐ |
| U-03 | No syntax errors | ESLint check | No errors | ☐ |
| U-04 | Winner count same | Check array length | 21 entries | ☐ |
| U-05 | Image ref valid | Verify photoUrl exists | File exists | ☐ |

### Batch Update Summary

| Winner ID | Old Name | New Name | TS Check | Verified |
|-----------|----------|----------|----------|----------|
| 1 | | | ☐ | ☐ |
| 2 | | | ☐ | ☐ |
| 3 | | | ☐ | ☐ |
| 4 | | | ☐ | ☐ |
| 5 | | | ☐ | ☐ |
| 6 | | | ☐ | ☐ |
| 7 | | | ☐ | ☐ |
| 8 | | | ☐ | ☐ |
| 9 | | | ☐ | ☐ |
| 10 | | | ☐ | ☐ |
| 11 | | | ☐ | ☐ |
| 12 | | | ☐ | ☐ |
| 13 | | | ☐ | ☐ |
| 14 | | | ☐ | ☐ |
| 15 | | | ☐ | ☐ |
| 16 | | | ☐ | ☐ |
| 17 | | | ☐ | ☐ |
| 18 | | | ☐ | ☐ |
| 19 | | | ☐ | ☐ |
| 20 | | | ☐ | ☐ |
| 21 | | | ☐ | ☐ |

---

## 4. Post-Update QA Checklist

### Build Verification

| # | Check | Command | Expected | Status |
|---|-------|---------|----------|--------|
| QA-01 | TypeScript | `pnpm exec tsc --noEmit` | Exit 0 | ☐ |
| QA-02 | ESLint | `pnpm lint` | Exit 0 | ☐ |
| QA-03 | Build | `pnpm build` | Exit 0 | ☐ |
| QA-04 | Build output | Check `.next/` directory | Files generated | ☐ |

### Runtime Verification

| # | Check | Action | Expected | Status |
|---|-------|--------|----------|--------|
| QA-05 | Dev server starts | `pnpm dev` | localhost:3000 | ☐ |
| QA-06 | Homepage loads | Browser visit | No errors | ☐ |
| QA-07 | Winners section | Scroll to #winners | 21 cards visible | ☐ |
| QA-08 | Images load | Check network tab | All 21 load | ☐ |
| QA-09 | Names display | Visual check | New names shown | ☐ |
| QA-10 | No console errors | DevTools console | Clean | ☐ |

### Visual Verification

| # | Check | Action | Expected | Status |
|---|-------|--------|----------|--------|
| QA-11 | Desktop view | 1920x1080 | Layout correct | ☐ |
| QA-12 | Tablet view | 768x1024 | Layout correct | ☐ |
| QA-13 | Mobile view | 375x667 | Layout correct | ☐ |
| QA-14 | Card hover | Hover each card | Animation works | ☐ |
| QA-15 | Filtering | Test year filter | Works correctly | ☐ |

### Data Integrity Verification

| # | Check | Method | Expected | Status |
|---|-------|--------|----------|--------|
| QA-16 | Winner count | Count in UI | 21 | ☐ |
| QA-17 | 2024 count | Filter by 2024 | 12 | ☐ |
| QA-18 | 2025 count | Filter by 2025 | 9 | ☐ |
| QA-19 | All images valid | Each card has photo | Yes | ☐ |
| QA-20 | All names visible | Each card shows name | Yes | ☐ |

---

## 5. Final Sign-Off Checklist

### Completion Gates

| Gate | Description | Criteria Met | Approver | Date |
|------|-------------|--------------|----------|------|
| G1 | Pre-flight complete | All PF checks pass | | |
| G2 | Extractions verified | 21/21 extracted | | |
| G3 | Updates applied | 21/21 updated | | |
| G4 | Build passes | QA-01 to QA-04 | | |
| G5 | Runtime verified | QA-05 to QA-10 | | |
| G6 | Visual QA passes | QA-11 to QA-15 | | |
| G7 | Data integrity | QA-16 to QA-20 | | |

### Git Commit Verification

| # | Check | Status |
|---|-------|--------|
| GIT-01 | Only expected files changed | ☐ |
| GIT-02 | Commit message accurate | ☐ |
| GIT-03 | No secrets in commit | ☐ |
| GIT-04 | Branch is correct | ☐ |

### Final Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Developer | | | |
| QA Reviewer | | | |
| Project Owner | | | |

---

**Checklist Complete**

*All checkboxes must be marked before declaring the project complete.*
