# Error Prevention Protocol
## Winner Name Correction System

**Document:** WF-ERROR-PREVENTION-2026-01-13
**Priority:** CRITICAL
**Status:** Active

---

## 1. Fail-Safe Design Principles

### Core Philosophy
> **"No change is applied until it is verified. No set of changes is committed until all are verified. Recovery is always possible."**

### Key Principles

1. **Atomic Operations** - Each change is independent and reversible
2. **Fail Fast** - Stop immediately on any error
3. **Verify Before Commit** - Build must pass after each change
4. **Backup First** - Always create backup before any modification
5. **Human Gates** - Critical decisions require human approval
6. **Audit Trail** - Every action is logged

---

## 2. Pre-Execution Safety Checks

### Mandatory Pre-Flight Checklist

```bash
# SAFETY CHECK SCRIPT
# Run ALL checks before any modifications

echo "=== PRE-FLIGHT SAFETY CHECKS ==="

# Check 1: Git status clean
if [[ -n $(git status --porcelain) ]]; then
    echo "ERROR: Git working directory not clean"
    echo "ACTION: Commit or stash changes first"
    exit 1
fi
echo "✓ Git status clean"

# Check 2: On correct branch
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" != "main" ]]; then
    echo "WARNING: Not on main branch (current: $BRANCH)"
    read -p "Continue? (y/n) " -n 1 -r
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then exit 1; fi
fi
echo "✓ Branch verified: $BRANCH"

# Check 3: TypeScript compiles
cd site
if ! pnpm exec tsc --noEmit; then
    echo "ERROR: TypeScript compilation failed"
    echo "ACTION: Fix TypeScript errors before proceeding"
    exit 1
fi
echo "✓ TypeScript compiles"

# Check 4: Build succeeds
if ! pnpm build; then
    echo "ERROR: Build failed"
    echo "ACTION: Fix build errors before proceeding"
    exit 1
fi
echo "✓ Build succeeds"

# Check 5: Data file exists
if [[ ! -f "lib/data/sample-winners.ts" ]]; then
    echo "ERROR: sample-winners.ts not found"
    exit 1
fi
echo "✓ Data file exists"

# Check 6: All images exist
IMAGE_COUNT=$(ls public/winners/*.JPG 2>/dev/null | wc -l)
if [[ $IMAGE_COUNT -ne 21 ]]; then
    echo "ERROR: Expected 21 images, found $IMAGE_COUNT"
    exit 1
fi
echo "✓ All 21 images present"

echo ""
echo "=== ALL PRE-FLIGHT CHECKS PASSED ==="
echo "Safe to proceed with modifications"
```

---

## 3. Backup Protocol

### Backup Creation (MANDATORY)

```bash
# Create timestamped backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/Users/chrixcolvard/projects/clients/wetherbee-foundation/docs/backups"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Create backup with timestamp
cp site/lib/data/sample-winners.ts "$BACKUP_DIR/sample-winners-$TIMESTAMP.ts"

# Verify backup
if diff site/lib/data/sample-winners.ts "$BACKUP_DIR/sample-winners-$TIMESTAMP.ts" > /dev/null; then
    echo "✓ Backup created: sample-winners-$TIMESTAMP.ts"
else
    echo "ERROR: Backup verification failed"
    exit 1
fi

# Create git tag for rollback point
git tag "pre-name-correction-$TIMESTAMP"
echo "✓ Git tag created: pre-name-correction-$TIMESTAMP"
```

### Backup Verification

| Check | Command | Expected |
|-------|---------|----------|
| Backup exists | `ls docs/backups/sample-winners-*.ts` | At least 1 file |
| Backup matches | `diff` original vs backup | No differences |
| Backup readable | `cat docs/backups/sample-winners-*.ts` | Valid TypeScript |
| Git tag exists | `git tag -l "pre-name-correction-*"` | Tag listed |

---

## 4. Per-Change Safety Protocol

### For EACH Winner Update

```typescript
// Pseudo-code for safe update process

async function safeUpdate(winnerId: string, newName: string): Promise<boolean> {
  // Step 1: Read current state
  const currentData = await readFile('sample-winners.ts');
  const currentWinner = parseWinner(currentData, winnerId);

  // Step 2: Log intended change
  log(`CHANGE: Winner ${winnerId}`);
  log(`  FROM: ${currentWinner.name}`);
  log(`  TO:   ${newName}`);

  // Step 3: Apply change
  const updatedData = applyChange(currentData, winnerId, newName);

  // Step 4: Write to file
  await writeFile('sample-winners.ts', updatedData);

  // Step 5: IMMEDIATE VERIFICATION
  const tsCheck = await exec('pnpm exec tsc --noEmit');
  if (tsCheck.exitCode !== 0) {
    // ROLLBACK IMMEDIATELY
    await writeFile('sample-winners.ts', currentData);
    log('ERROR: TypeScript check failed, ROLLED BACK');
    return false;
  }

  // Step 6: Verify change applied correctly
  const verifyData = await readFile('sample-winners.ts');
  if (!verifyData.includes(`name: '${newName}'`)) {
    await writeFile('sample-winners.ts', currentData);
    log('ERROR: Change not found in file, ROLLED BACK');
    return false;
  }

  log(`✓ Winner ${winnerId} updated successfully`);
  return true;
}
```

### Change Verification Checklist

After EACH individual change:

| # | Check | Method | Pass Criteria |
|---|-------|--------|---------------|
| 1 | TypeScript valid | `tsc --noEmit` | Exit code 0 |
| 2 | Name appears in file | grep for new name | Found |
| 3 | Old name removed | grep for old name | Not found (in that entry) |
| 4 | Array length same | count entries | 21 |
| 5 | File syntax valid | parse as TS | No errors |

---

## 5. Error Detection & Response

### Error Categories and Responses

| Error Type | Detection | Response | Recovery |
|------------|-----------|----------|----------|
| TypeScript Error | tsc fails | Stop immediately | Restore from pre-change state |
| File Write Error | writeFile throws | Stop immediately | File unchanged |
| Syntax Error | parse fails | Stop immediately | Restore backup |
| Wrong Entry Changed | verify shows unexpected change | Stop immediately | Restore backup |
| Missing Entry | count !== 21 | Stop immediately | Restore backup |
| Build Failure | build exits non-zero | Stop, investigate | May need manual fix |

### Error Response Protocol

```
ERROR DETECTED
    │
    ├── Is file still valid TypeScript?
    │   ├── YES → Stop further changes, investigate
    │   └── NO → IMMEDIATE ROLLBACK
    │
    └── After rollback:
        ├── Verify backup restored correctly
        ├── Run tsc to confirm valid state
        ├── Document what caused the error
        └── Do NOT retry without understanding cause
```

---

## 6. Rollback Procedures

### Immediate Rollback (Single Change)

```bash
# If last change was problematic
git checkout -- site/lib/data/sample-winners.ts

# Verify rollback
pnpm exec tsc --noEmit
echo "✓ Rolled back to last committed state"
```

### Full Rollback (From Backup)

```bash
# Get latest backup
LATEST_BACKUP=$(ls -t docs/backups/sample-winners-*.ts | head -1)

# Restore
cp "$LATEST_BACKUP" site/lib/data/sample-winners.ts

# Verify
pnpm exec tsc --noEmit
pnpm build

echo "✓ Restored from backup: $LATEST_BACKUP"
```

### Git Tag Rollback

```bash
# Find rollback point
git tag -l "pre-name-correction-*"

# Restore to tag
TAG="pre-name-correction-YYYYMMDD_HHMMSS"
git checkout $TAG -- site/lib/data/sample-winners.ts

# Verify
pnpm exec tsc --noEmit
```

---

## 7. Human Verification Gates

### Gate 1: Pre-Execution Approval

**Before ANY changes:**
- [ ] PDR document reviewed and approved
- [ ] Punchlist reviewed for accuracy
- [ ] Backup created and verified
- [ ] All pre-flight checks passed

**Approval Required From:** Project Owner

---

### Gate 2: Low-Confidence Items

**Before updating items #5, #15, #16, #18:**
- [ ] Human has manually verified name from check image
- [ ] Correct name written in punchlist
- [ ] Both name AND house verified

**Approval Required From:** Human reviewer with image access

---

### Gate 3: Pre-Commit Approval

**Before git commit:**
- [ ] All 21 changes applied
- [ ] TypeScript compiles
- [ ] Build succeeds
- [ ] Visual inspection passed
- [ ] Git diff reviewed (only expected changes)

**Approval Required From:** Developer + QA reviewer

---

## 8. Testing Protocol

### Incremental Testing

After every 5 changes:
```bash
# Run TypeScript check
pnpm exec tsc --noEmit

# If fails, identify which of last 5 changes caused issue
# Roll back and fix before continuing
```

### Full Testing (After All Changes)

```bash
# Complete test suite
cd site

# 1. TypeScript
pnpm exec tsc --noEmit
echo "Test 1: TypeScript ✓"

# 2. Lint
pnpm lint
echo "Test 2: Lint ✓"

# 3. Build
pnpm build
echo "Test 3: Build ✓"

# 4. Start dev server
pnpm dev &
DEV_PID=$!
sleep 5

# 5. Check page loads
curl -s http://localhost:3000 > /dev/null
if [ $? -eq 0 ]; then
    echo "Test 4: Dev server ✓"
else
    echo "Test 4: Dev server FAILED"
fi

# 6. Kill dev server
kill $DEV_PID

echo ""
echo "=== ALL TESTS COMPLETED ==="
```

---

## 9. Audit Trail Requirements

### Required Logs

| Log File | Contents | Created When |
|----------|----------|--------------|
| `workflow-start.log` | Pre-flight check results | Before changes |
| `backup-created.log` | Backup file path, verification | After backup |
| `changes.log` | Each change with before/after | During updates |
| `ts-checks.log` | Each TypeScript check result | After each change |
| `qa-results.log` | Final QA test results | After all changes |
| `completion.log` | Final status, commit hash | After commit |

### Log Format

```json
{
  "timestamp": "2026-01-13T10:30:45.123Z",
  "action": "UPDATE_WINNER",
  "winnerId": "1",
  "before": {
    "name": "Michael R.",
    "oxfordHouse": "Austin House"
  },
  "after": {
    "name": "Shara S.",
    "oxfordHouse": "OH Honeybear"
  },
  "verification": {
    "tsCheck": "PASS",
    "fileVerified": true
  },
  "status": "SUCCESS"
}
```

---

## 10. Emergency Procedures

### If Everything Goes Wrong

```bash
# EMERGENCY RECOVERY PROCEDURE

# 1. Stop all operations
echo "EMERGENCY STOP - Do not continue"

# 2. Check current file state
pnpm exec tsc --noEmit
# If this fails, file is corrupted

# 3. Restore from backup
BACKUP=$(ls -t docs/backups/sample-winners-*.ts | head -1)
cp "$BACKUP" site/lib/data/sample-winners.ts

# 4. Verify restoration
pnpm exec tsc --noEmit
pnpm build

# 5. If still failing, use git
git checkout HEAD -- site/lib/data/sample-winners.ts

# 6. If STILL failing, use git tag
git checkout pre-name-correction-* -- site/lib/data/sample-winners.ts

# 7. Document what happened
echo "Emergency recovery at $(date)" >> docs/incident.log
```

### Contact for Escalation

If unable to recover:
1. Do NOT make additional changes
2. Document current state
3. Preserve all logs
4. Contact project owner

---

## 11. Success Criteria

### Definition of Done

All of the following must be true:

- [ ] All 21 winner names match check images
- [ ] All 21 Oxford House names match check images
- [ ] TypeScript compiles without errors
- [ ] Production build succeeds
- [ ] Visual inspection shows correct names
- [ ] Git commit is clean (only expected files changed)
- [ ] Backup files archived
- [ ] Audit logs complete
- [ ] No rollbacks required (or all rollbacks resolved)

### Sign-Off Required

| Role | Responsibility | Signed |
|------|----------------|--------|
| Developer | Code changes complete | ☐ |
| QA | All tests pass | ☐ |
| Human Reviewer | Visual verification | ☐ |
| Project Owner | Final approval | ☐ |

---

## Document Summary

This error prevention protocol ensures:

1. **No data loss** - Backups before any changes
2. **Immediate detection** - TypeScript check after each change
3. **Quick recovery** - Multiple rollback options
4. **Human oversight** - Critical decisions require approval
5. **Complete audit** - Every action logged
6. **Safe execution** - Fail-fast approach prevents cascading errors

**Follow this protocol exactly. Do not skip steps.**

---

**Protocol Version:** 1.0
**Effective Date:** 2026-01-13
**Review Date:** Before each execution
