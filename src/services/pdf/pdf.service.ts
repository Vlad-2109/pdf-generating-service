import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { GeneratePdfDto } from '../dto/generate-pdf.dto';

@Injectable()
export class PdfService {
  async generatePdf(generatePdfSchema: GeneratePdfDto): Promise<Buffer> {
    const { userName, instructorName, durationOfCourseInHours } = generatePdfSchema;
    
    const courseDuration = `${durationOfCourseInHours} Total hours`;

    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const currentDate = new Date();
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const monthName = monthNames[currentDate.getMonth()];
      const dayOfMonth = currentDate.getDate();
      const year = currentDate.getFullYear();

      const formattedDate = `${monthName} ${dayOfMonth}, ${year}`;

      const doc = new PDFDocument({
        size: [595, 400],
        bufferPages: true,
      });

      doc.rect(0, 0, 595, 400).fill('#f8f8f8');

      doc.image('img/edu.jpeg', 50, 50, { width: 75, height: 50 });

      doc
        .fillColor('#919598') 
        .font('Times-Roman')
        .fontSize(10) 
        .text('CERTIFICATE OF COMPLETION', 50, 125);

      doc
        .fillColor('#1c1d1f') 
        .font('Helvetica-BoldOblique')
        .fontSize(25) 
        .text(
          'Mastering Education with Interview Questions, eduStore Project-2024',
          50,
          150,
        );

      doc
        .fillColor('#858688') 
        .font('Times-Roman')
        .fontSize(8) 
        .text('Instructors', 50, 215);

      doc
        .fillColor('#242527') 
        .font('Times-Bold')
        .fontSize(8) 
        .text(instructorName, 90, 215);

      doc
        .fillColor('#1c1d1f')
        .font('Helvetica-Bold')
        .fontSize(20)
        .text(userName, 50, 280);

      doc
        .fillColor('#858688') 
        .font('Times-Roman')
        .fontSize(8) 
        .text('Date', 50, 305);

      doc
        .fillColor('#242527') 
        .font('Times-Bold')
        .fontSize(8) 
        .text(formattedDate, 70, 305);

      doc
        .fillColor('#858688') 
        .font('Times-Roman')
        .fontSize(8) 
        .text('Length', 50, 315);

      doc
        .fillColor('#242527') 
        .font('Times-Bold')
        .fontSize(8) 
        .text(courseDuration, 80, 315);

      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
