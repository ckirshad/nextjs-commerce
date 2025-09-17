import { render, screen } from '@testing-library/react'
import Price from '../price'

describe('Price Component', () => {
  it('renders price with USD currency', () => {
    render(<Price amount="10.99" currencyCode="USD" />)
    
    const priceElement = screen.getByText(/\$10\.99/)
    expect(priceElement).toBeInTheDocument()
    
    const currencyCode = screen.getByText('USD')
    expect(currencyCode).toBeInTheDocument()
  })

  it('renders price with EUR currency', () => {
    render(<Price amount="25.50" currencyCode="EUR" />)
    
    const priceElement = screen.getByText(/€25\.50/)
    expect(priceElement).toBeInTheDocument()
    
    const currencyCode = screen.getByText('EUR')
    expect(currencyCode).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Price amount="15.99" currencyCode="USD" className="custom-class" />)
    
    const priceElement = screen.getByText(/\$15\.99/).closest('p')
    expect(priceElement).toHaveClass('custom-class')
  })

  it('applies custom currencyCodeClassName', () => {
    render(
      <Price 
        amount="20.00" 
        currencyCode="USD" 
        currencyCodeClassName="text-red-500" 
      />
    )
    
    const currencyCodeElement = screen.getByText('USD')
    expect(currencyCodeElement).toHaveClass('text-red-500')
  })

  it('formats decimal amounts correctly', () => {
    render(<Price amount="0.99" currencyCode="USD" />)
    
    const priceElement = screen.getByText(/\$0\.99/)
    expect(priceElement).toBeInTheDocument()
  })

  it('formats large amounts correctly', () => {
    render(<Price amount="1999.99" currencyCode="USD" />)
    
    const priceElement = screen.getByText(/\$1,999\.99/)
    expect(priceElement).toBeInTheDocument()
  })

  it('handles zero amount', () => {
    render(<Price amount="0" currencyCode="USD" />)
    
    const priceElement = screen.getByText(/\$0\.00/)
    expect(priceElement).toBeInTheDocument()
  })
})
