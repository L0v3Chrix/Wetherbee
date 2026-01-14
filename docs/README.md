# Wetherbee Foundation - Documentation

## Winner Name Correction Project

**Date:** 2026-01-13
**Status:** Ready for Execution

---

## Document Index

| Document | Purpose | File |
|----------|---------|------|
| **PDR** | Project Definition & Roadmap | `2026-01-13-winner-name-correction-pdr.md` |
| **Workflow** | Multi-Agent System Architecture | `2026-01-13-multi-agent-workflow.md` |
| **Checklist** | Verification & QA Protocols | `2026-01-13-verification-checklist.md` |
| **Punchlist** | All 21 Winner Corrections | `2026-01-13-master-punchlist.md` |
| **Error Prevention** | Safety Protocols | `2026-01-13-error-prevention-protocol.md` |

---

## Quick Start

### 1. Read the PDR First
Start with `2026-01-13-winner-name-correction-pdr.md` for the complete project overview.

### 2. Review the Punchlist
Check `2026-01-13-master-punchlist.md` for all 21 corrections needed.

### 3. Follow Error Prevention Protocol
Before making ANY changes, read `2026-01-13-error-prevention-protocol.md`.

### 4. Execute Using Workflow
Follow `2026-01-13-multi-agent-workflow.md` for step-by-step execution.

### 5. Verify Using Checklist
Use `2026-01-13-verification-checklist.md` to ensure quality.

---

## Project Summary

**Problem:** All 21 scholarship winner names are incorrect placeholders.

**Solution:** Multi-agent workflow to extract correct names from check images and update the data file with full verification.

**Key Stats:**
- 21 winners to correct
- 17 high-confidence corrections
- 4 items requiring human review (IDs: 5, 15, 16, 18)
- 5 verification phases
- Multiple rollback options

---

## Directory Structure

```
docs/
├── README.md                              # This file
├── 2026-01-13-winner-name-correction-pdr.md   # Master project document
├── 2026-01-13-multi-agent-workflow.md         # Execution workflow
├── 2026-01-13-verification-checklist.md       # QA checklists
├── 2026-01-13-master-punchlist.md             # All 21 corrections
├── 2026-01-13-error-prevention-protocol.md    # Safety protocols
├── backups/                               # Data file backups (create before execution)
└── audit/                                 # Audit trail (create during execution)
    ├── before/                            # Screenshots before changes
    └── after/                             # Screenshots after changes
```

---

## Execution Phases

1. **Pre-Flight** - Backup, verify environment
2. **Extraction** - Read names from check images (already done)
3. **Verification** - Confirm all extractions
4. **Update** - Apply corrections one by one
5. **QA** - Full testing and visual verification
6. **Commit** - Git commit with audit trail

---

## Human Review Required

The following items need human verification before updating:

| ID | Image | Issue |
|----|-------|-------|
| 5 | IMG_0817 | Oxford House name unclear |
| 15 | IMG_0827 | Individual name unclear on check |
| 16 | IMG_0828 | Image quality - verify name |
| 18 | IMG_0830 | Check details difficult to read |

---

## Emergency Recovery

If anything goes wrong:

```bash
# Restore from backup
cp docs/backups/sample-winners-*.ts site/lib/data/sample-winners.ts

# Or use git
git checkout HEAD -- site/lib/data/sample-winners.ts
```

---

**Last Updated:** 2026-01-13
