import { NextResponse } from 'next/server';
import { getDatabaseHealth } from '@/lib/db/services/database-health-service';

export const dynamic = 'force-dynamic';

export async function GET() {
  const health = await getDatabaseHealth();
  return NextResponse.json(health, { status: health.status === 'healthy' ? 200 : 503, headers: { 'Cache-Control': 'no-store' } });
}
