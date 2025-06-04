import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);
const sender = process.env.RESEND_SENDER_EMAIL || 'onboarding@resend.dev';

export async function sendInviteCodesEmail({
  to,
  codes,
  quantity
}: {
  to: string;
  codes: string[];
  quantity: number;
}) {
  const html = `
    <h2>Your Invite Code${quantity > 1 ? 's' : ''}</h2>
    <p>Thank you for your purchase! Here ${quantity > 1 ? 'are your invite codes' : 'is your invite code'}:</p>
    <ul>
      ${codes.map(code => `<li><code>${code}</code></li>`).join('')}
    </ul>
    <p>Enjoy!</p>
  `;
  return resend.emails.send({
    from: sender,
    to,
    subject: `Your Invite Code${quantity > 1 ? 's' : ''} for href.lol`,
    html,
  });
} 