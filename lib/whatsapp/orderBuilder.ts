interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  total?: number
}

interface OrderData {
  orderNumber: string
  customerName: string
  customerPhone: string
  items: CartItem[]
  subtotal: number
  discountAmount?: number
  deliveryFee?: number
  total: number
  deliveryMethod: 'delivery' | 'pickup'
  address?: string
  city?: string
  region?: string
  notes?: string
}

export function buildWhatsAppMessage(order: OrderData): string {
  const formatPrice = (n: number) =>
    `GHS ${n.toLocaleString('en-GH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const itemLines = order.items
    .map(item => `${item.quantity} × ${item.name}\n${formatPrice(item.total ?? (item.price * item.quantity))}`)
    .join('\n\n')

  const deliveryLine =
    order.deliveryMethod === 'pickup'
      ? 'Store Pickup — Adabraka, Accra'
      : [order.address, order.city, order.region].filter(Boolean).join(', ')

  let message = `CAPRIOLE PERFUMES\nORDER REQUEST\n\n`
  message += `Order:\n#${order.orderNumber}\n\n`
  message += `Customer:\n${order.customerName}\n\n`
  message += `Phone:\n${order.customerPhone}\n\n`
  message += `Items:\n\n${itemLines}\n\n`
  message += `Subtotal:\n${formatPrice(order.subtotal)}\n`

  if (order.discountAmount && order.discountAmount > 0) {
    message += `\nDiscount:\n-${formatPrice(order.discountAmount)}\n`
  }

  if (order.deliveryFee && order.deliveryFee > 0) {
    message += `\nDelivery:\n${formatPrice(order.deliveryFee)}\n`
  }

  message += `\nTotal:\n${formatPrice(order.total)}\n\n`
  message += `Delivery:\n${deliveryLine}\n`

  if (order.notes) {
    message += `\nNotes:\n${order.notes}\n`
  }

  message += `\nPlease confirm my order and delivery details.`

  return message
}

export function buildWhatsAppUrl(whatsappNumber: string, order: OrderData): string {
  const message = buildWhatsAppMessage(order)
  const encoded = encodeURIComponent(message)
  const number = whatsappNumber.replace(/[^0-9]/g, '')
  return `https://wa.me/${number}?text=${encoded}`
}

export function generateOrderNumber(lastOrderNum?: number): string {
  const num = (lastOrderNum ?? 1000) + 1
  return `CP-${num}`
}
