import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UsePipes,
  Res,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from '../../services/pdf/pdf.service';
import { GeneratePdfDto } from '../../services/dto/generate-pdf.dto';

//http://localhost:3001/api/pdf
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Get('/create-and-return')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  )
  async getPDF(
    @Res() res: Response,
    @Body() generatePdfDto: GeneratePdfDto,
  ): Promise<void> {
    const buffer = await this.pdfService.generatePdf(generatePdfDto);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=certificate.pdf',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
