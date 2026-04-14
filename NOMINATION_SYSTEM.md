# Nomination System for Jester-Vote

## Overview
Complete nomination system with duplicate detection, approval queue, admin dashboard, and email notifications.

## Features Implemented

### 1. Nomination Form with Validation (`client/src/components/NominationForm.tsx`)
- Real-time duplicate name checking with debounce
- Form validation for name (2-128 chars), description (max 1000 chars)
- URL validation for image and streamer URLs
- Category selection (lolcow, jester, controversial, other)
- Visual feedback for available/duplicate names
- Character counters

### 2. Nominee Submission Flow with Approval Queue
- Protected submission endpoint (`nominees.submit`)
- Automatic duplicate detection before submission
- All submissions go to "pending" status
- User can view their nomination history (`nominees.myNominations`)

### 3. Admin Dashboard (`client/src/pages/AdminPage.tsx`)
- Statistics overview (total, pending, approved, rejected counts)
- Pending nominees list with full details
- Approve action with optional reason
- Reject action with required reason
- Email notifications on approval/rejection

### 4. Email Notifications (`server/email.ts`)
- Admin notification when new nomination submitted
- User notification when nomination approved
- User notification when nomination rejected (with reason)
- Configurable via environment variables

### 5. Duplicate Detection
- Case-insensitive name matching
- Real-time check via `nominees.checkDuplicate` endpoint
- Shows existing nominee status (approved/pending)
- Prevents duplicate submissions at API level

## Backend Endpoints Added/Updated

### `server/routers.ts`
```typescript
// Nominees router
nominees.submit         // Submit new nominee (protected)
nominees.checkDuplicate // Check if name exists (protected)
nominees.myNominations  // Get user's submissions (protected)

// Admin router
admin.pendingNominees   // List pending nominees (admin)
admin.approve           // Approve with optional reason (admin)
admin.reject            // Reject with required reason (admin)
admin.stats             // Get nomination statistics (admin)
```

### `server/db.ts`
```typescript
findNomineeByName(name)      // Case-insensitive duplicate check
getUserNominations(userId) // Get user's nomination history
```

### `server/email.ts`
```typescript
sendNominationNotification(data)  // Notify admins of new submission
sendApprovalNotification(data)    // Notify user of approval/rejection
```

## Frontend Components

### `client/src/components/NominationForm.tsx`
- Self-contained form with validation
- Real-time duplicate checking
- Category selection
- Image preview
- Error handling with toast notifications

### `client/src/components/MyNominations.tsx`
- Shows user's submission history
- Status badges (pending/approved/rejected)
- Links to approved nominees
- Collapsible in SubmitPage

### `client/src/pages/SubmitPage.tsx`
- Updated to use NominationForm component
- Split layout with guidelines sidebar
- My Nominations history panel
- Success state after submission

### `client/src/pages/AdminPage.tsx`
- Statistics dashboard
- Pending nominees queue
- Approval/Rejection workflow
- Required rejection reasons
- Email notification integration

## Environment Variables Added

```bash
# Email configuration (optional)
APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
EMAIL_API_KEY=sendgrid_or_resend_key
EMAIL_FROM=noreply@jestervote.com
```

## Database Schema
Uses existing `nominees` table with fields:
- `id`, `name`, `description`, `imageUrl`
- `status` (pending/approved/rejected)
- `submittedByUserId` (links to users table)
- `createdAt`, `updatedAt`

## Usage Flow

1. **User submits nomination:**
   - Types name → real-time duplicate check
   - Fills description, image URL, streamer URL
   - Selects category
   - Submits → goes to pending queue

2. **Admin reviews:**
   - Views pending nominees on Admin page
   - Sees stats dashboard
   - Approves or rejects with reason
   - Email sent to submitter

3. **User sees result:**
   - Approved nominees appear on leaderboard
   - User gets email notification
   - Can view status in "My Nominations"

## Build Status
✅ TypeScript compilation: PASSED
✅ Production build: SUCCESS

## Next Steps (Optional)
- Configure actual email service (SendGrid, Resend, AWS SES)
- Add image upload instead of URL input
- Add nominee edit/delete for admins
- Add bulk approval/rejection
- Add nomination voting/commenting
