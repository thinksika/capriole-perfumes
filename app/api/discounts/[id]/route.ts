import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma/db'

type Params = { params: Promise<{ id: string }> }

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params
  try {
    const body = await request.json()
    const discount = await prisma.discount.update({
      where: { id },
      data: {
        name: body.name,
        type: body.type,
        value: parseFloat(body.value),
        scope: body.scope,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
        active: body.active,
      },
    })
    return NextResponse.json(discount)
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params
  try {
    await prisma.discount.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
