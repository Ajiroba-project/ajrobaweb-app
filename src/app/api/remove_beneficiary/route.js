import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { number, biller, type } = body

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Token ', '') || authHeader?.replace('Bearer ', '') || authHeader

    if (!token) {
      return NextResponse.json(
        { status: 'failed', message: 'Authorization token is required' },
        { status: 401 }
      )
    }

    if (!number || !biller || !type) {
      return NextResponse.json(
        { status: 'failed', message: 'Missing required fields: number, biller, type' },
        { status: 400 }
      )
    }

    const validTypes = ['airtime', 'data', 'electricity', 'cable']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid type. Must be one of: airtime, data, electricity, cable' },
        { status: 400 }
      )
    }

    const response = await fetch('https://staging.ajiroba.ng/v1/pay/save_beneficiary/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authHeader}`,
      },
      body: JSON.stringify({ number, biller, type, "remove": true })
    })

    const data = await response.json()

    // console.log(data, 'dddd')
    // console.log(response, 'rrrrr')

    if (!response.ok) {
      return NextResponse.json(
        { status: 'failed', message: data.detail || data.message || 'Failed to remove beneficiary' },
        { status: response.status }
      )
    }

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Remove beneficiary error:', error)
    return NextResponse.json(
      { status: 'failed', message: 'Internal server error' },
      { status: 500 }
    )
  }
}


