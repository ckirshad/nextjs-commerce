import { render, screen } from '@testing-library/react'
import Label from '../label'

describe('Label Component', () => {
  const defaultProps = {
    title: 'Test Product',
    amount: '29.99',
    currencyCode: 'USD'
  }

  it('renders title and price correctly', () => {
    render(<Label {...defaultProps} />)
    
    const titleElement = screen.getByText('Test Product')
    expect(titleElement).toBeInTheDocument()
    
    const priceElement = screen.getByText(/\$29\.99/)
    expect(priceElement).toBeInTheDocument()
    
    const currencyCode = screen.getByText('USD')
    expect(currencyCode).toBeInTheDocument()
  })

  it('applies bottom position styling by default', () => {
    render(<Label {...defaultProps} />)
    
    const labelContainer = screen.getByText('Test Product').closest('div')?.parentElement
    expect(labelContainer).toHaveClass('bottom-0')
    expect(labelContainer).not.toHaveClass('lg:px-20', 'lg:pb-[35%]')
  })

  it('applies center position styling when specified', () => {
    render(<Label {...defaultProps} position="center" />)
    
    const labelContainer = screen.getByText('Test Product').closest('div')?.parentElement
    expect(labelContainer).toHaveClass('lg:px-20', 'lg:pb-[35%]')
  })

  it('renders with different currencies', () => {
    render(
      <Label 
        title="European Product"
        amount="45.50"
        currencyCode="EUR"
      />
    )
    
    const titleElement = screen.getByText('European Product')
    expect(titleElement).toBeInTheDocument()
    
    const priceElement = screen.getByText(/€45\.50/)
    expect(priceElement).toBeInTheDocument()
    
    const currencyCode = screen.getByText('EUR')
    expect(currencyCode).toBeInTheDocument()
  })

  it('handles long product titles', () => {
    const longTitle = 'This is a very long product title that should be truncated with line clamp'
    
    render(
      <Label 
        title={longTitle}
        amount="99.99"
        currencyCode="USD"
      />
    )
    
    const titleElement = screen.getByText(longTitle)
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('line-clamp-2')
  })

  it('applies correct styling classes', () => {
    render(<Label {...defaultProps} />)
    
    const outerContainer = screen.getByText('Test Product').closest('div')?.parentElement
    expect(outerContainer).toHaveClass(
      'absolute', 
      'bottom-0', 
      'left-0', 
      'flex', 
      'w-full', 
      'px-4', 
      'pb-4', 
      '@container/label'
    )

    const innerContainer = screen.getByText('Test Product').closest('div')
    expect(innerContainer).toHaveClass(
      'flex',
      'items-center',
      'rounded-full',
      'border',
      'bg-white/70',
      'p-1',
      'text-xs',
      'font-semibold',
      'text-black',
      'backdrop-blur-md',
      'dark:border-neutral-800',
      'dark:bg-black/70',
      'dark:text-white'
    )

    const titleElement = screen.getByText('Test Product')
    expect(titleElement).toHaveClass(
      'mr-4',
      'line-clamp-2',
      'grow',
      'pl-2',
      'leading-none',
      'tracking-tight'
    )
  })
})
