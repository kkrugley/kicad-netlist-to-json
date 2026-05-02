import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.endsWith('.net')) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload a .net file' },
        { status: 400 }
      );
    }

    const content = await file.text();

    const kicadNetlistToJson = require('kicad-netlist-to-json');
    const result = kicadNetlistToJson(content);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert netlist file' },
      { status: 500 }
    );
  }
}