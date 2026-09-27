export interface DiscountResult {
  originalPrice: number
  discountedPrice: number
  discountAmount: number
  discountPercent: number
  hasDiscount: boolean
}

export function calculateDiscount(
  price: number,
  discountType?: string,
  discountValue?: number
): DiscountResult {
  if (!discountType || !discountValue || discountValue <= 0) {
    return {
      originalPrice: price,
      discountedPrice: price,
      discountAmount: 0,
      discountPercent: 0,
      hasDiscount: false,
    }
  }

  let discountedPrice = price
  if (discountType === 'percentage') {
    discountedPrice = price * (1 - discountValue / 100)
  } else if (discountType === 'fixed') {
    discountedPrice = Math.max(0, price - discountValue)
  }

  const discountAmount = price - discountedPrice
  const discountPercent =
    discountType === 'percentage' ? discountValue : Math.round((discountAmount / price) * 100)

  return {
    originalPrice: price,
    discountedPrice: Math.round(discountedPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    discountPercent,
    hasDiscount: true,
  }
}

export function formatPrice(amount: number, currency = 'GHS'): string {
  return `${currency} ${amount.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
