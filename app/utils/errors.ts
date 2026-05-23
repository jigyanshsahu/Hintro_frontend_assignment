



import type { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  code?: string
}

export function extractApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const axiosErr = error as AxiosError<{ message?: string; error?: string }>
    return {
      message:
        axiosErr.response?.data?.message ||
        axiosErr.response?.data?.error ||
        axiosErr.message ||
        'An unexpected error occurred',
      status: axiosErr.response?.status,
    }
  }
  if (error instanceof Error) {
    return { message: error.message }
  }
  return { message: 'An unexpected error occurred' }
}

function isAxiosError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as { isAxiosError: boolean }).isAxiosError === true
  )
}

export function getErrorMessage(error: unknown): string {
  return extractApiError(error).message
}
