# Project Definition & Roadmap (PDR)
## Wetherbee Foundation — Winner Name Correction System

**Document ID:** WF-PDR-2026-01-13
**Version:** 1.0
**Status:** Ready for Implementation
**Created:** 2026-01-13

---

## 1. Executive Summary

### Problem Statement
All 21 past scholarship winners in the Wetherbee Foundation website display **placeholder names** (e.g., "Michael R.", "Sarah T.") instead of the **actual recipient names** visible on the scholarship check images.

### Solution
Implement a **multi-agent verification workflow** that:
1. Screenshots and analyzes each check image
2. Extracts the correct name from the check
3. Cross-references with the current data
4. Updates the data file with verified names
5. Validates changes through multiple verification steps

### Success Criteria
- 100% of winner names match the names on their check images
- Zero data corruption or regression
- Complete audit trail of all changes
- Verified by visual comparison before and after

---

## 2. Current State Analysis

### Data Location
- **File:** `/site/lib/data/sample-winners.ts`
- **Format:** TypeScript constant array
- **Count:** 21 winners (2024: 12, 2025: 9)

### Image Location
- **Directory:** `/site/public/winners/`
- **Files:** IMG_0813.JPG through IMG_0834.JPG (21 images)

### Current Mapping (INCORRECT - Placeholder Names)

| ID | Image File | Current Name | Oxford House (Current) | Date on Check |
|----|------------|--------------|------------------------|---------------|
| 1 | IMG_0813.JPG | Michael R. | Austin House | 11/15/2023 |
| 2 | IMG_0814.JPG | Sarah T. | Cedar Park House | 7/7/2023 |
| 3 | IMG_0815.JPG | David L. | Round Rock House | 3/8/2023 |
| 4 | IMG_0816.JPG | Jennifer M. | Georgetown House | 11/3/2024 |
| 5 | IMG_0817.JPG | Robert K. | Pflugerville House | 4/04/2022 |
| 6 | IMG_0818.JPG | Amanda P. | Manor House | 3/6/22 |
| 7 | IMG_0819.JPG | Christopher W. | Lakeway House | 2/6/22 |
| 8 | IMG_0820.JPG | Lisa H. | Austin House | 1/07/22 |
| 9 | IMG_0821.JPG | James D. | Cedar Park House | 12/5/21 |
| 10 | IMG_0822.JPG | Michelle S. | Round Rock House | 11/6/21 |
| 11 | IMG_0823.JPG | Daniel B. | Georgetown House | 9/14/2021 |
| 12 | IMG_0824.JPG | Patricia G. | Pflugerville House | 10/5/91 |
| 13 | IMG_0825.JPG | Kevin F. | Manor House | 10/5/21 |
| 14 | IMG_0826.JPG | Rachel N. | Lakeway House | 7/23/25 |
| 15 | IMG_0827.JPG | Brandon C. | Austin House | 4/3/25 |
| 16 | IMG_0828.JPG | Nicole V. | Cedar Park House | (unclear) |
| 17 | IMG_0829.JPG | Anthony R. | Round Rock House | 1/15/2025 |
| 18 | IMG_0830.JPG | Stephanie L. | Georgetown House | 2/27/26 |
| 19 | IMG_0832.JPG | Marcus J. | Pflugerville House | (date unclear) |
| 20 | IMG_0833.JPG | Ashley K. | Manor House | 2/01/2027 |
| 21 | IMG_0834.JPG | Tyler M. | Lakeway House | 8/21/2027 |

---

## 3. Verified Name Extraction (From Check Images)

### Names Extracted from Check Analysis

| ID | Image | Name on Check | Oxford House on Check | Amount | Date |
|----|-------|---------------|----------------------|--------|------|
| 1 | IMG_0813.JPG | **OH Honeybear - Shara S.** | OH Honeybear | $225 | 11/15/2023 |
| 2 | IMG_0814.JPG | **OH NEMO - Roison** | OH NEMO | $150 | 7/7/2023 |
| 3 | IMG_0815.JPG | **OH Camila - Adrianna** | OH Camila | $500 | 3/8/2023 |
| 4 | IMG_0816.JPG | **Jennifer - OH Nerys** | OH Nerys | $150.78 | 11/3/2024 |
| 5 | IMG_0817.JPG | **Ryder** | (unclear) | $150.00 | 4/04/2022 |
| 6 | IMG_0818.JPG | **Daniel G @ OH Hays** | OH Hays | $200 | 3/6/22 |
| 7 | IMG_0819.JPG | **Daniel R @ OH Parmer** | OH Parmer | $150 | 2/6/22 |
| 8 | IMG_0820.JPG | **Victoria M @ OH Skypost** | OH Skypost | $200 | 1/07/22 |
| 9 | IMG_0821.JPG | **Ma Kenzie @ OH Lilypad** | OH Lilypad | $200 | 12/5/21 |
| 10 | IMG_0822.JPG | **Albert @ OH Buffalo Pass** | OH Buffalo Pass | $200 | 11/6/21 |
| 11 | IMG_0823.JPG | **Jorge @ OH Liberty** | OH Liberty | $200 | 9/14/2021 |
| 12 | IMG_0824.JPG | **Alfred @ OH Dillon** | OH Dillon | $200 | 10/5/91 |
| 13 | IMG_0825.JPG | **Kimberly @ OH Coaksmitt** | OH Coaksmitt | $200 | 10/5/21 |
| 14 | IMG_0826.JPG | **Tommy - Gaines Mill OH** | Gaines Mill OH | $200 | 7/23/25 |
| 15 | IMG_0827.JPG | **Oxford House Bowman** | OH Bowman | $200 | 4/3/25 |
| 16 | IMG_0828.JPG | **Oxford House - Michelle Chaney** | (unclear) | (unclear) | (unclear) |
| 17 | IMG_0829.JPG | **Oxford House Rufus - Joseph O.** | OH Rufus | $180 | 1/15/2025 |
| 18 | IMG_0830.JPG | **OH (Unclear - male)** | (unclear) | (unclear) | 2/27/26 |
| 19 | IMG_0832.JPG | **Marchella - Oxford House Tranquility** | OH Tranquility | $200 | (date unclear) |
| 20 | IMG_0833.JPG | **Clarey - Oxford House Standish** | OH Standish | $200 | 2/01/2027 |
| 21 | IMG_0834.JPG | **Amber - Oxford House Greenmont** | OH Greenmont | $200 | 8/21/2027 |

---

## 4. Multi-Agent Workflow Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR AGENT                                │
│  (Coordinates all agents, manages state, tracks progress)            │
└─────────────────────────────────────────────────────────────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐    ┌───────────────────┐    ┌───────────────────┐
│ SCREENSHOT    │    │ OCR/EXTRACTION    │    │ VERIFICATION      │
│ AGENT         │    │ AGENT             │    │ AGENT             │
│               │    │                   │    │                   │
│ • Captures    │    │ • Reads check     │    │ • Cross-checks    │
│   check imgs  │    │   text            │    │   extractions     │
│ • Documents   │    │ • Extracts name   │    │ • Flags conflicts │
│   visual      │    │ • Extracts house  │    │ • Requires human  │
│   state       │    │ • Extracts date   │    │   approval        │
└───────────────┘    └───────────────────┘    └───────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                                ▼
                    ┌───────────────────┐
                    │ UPDATE AGENT      │
                    │                   │
                    │ • Applies changes │
                    │ • Creates backup  │
                    │ • Logs all edits  │
                    └───────────────────┘
                                │
                                ▼
                    ┌───────────────────┐
                    │ QA AGENT          │
                    │                   │
                    │ • Runs build      │
                    │ • Visual compare  │
                    │ • Final sign-off  │
                    └───────────────────┘
```

### Agent Responsibilities

#### 1. Orchestrator Agent
- **Role:** Central coordinator
- **Inputs:** Task list, current state
- **Outputs:** Workflow status, completion reports
- **Responsibilities:**
  - Initialize workflow state
  - Dispatch tasks to appropriate agents
  - Track completion status
  - Handle errors and rollbacks
  - Generate final report

#### 2. Screenshot Agent
- **Role:** Visual documentation
- **Inputs:** Image file paths
- **Outputs:** Screenshot captures, visual logs
- **Responsibilities:**
  - Open each check image
  - Capture high-resolution view of name area
  - Document before/after states
  - Store evidence for audit trail

#### 3. OCR/Extraction Agent
- **Role:** Name identification
- **Inputs:** Check images
- **Outputs:** Extracted text data
- **Responsibilities:**
  - Analyze check "Pay to the Order of" field
  - Extract winner name
  - Extract Oxford House name
  - Extract date and amount (metadata)
  - Confidence scoring for each extraction

#### 4. Verification Agent
- **Role:** Quality assurance gate
- **Inputs:** Extracted data, current data
- **Outputs:** Verification status, discrepancy flags
- **Responsibilities:**
  - Compare extracted vs. current names
  - Flag any ambiguous extractions
  - Request human review for low-confidence items
  - Maintain verification log

#### 5. Update Agent
- **Role:** Data modification
- **Inputs:** Verified corrections
- **Outputs:** Updated data file, backup
- **Responsibilities:**
  - Create backup of current data
  - Apply individual name corrections
  - Preserve file structure
  - Log each change with timestamp

#### 6. QA Agent
- **Role:** Final validation
- **Inputs:** Updated data, original images
- **Outputs:** Pass/fail status, visual diff
- **Responsibilities:**
  - Run TypeScript compilation
  - Run build process
  - Generate visual comparison report
  - Sign off on completion

---

## 5. Implementation Phases

### Phase 1: Preparation (Pre-Flight)
**Duration:** Before any changes

| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 1.1 | Create full project backup | Verify backup exists | Orchestrator |
| 1.2 | Git commit current state | Verify clean working tree | Orchestrator |
| 1.3 | Screenshot all current winner cards | Save to /docs/before/ | Screenshot Agent |
| 1.4 | Export current data to JSON | Verify export matches source | Orchestrator |

### Phase 2: Extraction
**Duration:** Per-winner processing

| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 2.1 | Load check image | Verify image loads | Screenshot Agent |
| 2.2 | Analyze "Pay to" field | Identify name text | OCR Agent |
| 2.3 | Extract name | Record raw extraction | OCR Agent |
| 2.4 | Extract Oxford House | Record house name | OCR Agent |
| 2.5 | Score confidence | Flag low confidence (<90%) | OCR Agent |

### Phase 3: Verification
**Duration:** Cross-reference loop

| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 3.1 | Compare extracted vs current | Log differences | Verification Agent |
| 3.2 | Review ambiguous items | Human approval required | Human + Verification Agent |
| 3.3 | Compile verified corrections | All items approved | Verification Agent |
| 3.4 | Generate correction manifest | Review manifest accuracy | Orchestrator |

### Phase 4: Implementation
**Duration:** Apply changes

| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 4.1 | Create data file backup | Backup verified | Update Agent |
| 4.2 | Apply correction #1 | Verify single change | Update Agent |
| 4.3 | Run TypeScript check | No compilation errors | QA Agent |
| 4.4 | Repeat for each correction | Track completion % | Update Agent |
| 4.5 | Run full build | Build succeeds | QA Agent |

### Phase 5: Validation
**Duration:** Final QA

| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 5.1 | Screenshot all updated cards | Save to /docs/after/ | Screenshot Agent |
| 5.2 | Create visual diff | Compare before/after | QA Agent |
| 5.3 | Manual spot-check | Human reviews 5 random | Human |
| 5.4 | Run dev server | Visual inspection passes | QA Agent |
| 5.5 | Git commit changes | Clean commit message | Orchestrator |

---

## 6. Error Prevention Protocol

### Pre-Execution Checks
- [ ] Backup exists and is restorable
- [ ] Git working tree is clean
- [ ] All images are accessible
- [ ] TypeScript compiles without errors
- [ ] Build process succeeds

### During Execution
- [ ] Each change is atomic (one winner at a time)
- [ ] Each change is logged
- [ ] Each change is verified before proceeding
- [ ] Rollback capability confirmed after each change

### Post-Execution Checks
- [ ] Total winner count unchanged (21)
- [ ] All image references still valid
- [ ] TypeScript compiles without errors
- [ ] Build process succeeds
- [ ] Visual inspection passes
- [ ] Git diff shows only expected changes

### Rollback Procedure
1. **Immediate:** Revert single change via git
2. **Full Rollback:** Restore from backup
3. **Emergency:** Deploy previous commit

---

## 7. Verification Checklist

### Per-Winner Verification Matrix

| ID | Image | Check Name | Updated Name | Image Match | TS Valid | Visual OK | Approved |
|----|-------|------------|--------------|-------------|----------|-----------|----------|
| 1 | IMG_0813 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | IMG_0814 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | IMG_0815 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | IMG_0816 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | IMG_0817 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | IMG_0818 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | IMG_0819 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | IMG_0820 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | IMG_0821 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | IMG_0822 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 11 | IMG_0823 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 12 | IMG_0824 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 13 | IMG_0825 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 14 | IMG_0826 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 15 | IMG_0827 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 16 | IMG_0828 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 17 | IMG_0829 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 18 | IMG_0830 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 19 | IMG_0832 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 20 | IMG_0833 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 21 | IMG_0834 | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

### Completion Gates

| Gate | Criteria | Status |
|------|----------|--------|
| G1 - Backup | Backup created and verified | ☐ |
| G2 - Extract | All 21 names extracted | ☐ |
| G3 - Verify | All extractions verified | ☐ |
| G4 - Update | All corrections applied | ☐ |
| G5 - Build | Build succeeds | ☐ |
| G6 - Visual | Visual QA passes | ☐ |
| G7 - Commit | Changes committed | ☐ |

---

## 8. Punchlist (Execution Checklist)

### Pre-Flight Checklist
- [ ] **P-001:** Create git commit of current state
- [ ] **P-002:** Create backup copy of sample-winners.ts
- [ ] **P-003:** Run `pnpm build` - confirm success
- [ ] **P-004:** Screenshot current winner gallery
- [ ] **P-005:** Export current winner data to JSON

### Extraction Checklist (Per Image)
- [ ] **E-001 through E-021:** Extract name from each check image

### Update Checklist (Per Winner)
- [ ] **U-001 through U-021:** Update each winner entry

### QA Checklist
- [ ] **Q-001:** Run TypeScript compilation
- [ ] **Q-002:** Run production build
- [ ] **Q-003:** Visual comparison - before vs after
- [ ] **Q-004:** Verify all 21 winners display correctly
- [ ] **Q-005:** Verify all images still load
- [ ] **Q-006:** Manual spot-check 5 random winners

### Finalization Checklist
- [ ] **F-001:** Git commit with descriptive message
- [ ] **F-002:** Update project documentation
- [ ] **F-003:** Archive backup files
- [ ] **F-004:** Generate completion report

---

## 9. Risk Mitigation

### Identified Risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Data file corruption | High | Low | Backup + version control |
| Name extraction error | Medium | Medium | Human verification gate |
| Build failure | High | Low | Per-change testing |
| Image reference broken | High | Low | Verify paths unchanged |
| Partial update | Medium | Medium | Atomic changes + logging |

### Contingency Plans

1. **If extraction is unclear:** Flag for human review, do not guess
2. **If build fails:** Revert immediately, investigate before retry
3. **If visual mismatch:** Stop, compare against backup
4. **If any doubt:** Pause workflow, escalate to human

---

## 10. Audit Trail Requirements

### Required Documentation
- [ ] Before screenshots (all 21 cards)
- [ ] After screenshots (all 21 cards)
- [ ] Git diff of all changes
- [ ] Extraction log with confidence scores
- [ ] Verification log with approvals
- [ ] Build logs (before/after)
- [ ] Completion timestamp

### Storage Location
```
/docs/
├── 2026-01-13-winner-name-correction-pdr.md (this file)
├── audit/
│   ├── before/
│   │   └── [21 winner card screenshots]
│   ├── after/
│   │   └── [21 winner card screenshots]
│   ├── extraction-log.json
│   ├── verification-log.json
│   └── completion-report.md
└── backups/
    └── sample-winners-backup-2026-01-13.ts
```

---

## 11. Approval & Sign-Off

### Required Approvals Before Implementation

| Role | Name | Approved | Date |
|------|------|----------|------|
| Project Owner | Chrix | ☐ | |
| Data Verified | Claude/Agent | ☐ | |

### Implementation Authorization

**By approving this document, you authorize:**
1. Creation of backup files
2. Modification of sample-winners.ts
3. Git commits to the repository
4. Multi-agent workflow execution

---

## 12. Appendix: Correction Manifest

### Final Corrections to Apply

```typescript
// WINNER NAME CORRECTIONS
// Source: Check image analysis 2026-01-13

const corrections = [
  { id: '1',  old: 'Michael R.',     new: 'Shara S.',           house: 'OH Honeybear' },
  { id: '2',  old: 'Sarah T.',       new: 'Roison',             house: 'OH NEMO' },
  { id: '3',  old: 'David L.',       new: 'Adrianna',           house: 'OH Camila' },
  { id: '4',  old: 'Jennifer M.',    new: 'Jennifer',           house: 'OH Nerys' },
  { id: '5',  old: 'Robert K.',      new: 'Ryder',              house: '(needs verification)' },
  { id: '6',  old: 'Amanda P.',      new: 'Daniel G.',          house: 'OH Hays' },
  { id: '7',  old: 'Christopher W.', new: 'Daniel R.',          house: 'OH Parmer' },
  { id: '8',  old: 'Lisa H.',        new: 'Victoria M.',        house: 'OH Skypost' },
  { id: '9',  old: 'James D.',       new: 'Ma Kenzie',          house: 'OH Lilypad' },
  { id: '10', old: 'Michelle S.',    new: 'Albert',             house: 'OH Buffalo Pass' },
  { id: '11', old: 'Daniel B.',      new: 'Jorge',              house: 'OH Liberty' },
  { id: '12', old: 'Patricia G.',    new: 'Alfred',             house: 'OH Dillon' },
  { id: '13', old: 'Kevin F.',       new: 'Kimberly',           house: 'OH Coaksmitt' },
  { id: '14', old: 'Rachel N.',      new: 'Tommy',              house: 'Gaines Mill OH' },
  { id: '15', old: 'Brandon C.',     new: '(name unclear)',     house: 'OH Bowman' },
  { id: '16', old: 'Nicole V.',      new: 'Michelle Chaney',    house: '(needs verification)' },
  { id: '17', old: 'Anthony R.',     new: 'Joseph O.',          house: 'OH Rufus' },
  { id: '18', old: 'Stephanie L.',   new: '(unclear)',          house: '(needs verification)' },
  { id: '19', old: 'Marcus J.',      new: 'Marchella',          house: 'OH Tranquility' },
  { id: '20', old: 'Ashley K.',      new: 'Clarey',             house: 'OH Standish' },
  { id: '21', old: 'Tyler M.',       new: 'Amber',              house: 'OH Greenmont' },
];
```

### Items Requiring Human Verification
- **ID 5:** Name appears to be "Ryder" but house unclear
- **ID 15:** Name unclear on check - "Oxford House Bowman" visible
- **ID 16:** Check image is less clear - verify "Michelle Chaney"
- **ID 18:** Check image 0830 - name difficult to read

---

**Document End**

*This PDR provides the complete roadmap for the winner name correction project. Follow all phases in sequence, verify each checkpoint, and do not proceed past any gate without approval.*
