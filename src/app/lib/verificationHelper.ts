// ========================================
// FILE: app/lib/verificationHelper.ts
// ========================================

// Helper function to check if location has verified shower reviews
export function hasVerifiedShowerReviews(location: any): boolean {
  // Use showerReviewCount as the verification criteria
  return location.showerReviewCount > 0;
}