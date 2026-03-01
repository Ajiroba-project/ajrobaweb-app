import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { number, biller, type } = body

    // Get the authorization token from headers
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

    // Validate type
    const validTypes = ['airtime', 'data', 'electricity', 'cable']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid type. Must be one of: airtime, data, electricity, cable' },
        { status: 400 }
      )
    }

    // Make the API call to the external service
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/pay/save_beneficiary/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authHeader}`,
      },
      body: JSON.stringify({
        number,
        biller,
        type
      })
    })

    const data = await response.json()

  /*   console.log('External API response:', data)
    console.log('Response status:', response.status) */

    if (!response.ok) {
   /*    console.log('External API error:', data) */
      return NextResponse.json(
        { 
          status: 'failed', 
          message: data.detail || data.message || 'Failed to save beneficiary' 
        },
        { status: response.status }
      )
    }

  /*   console.log('Successfully saved beneficiary') */
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    console.error('Save beneficiary error:', error)
    return NextResponse.json(
      { status: 'failed', message: 'Internal server error' },
      { status: 500 }
    )
  }
}
