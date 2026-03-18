// src/app/api/contact/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, subject, message } = body;

    await resend.emails.send({
      from: "Riva Zegrze <onboarding@resend.dev>",
      to: "kontakt@rivazegrze.pl",
      subject: `Nowe zapytanie: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #303249;">Nowe zapytanie z formularza</h2>
          <hr style="border-color: #E8E2D9;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Imię i nazwisko:</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">E-mail:</td><td style="padding: 8px 0; font-weight: bold;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Telefon:</td><td style="padding: 8px 0; font-weight: bold;">${phone}</td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #666;">Firma:</td><td style="padding: 8px 0; font-weight: bold;">${company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #666;">Temat:</td><td style="padding: 8px 0; font-weight: bold;">${subject}</td></tr>
          </table>
          <hr style="border-color: #E8E2D9;" />
          <h3 style="color: #303249;">Wiadomość:</h3>
          <p style="color: #444; line-height: 1.6;">${message}</p>
          <hr style="border-color: #E8E2D9;" />
          <p style="color: #999; font-size: 12px;">Wiadomość wysłana z formularza na rivazegrze.pl</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Błąd wysyłania" }, { status: 500 });
  }
}
