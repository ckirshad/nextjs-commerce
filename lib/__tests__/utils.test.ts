import { createUrl, ensureStartsWith, validateEnvironmentVariables } from '../utils'

describe('Utils', () => {
  describe('createUrl', () => {
    it('creates URL with query parameters', () => {
      const params = new URLSearchParams()
      params.set('color', 'red')
      params.set('size', 'large')
      
      const result = createUrl('/products', params)
      expect(result).toBe('/products?color=red&size=large')
    })

    it('creates URL without query parameters', () => {
      const params = new URLSearchParams()
      
      const result = createUrl('/products', params)
      expect(result).toBe('/products')
    })

    it('handles single query parameter', () => {
      const params = new URLSearchParams()
      params.set('search', 'shoes')
      
      const result = createUrl('/search', params)
      expect(result).toBe('/search?search=shoes')
    })

    it('handles special characters in parameters', () => {
      const params = new URLSearchParams()
      params.set('query', 'men\'s shoes')
      
      const result = createUrl('/search', params)
      expect(result).toBe('/search?query=men%27s+shoes')
    })
  })

  describe('ensureStartsWith', () => {
    it('adds prefix when string does not start with it', () => {
      const result = ensureStartsWith('example.com', 'https://')
      expect(result).toBe('https://example.com')
    })

    it('does not add prefix when string already starts with it', () => {
      const result = ensureStartsWith('https://example.com', 'https://')
      expect(result).toBe('https://example.com')
    })

    it('handles empty string', () => {
      const result = ensureStartsWith('', '/')
      expect(result).toBe('/')
    })

    it('handles slash prefix', () => {
      const result = ensureStartsWith('products', '/')
      expect(result).toBe('/products')
    })

    it('handles already prefixed slash', () => {
      const result = ensureStartsWith('/products', '/')
      expect(result).toBe('/products')
    })
  })

  describe('validateEnvironmentVariables', () => {
    const originalEnv = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...originalEnv }
    })

    afterEach(() => {
      process.env = originalEnv
    })

    it('does not throw when all required environment variables are present', () => {
      process.env.SHOPIFY_STORE_DOMAIN = 'test-store.myshopify.com'
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'test-token'

      expect(() => validateEnvironmentVariables()).not.toThrow()
    })

    it('throws when SHOPIFY_STORE_DOMAIN is missing', () => {
      delete process.env.SHOPIFY_STORE_DOMAIN
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'test-token'

      expect(() => validateEnvironmentVariables()).toThrow(
        'The following environment variables are missing'
      )
    })

    it('throws when SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing', () => {
      process.env.SHOPIFY_STORE_DOMAIN = 'test-store.myshopify.com'
      delete process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

      expect(() => validateEnvironmentVariables()).toThrow(
        'The following environment variables are missing'
      )
    })

    it('throws when both required environment variables are missing', () => {
      delete process.env.SHOPIFY_STORE_DOMAIN
      delete process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

      expect(() => validateEnvironmentVariables()).toThrow(
        'SHOPIFY_STORE_DOMAIN'
      )
      expect(() => validateEnvironmentVariables()).toThrow(
        'SHOPIFY_STOREFRONT_ACCESS_TOKEN'
      )
    })

    it('throws when SHOPIFY_STORE_DOMAIN contains brackets', () => {
      process.env.SHOPIFY_STORE_DOMAIN = '[test-store].myshopify.com'
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'test-token'

      expect(() => validateEnvironmentVariables()).toThrow(
        'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets'
      )
    })

    it('throws when SHOPIFY_STORE_DOMAIN contains closing bracket', () => {
      process.env.SHOPIFY_STORE_DOMAIN = 'test-store].myshopify.com'
      process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'test-token'

      expect(() => validateEnvironmentVariables()).toThrow(
        'Your `SHOPIFY_STORE_DOMAIN` environment variable includes brackets'
      )
    })
  })
})
