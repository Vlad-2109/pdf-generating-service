import { Test, TestingModule } from '@nestjs/testing';
import { PdfController } from './pdf.controller';
import { PdfService } from '../../services/pdf/pdf.service';

describe('PdfController', () => {
  let controller: PdfController;
  let service: PdfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfController],
      providers: [PdfService],
    }).compile();

    controller = module.get<PdfController>(PdfController);
    service = module.get<PdfService>(PdfService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a PDF file', async () => {
    const resMock = {
      set: jest.fn(),
      end: jest.fn(),
    };

    const generatePdfDto = {
      userName: 'Vladyslav Mykolyshyn',
      instructorName: 'Vitalik Matvieiev',
      durationOfCourseInHours: 10,
    };

    const pdfBuffer = Buffer.from('Mock PDF Buffer');

    jest.spyOn(service, 'generatePdf').mockResolvedValue(pdfBuffer);

    await controller.getPDF(resMock as any, generatePdfDto);

    expect(resMock.set).toHaveBeenCalledWith({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=certificate.pdf',
      'Content-Length': pdfBuffer.length,
    });
    expect(resMock.end).toHaveBeenCalledWith(pdfBuffer);
  });
});
