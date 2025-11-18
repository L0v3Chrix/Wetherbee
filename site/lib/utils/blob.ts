import { put, del } from '@vercel/blob'

// Upload image to Vercel Blob storage
export async function uploadWinnerPhoto(file: File): Promise<string> {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, or WebP image.')
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB in bytes
  if (file.size > maxSize) {
    throw new Error('File too large. Please upload an image smaller than 10MB.')
  }

  // Generate unique filename
  const timestamp = Date.now()
  const filename = `winners/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  // Upload to Vercel Blob
  const blob = await put(filename, file, {
    access: 'public',
    addRandomSuffix: true,
  })

  return blob.url
}

// Delete image from Vercel Blob storage
export async function deleteWinnerPhoto(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error('Failed to delete photo:', error)
    // Don't throw - allow graceful degradation
  }
}

// Get optimized image URL (Vercel handles optimization automatically)
export function getOptimizedImageUrl(url: string, width?: number): string {
  if (!width) return url

  // Vercel's automatic image optimization will handle this via next/image
  return url
}
