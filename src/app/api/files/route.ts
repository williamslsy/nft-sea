// app/api/files/route.ts

import { NextRequest, NextResponse } from 'next/server';

const keyRestrictions = {
  keyName: 'Signed Upload JWT',
  maxUses: 1,
  permissions: {
    endpoints: {
      data: {
        pinList: false,
        userPinnedDataTotal: false,
      },
      pinning: {
        pinFileToIPFS: true,
        pinJSONToIPFS: true,
        pinJobs: false,
        unpin: false,
        userPinPolicy: false,
      },
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: JSON.stringify(keyRestrictions),
    };

    const jwtResponse = await fetch('https://api.pinata.cloud/users/generateApiKey', options);
    if (!jwtResponse.ok) {
      throw new Error(`Failed to fetch JWT: ${jwtResponse.statusText}`);
    }

    const json = await jwtResponse.json();
    const { JWT } = json;

    // Send just the JWT token as a text response
    return new NextResponse(JWT, {
      status: 200, // Explicitly set the status if needed
      headers: {
        'Content-Type': 'text/plain', // Set the content type to text/plain
      },
    });
  } catch (error: any) {
    console.error('Error generating JWT:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
