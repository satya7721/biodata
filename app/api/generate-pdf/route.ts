import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const htmlContent = `
      <html>
        <head>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;700&display=swap');
            body {
              font-family: 'Noto Sans Devanagari', sans-serif;
              padding: 20px;
            }
            .header {
              text-align: center;
              font-size: 24px;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 20px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
            }
            .field {
              margin-bottom: 5px;
            }
            .label {
              font-weight: bold;
              margin-right: 10px;
            }
          </style>
        </head>
        <body>
          <div class="header">|| श्री गणेशाय नम: ||</div>
          
          <div class="section">
            <div class="section-title">वैयक्तिक माहिती</div>
            <div class="field"><span class="label">नाव:</span> ${data.fullName}</div>
            <div class="field"><span class="label">जन्म तारीख:</span> ${data.birthDate}</div>
            <div class="field"><span class="label">जन्म वेळ:</span> ${data.birthTime}</div>
            <div class="field"><span class="label">जन्म स्थळ:</span> ${data.birthPlace}</div>
            <div class="field"><span class="label">धर्म:</span> ${data.religion}</div>
            <div class="field"><span class="label">जात:</span> ${data.caste}</div>
            <div class="field"><span class="label">कुलदैवत:</span> ${data.kuldevta}</div>
            <div class="field"><span class="label">राशी:</span> ${data.rashi}</div>
            <div class="field"><span class="label">नक्षत्र:</span> ${data.nakshatra}</div>
            <div class="field"><span class="label">गण:</span> ${data.gan}</div>
            <div class="field"><span class="label">नाडी:</span> ${data.nadi}</div>
            <div class="field"><span class="label">मांगलिक:</span> ${data.manglik}</div>
            <div class="field"><span class="label">गोत्र:</span> ${data.gotra}</div>
            <div class="field"><span class="label">ऊंची:</span> ${data.height}</div>
            <div class="field"><span class="label">वर्ण:</span> ${data.complexion}</div>
            <div class="field"><span class="label">रक्तगट:</span> ${data.bloodGroup}</div>
          </div>
          
          <div class="section">
            <div class="section-title">शिक्षण आणि व्यवसाय</div>
            <div class="field"><span class="label">शिक्षण:</span> ${data.education}</div>
            <div class="field"><span class="label">नोकरी/व्यवसाय:</span> ${data.occupation}</div>
            <div class="field"><span class="label">वेतन/उत्पन्न:</span> ${data.income}</div>
          </div>
          
          <div class="section">
            <div class="section-title">कौटुंबिक माहिती</div>
            <div class="field"><span class="label">वडिलांचे नाव:</span> ${data.fatherName}</div>
            <div class="field"><span class="label">वडिलांचा व्यवसाय:</span> ${data.fatherOccupation}</div>
            <div class="field"><span class="label">आईचे नाव:</span> ${data.motherName}</div>
            <div class="field"><span class="label">आईचा व्यवसाय:</span> ${data.motherOccupation}</div>
            <div class="field"><span class="label">भावंडे:</span> ${data.siblings}</div>
            <div class="field"><span class="label">मामा:</span> ${data.maternalUncle}</div>
            <div class="field"><span class="label">नातेसंबंध:</span> ${data.relatives}</div>
          </div>
          
          ${data.expectations ? `<div class="section"><div class="section-title">अपेक्षा</div><div class="field"><span class="label">स्थळाकडून अपेक्षा:</span> ${data.expectations}</div></div>` : ''}
          
          <div class="section">
            <div class="section-title">संपर्क माहिती</div>
            <div class="field"><span class="label">पत्ता:</span> ${data.address}</div>
            <div class="field"><span class="label">मोबाईल नंबर:</span> ${data.mobile}</div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=biodata-${encodeURIComponent(data.fullName || 'document')}.pdf`,
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('PDF generation failed', { status: 500 });
  }
} 