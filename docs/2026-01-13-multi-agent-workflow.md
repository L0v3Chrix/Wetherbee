# Multi-Agent Orchestration Workflow
## Winner Name Correction System

**Document:** WF-WORKFLOW-2026-01-13
**Parent:** WF-PDR-2026-01-13
**Version:** 1.0

---

## 1. Workflow Execution Protocol

### Agent Invocation Sequence

```
WORKFLOW START
│
├── [1] ORCHESTRATOR: Initialize
│   ├── Load configuration
│   ├── Verify prerequisites
│   └── Create execution log
│
├── [2] SCREENSHOT AGENT: Capture Before State
│   ├── For each winner (1-21):
│   │   └── Screenshot current card
│   └── Store in /docs/audit/before/
│
├── [3] OCR/EXTRACTION AGENT: Process Images
│   ├── For each check image (IMG_0813-0834):
│   │   ├── Load image
│   │   ├── Analyze "Pay to Order of" field
│   │   ├── Extract name text
│   │   ├── Extract house name
│   │   └── Score confidence (0-100%)
│   └── Output: extraction-manifest.json
│
├── [4] VERIFICATION AGENT: Cross-Reference
│   ├── Compare extracted vs current data
│   ├── Flag discrepancies
│   ├── Queue low-confidence items for human review
│   └── Output: verified-corrections.json
│
├── [5] HUMAN GATE: Approval Required
│   ├── Review flagged items
│   ├── Approve/reject each correction
│   └── Sign off on manifest
│
├── [6] UPDATE AGENT: Apply Corrections
│   ├── Create backup of sample-winners.ts
│   ├── For each verified correction:
│   │   ├── Apply single change
│   │   ├── Run TypeScript check
│   │   └── Log change
│   └── Output: updated sample-winners.ts
│
├── [7] QA AGENT: Final Validation
│   ├── Run full build
│   ├── Start dev server
│   ├── Screenshot updated cards
│   ├── Generate visual diff
│   └── Output: qa-report.json
│
├── [8] SCREENSHOT AGENT: Capture After State
│   ├── For each winner (1-21):
│   │   └── Screenshot updated card
│   └── Store in /docs/audit/after/
│
├── [9] ORCHESTRATOR: Finalize
│   ├── Generate completion report
│   ├── Create git commit
│   └── Archive audit trail
│
WORKFLOW END
```

---

## 2. Agent Implementation Details

### 2.1 Orchestrator Agent

```typescript
// Orchestrator Agent Pseudocode

interface WorkflowState {
  phase: 'init' | 'screenshot' | 'extract' | 'verify' | 'approve' | 'update' | 'qa' | 'complete';
  currentWinner: number;
  totalWinners: 21;
  errors: Error[];
  completedSteps: string[];
  rollbackPoints: string[];
}

async function orchestrate() {
  const state: WorkflowState = initialize();

  // Phase 1: Initialize
  await verifyPrerequisites();
  await createBackup();
  state.rollbackPoints.push('backup-created');

  // Phase 2: Before Screenshots
  await dispatchAgent('screenshot', { mode: 'before' });

  // Phase 3: Extraction
  const extractions = await dispatchAgent('extraction', {
    images: getAllCheckImages()
  });

  // Phase 4: Verification
  const verified = await dispatchAgent('verification', {
    extractions,
    currentData: loadCurrentData()
  });

  // Phase 5: Human Gate
  const approved = await humanApprovalGate(verified);
  if (!approved) {
    await rollback(state);
    return;
  }

  // Phase 6: Apply Updates
  for (const correction of approved.corrections) {
    await dispatchAgent('update', { correction });
    await runTypeScriptCheck(); // Fail fast
  }

  // Phase 7: QA
  const qaResult = await dispatchAgent('qa', {});
  if (!qaResult.passed) {
    await rollback(state);
    return;
  }

  // Phase 8: After Screenshots
  await dispatchAgent('screenshot', { mode: 'after' });

  // Phase 9: Finalize
  await createGitCommit();
  await generateCompletionReport();

  return { success: true, state };
}
```

### 2.2 Screenshot Agent

```typescript
// Screenshot Agent Pseudocode

interface ScreenshotConfig {
  mode: 'before' | 'after';
  outputDir: string;
}

async function captureWinnerCards(config: ScreenshotConfig) {
  const outputDir = `/docs/audit/${config.mode}/`;

  // Using Playwright for screenshots
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Navigate to winner gallery
  await page.goto('http://localhost:3000/#winners');

  // Capture each winner card
  for (let i = 1; i <= 21; i++) {
    const card = page.locator(`[data-winner-id="${i}"]`);
    await card.screenshot({
      path: `${outputDir}/winner-${i.toString().padStart(2, '0')}.png`
    });

    log(`Captured winner ${i} - ${config.mode}`);
  }

  await browser.close();

  return {
    captured: 21,
    location: outputDir
  };
}
```

### 2.3 OCR/Extraction Agent

```typescript
// Extraction Agent Pseudocode

interface ExtractionResult {
  imageFile: string;
  winnerId: string;
  extractedName: string;
  extractedHouse: string;
  extractedDate: string;
  extractedAmount: string;
  confidence: number; // 0-100
  rawText: string;
  needsReview: boolean;
}

async function extractFromCheckImages(): Promise<ExtractionResult[]> {
  const images = [
    'IMG_0813.JPG', 'IMG_0814.JPG', 'IMG_0815.JPG', 'IMG_0816.JPG',
    'IMG_0817.JPG', 'IMG_0818.JPG', 'IMG_0819.JPG', 'IMG_0820.JPG',
    'IMG_0821.JPG', 'IMG_0822.JPG', 'IMG_0823.JPG', 'IMG_0824.JPG',
    'IMG_0825.JPG', 'IMG_0826.JPG', 'IMG_0827.JPG', 'IMG_0828.JPG',
    'IMG_0829.JPG', 'IMG_0830.JPG', 'IMG_0832.JPG', 'IMG_0833.JPG',
    'IMG_0834.JPG'
  ];

  const results: ExtractionResult[] = [];

  for (const [index, image] of images.entries()) {
    // Load and analyze image
    const imageData = await loadImage(`/public/winners/${image}`);

    // Focus on "Pay to the Order of" region
    const payToRegion = await detectPayToRegion(imageData);

    // Extract text using vision model
    const extraction = await extractTextFromRegion(payToRegion);

    // Parse components
    const parsed = parseCheckPayee(extraction.text);

    // Score confidence based on clarity
    const confidence = calculateConfidence(extraction, parsed);

    results.push({
      imageFile: image,
      winnerId: (index + 1).toString(),
      extractedName: parsed.name,
      extractedHouse: parsed.house,
      extractedDate: parsed.date,
      extractedAmount: parsed.amount,
      confidence,
      rawText: extraction.text,
      needsReview: confidence < 90
    });

    log(`Extracted ${image}: ${parsed.name} (${confidence}%)`);
  }

  return results;
}
```

### 2.4 Verification Agent

```typescript
// Verification Agent Pseudocode

interface VerificationResult {
  winnerId: string;
  currentName: string;
  extractedName: string;
  currentHouse: string;
  extractedHouse: string;
  status: 'match' | 'mismatch' | 'needs-review';
  approved: boolean;
  notes: string;
}

async function verifyExtractions(
  extractions: ExtractionResult[],
  currentData: Winner[]
): Promise<VerificationResult[]> {
  const results: VerificationResult[] = [];

  for (const extraction of extractions) {
    const current = currentData.find(w => w.id === extraction.winnerId);

    // Compare names (case-insensitive, normalized)
    const namesMatch = normalizeName(extraction.extractedName) ===
                       normalizeName(current.name);

    // Determine status
    let status: 'match' | 'mismatch' | 'needs-review';
    if (namesMatch) {
      status = 'match';
    } else if (extraction.needsReview || extraction.confidence < 90) {
      status = 'needs-review';
    } else {
      status = 'mismatch';
    }

    results.push({
      winnerId: extraction.winnerId,
      currentName: current.name,
      extractedName: extraction.extractedName,
      currentHouse: current.oxfordHouse,
      extractedHouse: extraction.extractedHouse,
      status,
      approved: status === 'match', // Auto-approve matches
      notes: status === 'needs-review'
        ? `Low confidence (${extraction.confidence}%) - requires human review`
        : ''
    });
  }

  // Summary
  const needsReview = results.filter(r => r.status === 'needs-review');
  const mismatches = results.filter(r => r.status === 'mismatch');

  log(`Verification complete: ${needsReview.length} need review, ${mismatches.length} mismatches`);

  return results;
}
```

### 2.5 Update Agent

```typescript
// Update Agent Pseudocode

interface UpdateResult {
  winnerId: string;
  oldName: string;
  newName: string;
  oldHouse: string;
  newHouse: string;
  timestamp: string;
  success: boolean;
  error?: string;
}

async function applyCorrections(
  corrections: VerificationResult[]
): Promise<UpdateResult[]> {
  const results: UpdateResult[] = [];

  // Step 1: Create backup
  const backupPath = `/docs/backups/sample-winners-backup-${timestamp()}.ts`;
  await copyFile('/site/lib/data/sample-winners.ts', backupPath);
  log(`Backup created: ${backupPath}`);

  // Step 2: Load current file
  const fileContent = await readFile('/site/lib/data/sample-winners.ts');
  let updatedContent = fileContent;

  // Step 3: Apply each correction atomically
  for (const correction of corrections.filter(c => c.approved && c.status !== 'match')) {
    try {
      // Find and replace the name
      const oldPattern = `name: '${correction.currentName}'`;
      const newPattern = `name: '${correction.extractedName}'`;

      if (!updatedContent.includes(oldPattern)) {
        throw new Error(`Could not find: ${oldPattern}`);
      }

      updatedContent = updatedContent.replace(oldPattern, newPattern);

      // Also update Oxford House if different
      if (correction.extractedHouse &&
          correction.extractedHouse !== correction.currentHouse) {
        const oldHouse = `oxfordHouse: '${correction.currentHouse}'`;
        const newHouse = `oxfordHouse: '${correction.extractedHouse}'`;
        updatedContent = updatedContent.replace(oldHouse, newHouse);
      }

      // Write intermediate state
      await writeFile('/site/lib/data/sample-winners.ts', updatedContent);

      // Verify TypeScript still compiles
      const tsCheck = await runCommand('pnpm exec tsc --noEmit');
      if (tsCheck.exitCode !== 0) {
        throw new Error('TypeScript compilation failed');
      }

      results.push({
        winnerId: correction.winnerId,
        oldName: correction.currentName,
        newName: correction.extractedName,
        oldHouse: correction.currentHouse,
        newHouse: correction.extractedHouse,
        timestamp: new Date().toISOString(),
        success: true
      });

      log(`Updated winner ${correction.winnerId}: ${correction.currentName} → ${correction.extractedName}`);

    } catch (error) {
      results.push({
        winnerId: correction.winnerId,
        oldName: correction.currentName,
        newName: correction.extractedName,
        oldHouse: correction.currentHouse,
        newHouse: correction.extractedHouse,
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      });

      // Rollback on error
      await copyFile(backupPath, '/site/lib/data/sample-winners.ts');
      throw error; // Fail fast
    }
  }

  return results;
}
```

### 2.6 QA Agent

```typescript
// QA Agent Pseudocode

interface QAResult {
  buildSuccess: boolean;
  devServerSuccess: boolean;
  visualDiffGenerated: boolean;
  winnerCount: number;
  imagesValid: boolean;
  typescriptValid: boolean;
  passed: boolean;
  issues: string[];
}

async function runQualityAssurance(): Promise<QAResult> {
  const issues: string[] = [];

  // Check 1: TypeScript compilation
  const tsResult = await runCommand('pnpm exec tsc --noEmit');
  const typescriptValid = tsResult.exitCode === 0;
  if (!typescriptValid) {
    issues.push('TypeScript compilation failed');
  }

  // Check 2: Production build
  const buildResult = await runCommand('pnpm build');
  const buildSuccess = buildResult.exitCode === 0;
  if (!buildSuccess) {
    issues.push('Production build failed');
  }

  // Check 3: Verify winner count
  const data = await import('/site/lib/data/sample-winners.ts');
  const winnerCount = data.sampleWinners.length;
  if (winnerCount !== 21) {
    issues.push(`Winner count mismatch: expected 21, got ${winnerCount}`);
  }

  // Check 4: Verify all image references
  const imagesValid = await verifyAllImagesExist(data.sampleWinners);
  if (!imagesValid) {
    issues.push('Some winner image references are invalid');
  }

  // Check 5: Start dev server and verify
  const server = await startDevServer();
  const devServerSuccess = await checkPageLoads('http://localhost:3000/#winners');
  await server.close();

  // Check 6: Generate visual diff
  const visualDiffGenerated = await generateVisualDiff(
    '/docs/audit/before/',
    '/docs/audit/after/'
  );

  const passed = typescriptValid && buildSuccess &&
                 winnerCount === 21 && imagesValid && devServerSuccess;

  return {
    buildSuccess,
    devServerSuccess,
    visualDiffGenerated,
    winnerCount,
    imagesValid,
    typescriptValid,
    passed,
    issues
  };
}
```

---

## 3. Error Handling Protocol

### 3.1 Error Categories

| Category | Severity | Auto-Recovery | Human Action |
|----------|----------|---------------|--------------|
| Image Load Failure | Low | Retry 3x | Skip, flag for review |
| OCR Confidence Low | Medium | Flag | Human verification |
| TypeScript Error | High | Rollback | Manual fix required |
| Build Failure | Critical | Full rollback | Stop workflow |
| File Write Error | Critical | Full rollback | Check permissions |

### 3.2 Rollback Procedure

```typescript
async function rollback(state: WorkflowState): Promise<void> {
  log('ROLLBACK INITIATED', 'error');

  // Step 1: Restore backup if exists
  if (state.rollbackPoints.includes('backup-created')) {
    const backupFiles = await glob('/docs/backups/sample-winners-backup-*.ts');
    const latestBackup = backupFiles.sort().pop();

    await copyFile(latestBackup, '/site/lib/data/sample-winners.ts');
    log(`Restored from backup: ${latestBackup}`);
  }

  // Step 2: Reset git if changes were made
  if (state.phase !== 'init') {
    await runCommand('git checkout -- site/lib/data/sample-winners.ts');
    log('Git reset applied');
  }

  // Step 3: Verify restoration
  const tsCheck = await runCommand('pnpm exec tsc --noEmit');
  if (tsCheck.exitCode !== 0) {
    throw new Error('CRITICAL: Rollback failed - TypeScript still invalid');
  }

  log('Rollback complete - system restored to previous state');
}
```

---

## 4. Human Interaction Points

### 4.1 Required Human Approvals

| Gate | Trigger | Required Action |
|------|---------|-----------------|
| Pre-Flight | Before any changes | Approve PDR |
| Extraction Review | Low confidence (<90%) | Verify name reading |
| Correction Manifest | Before updates | Sign off on all corrections |
| QA Sign-off | After visual diff | Confirm visual accuracy |
| Commit Approval | Before git commit | Approve commit message |

### 4.2 Human Review Interface (Conceptual)

```
┌─────────────────────────────────────────────────────────────┐
│ WINNER NAME CORRECTION - HUMAN REVIEW                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Winner #5 - IMG_0817.JPG                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                                                     │    │
│  │  [Check Image Display Area]                         │    │
│  │                                                     │    │
│  │  Extracted: "Ryder"                                 │    │
│  │  Confidence: 78%                                    │    │
│  │  Current: "Robert K."                               │    │
│  │                                                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Actions:                                                   │
│  [✓ Approve Extraction] [✗ Reject] [Edit Name: ______]     │
│                                                             │
│  Notes: _____________________________________________       │
│                                                             │
│                              [Save & Next] [Skip]           │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Execution Commands

### 5.1 Workflow Initialization

```bash
# Step 1: Ensure clean state
cd /Users/chrixcolvard/projects/clients/wetherbee-foundation
git status  # Should be clean

# Step 2: Create backup
cp site/lib/data/sample-winners.ts docs/backups/sample-winners-backup-$(date +%Y-%m-%d).ts

# Step 3: Verify build works
cd site
pnpm build

# Step 4: Start dev server for screenshots
pnpm dev &
```

### 5.2 Manual Execution Steps

If running manually (not automated):

```bash
# 1. Read each check image and record name
# 2. Update sample-winners.ts one entry at a time
# 3. Run TypeScript check after each change:
pnpm exec tsc --noEmit

# 4. Run build after all changes:
pnpm build

# 5. Visual verification:
pnpm dev
# Open http://localhost:3000/#winners
# Verify each winner displays correctly

# 6. Commit:
git add site/lib/data/sample-winners.ts
git commit -m "fix: Correct scholarship winner names from check images

Updated all 21 winner names to match the actual names on their
scholarship checks. Names were previously placeholders.

Changes verified through:
- Visual check image analysis
- TypeScript compilation
- Production build
- Visual inspection of winner gallery"
```

---

## 6. Logging & Audit

### 6.1 Log Format

```json
{
  "timestamp": "2026-01-13T10:30:45.123Z",
  "agent": "extraction",
  "action": "extract_name",
  "winnerId": "1",
  "imageFile": "IMG_0813.JPG",
  "result": {
    "extractedName": "Shara S.",
    "confidence": 95,
    "success": true
  },
  "duration_ms": 1234
}
```

### 6.2 Audit Trail Files

```
/docs/audit/
├── workflow-log.jsonl           # Full execution log
├── extraction-results.json      # All extractions with confidence
├── verification-results.json    # All verifications with approvals
├── update-results.json          # All updates with timestamps
├── qa-results.json              # QA checks and results
├── before/                      # Screenshots before
│   └── winner-01.png ... winner-21.png
├── after/                       # Screenshots after
│   └── winner-01.png ... winner-21.png
└── visual-diff/                 # Side-by-side comparisons
    └── winner-01-diff.png ... winner-21-diff.png
```

---

## 7. Success Metrics

### 7.1 Completion Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Names Corrected | 21/21 | Count of updates |
| TypeScript Valid | 100% | tsc --noEmit exit 0 |
| Build Success | 100% | pnpm build exit 0 |
| Visual Match | 100% | Human verification |
| Zero Regressions | 0 errors | No new issues introduced |

### 7.2 Quality Gates

- **Gate 1:** All 21 extractions complete
- **Gate 2:** All corrections verified (human + automated)
- **Gate 3:** TypeScript compiles
- **Gate 4:** Build succeeds
- **Gate 5:** Visual inspection passes
- **Gate 6:** Git commit clean

---

**Document End**

*This workflow document provides the detailed implementation guide for the multi-agent name correction system. Execute each phase in sequence, verify gates, and maintain audit trail throughout.*
