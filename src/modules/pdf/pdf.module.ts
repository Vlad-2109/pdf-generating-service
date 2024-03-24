import { Module } from '@nestjs/common';
import { PdfService } from '../../services/pdf/pdf.service';
import { PdfController } from '../../controllers/pdf/pdf.controller';

@Module({
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
