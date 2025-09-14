// Safe JSON parsing utility with robust error handling
// Handles OpenRouter API responses and other JSON parsing scenarios

export interface SafeJsonParseResult<T = any> {
  success: boolean
  data?: T
  error?: string
  rawText?: string
}

/**
 * Safely parses JSON with comprehensive error handling
 * Handles common issues like non-JSON responses, malformed JSON, and encoding problems
 */
export async function safeJsonParse<T = any>(
  response: Response,
  fallbackData?: T
): Promise<SafeJsonParseResult<T>> {
  try {
    // First, get the raw text
    const rawText = await response.text()
    
    if (!rawText || rawText.trim().length === 0) {
      return {
        success: false,
        error: 'Empty response received',
        rawText: rawText || ''
      }
    }

    // Clean the text to handle common issues
    const cleanText = cleanJsonText(rawText)
    
    if (!cleanText) {
      return {
        success: false,
        error: 'No valid JSON content found after cleaning',
        rawText
      }
    }

    // Attempt to parse the cleaned JSON
    const parsed = JSON.parse(cleanText)
    
    return {
      success: true,
      data: parsed,
      rawText
    }
    
  } catch (error) {
    console.error('JSON parsing failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      responseStatus: response.status,
      responseHeaders: Object.fromEntries(response.headers.entries()),
      rawText: await response.text().catch(() => 'Could not read response text')
    })
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown parsing error',
      data: fallbackData,
      rawText: await response.text().catch(() => 'Could not read response text')
    }
  }
}

/**
 * Cleans JSON text to handle common formatting issues
 */
function cleanJsonText(text: string): string | null {
  if (!text || typeof text !== 'string') {
    return null
  }

  // Remove any leading/trailing whitespace
  let cleaned = text.trim()
  
  // Handle cases where response might be wrapped in HTML or other content
  // Look for JSON object or array patterns
  const jsonObjectMatch = cleaned.match(/\{[\s\S]*\}/)
  const jsonArrayMatch = cleaned.match(/\[[\s\S]*\]/)
  
  if (jsonObjectMatch) {
    cleaned = jsonObjectMatch[0]
  } else if (jsonArrayMatch) {
    cleaned = jsonArrayMatch[0]
  }
  
  // Remove any non-JSON prefixes (common with some APIs)
  cleaned = cleaned.replace(/^[^{[]*/, '')
  cleaned = cleaned.replace(/[^}\]]*$/, '')
  
  // Handle escaped characters and encoding issues
  cleaned = cleaned
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
  
  // Validate that we have something that looks like JSON
  if (!cleaned.match(/^[\s]*[\{\[]/)) {
    return null
  }
  
  return cleaned
}

/**
 * Validates that a parsed object has the expected structure
 */
export function validateJsonStructure<T>(
  data: any,
  requiredFields: (keyof T)[],
  typeName: string = 'object'
): data is T {
  if (!data || typeof data !== 'object') {
    console.error(`Invalid ${typeName}: not an object`, data)
    return false
  }
  
  for (const field of requiredFields) {
    if (!(field in data)) {
      console.error(`Invalid ${typeName}: missing required field '${String(field)}'`, data)
      return false
    }
  }
  
  return true
}

/**
 * Creates a fallback response for failed API calls
 */
export function createFallbackResponse<T>(
  error: string,
  fallbackData?: T
): SafeJsonParseResult<T> {
  return {
    success: false,
    error,
    data: fallbackData
  }
}

/**
 * Handles OpenRouter API specific response parsing
 */
export async function parseOpenRouterResponse<T = any>(
  response: Response,
  fallbackData?: T
): Promise<SafeJsonParseResult<T>> {
  const result = await safeJsonParse<T>(response, fallbackData)
  
  if (!result.success) {
    // Create a more specific error message for OpenRouter
    const status = response.status
    let errorMessage = 'Failed to parse OpenRouter response'
    
    if (status === 401) {
      errorMessage = 'OpenRouter API authentication failed'
    } else if (status === 429) {
      errorMessage = 'OpenRouter API rate limit exceeded'
    } else if (status >= 500) {
      errorMessage = 'OpenRouter API server error'
    } else if (status >= 400) {
      errorMessage = 'OpenRouter API client error'
    }
    
    return {
      success: false,
      error: `${errorMessage}: ${result.error}`,
      data: fallbackData,
      rawText: result.rawText
    }
  }
  
  return result
}
