import jwt from 'jsonwebtoken';

const secret = process.env.INVITE_JWT_SECRET || 'fallback_secret';

export interface InviteCodePayload {
  uses?: number; // How many times this code can be used
  exp?: number; // Expiry timestamp (seconds)
  createdBy?: string; // Who generated the code
  [key: string]: any;
}

export function generateInviteCode(payload: InviteCodePayload): string {
  // You can add more fields to payload as needed
  return jwt.sign(payload, secret, { expiresIn: payload.exp ? undefined : '30d' });
}

export function validateInviteCode(token: string): InviteCodePayload | null {
  try {
    const decoded = jwt.verify(token, secret) as InviteCodePayload;
    return decoded;
  } catch (err) {
    return null;
  }
} 