package spl.question.bank.service.download;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.util.ResourceUtils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class PdfTemplate {
  public boolean createPdf() throws IOException {
    String tg = "সারা পৃথিবীতে মানুষের চিন্তা-ভাবনার জগৎটি পাল্টে দিয়েছে";
    Document document = new Document();
    String v = new String(tg.getBytes(), StandardCharsets.UTF_8);
    try {
      PdfWriter pdfWriter = PdfWriter.getInstance(document, new FileOutputStream("questions_6.pdf"));
      document.open();
      BaseFont bf = BaseFont.createFont(ResourceUtils.getFile("classpath:SiyamRupali.eot").getPath(),
          StandardCharsets.UTF_8.name(), BaseFont.EMBEDDED);
      Font font = new Font(bf, 12);
      document.add(new Paragraph(v));
      document.close();
      pdfWriter.close();
    } catch (DocumentException | FileNotFoundException e) {
      e.printStackTrace();
      return false;
    }
    return true;
  }
}
