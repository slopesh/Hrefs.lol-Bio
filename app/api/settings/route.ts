import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the settings.json file
const settingsFilePath = path.join(process.cwd(), 'settings.json');

// GET request handler to fetch settings
export async function GET() {
  try {
    const fileContents = await fs.readFile(settingsFilePath, 'utf8');
    const settings = JSON.parse(fileContents);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ message: 'Error fetching settings' }, { status: 500 });
  }
}

// PUT request handler to update settings
export async function PUT(request: Request) {
  try {
    const settings = await request.json();
    await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), 'utf8');
    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ message: 'Error updating settings' }, { status: 500 });
  }
} 