import PDFDocument from 'pdfkit';
import Certificate from '../models/certificateModel.js';

export const generateCertificate = async (req, res) => {
    try {
        const { certificateId } = req.params;
        const certificate = await Certificate.findOne({ certificateId });

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        const doc = new PDFDocument();
        let filename = `Certificate-${certificateId}.pdf`;
        filename = encodeURIComponent(filename);

        // Set headers to display the PDF in a new window
        res.setHeader('Content-disposition', `inline; filename="${filename}"`);
        res.setHeader('Content-type', 'application/pdf');

        doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text(`This is to certify that`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text(`${certificate.studentName}`, { align: 'center', underline: true });
        doc.moveDown();
        doc.fontSize(20).text(`has successfully completed the internship in`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text(`${certificate.domain}`, { align: 'center', underline: true });
        doc.moveDown();
        doc.fontSize(20).text(`from ${new Date(certificate.startDate).toLocaleDateString()} to ${new Date(certificate.endDate).toLocaleDateString()}`, { align: 'center' });
        doc.moveDown();
        doc.fontSize(20).text(`Duration: ${certificate.duration} months`, { align: 'center' });

        doc.end();
        doc.pipe(res);
    } catch (error) {
        res.status(500).json({ message: 'Error generating certificate', error });
    }
};