package spl.question.bank.service.download;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.AreaBreak;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.font.FontProvider;
import com.itextpdf.layout.font.FontSet;
import com.itextpdf.layout.property.Property;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.licensekey.LicenseKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import spl.question.bank.database.model.CQQuestion;
import spl.question.bank.database.model.QuestionPaper;
import spl.question.bank.model.moderator.ExamType;
import spl.question.bank.model.question.mcq.*;

import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Slf4j
public class PdfService {
  private final String arialUni;
  private final String notoSerif;
  private final String notoSans;
  private StringBuilder answerSheet;

  public PdfService() throws FileNotFoundException {
    this.arialUni = ResourceUtils.getFile("classpath:fonts/ARIALUNI.TTF").getPath();
    this.notoSerif =
        ResourceUtils.getFile("classpath:fonts/NotoSerifBengali-Regular.ttf").getPath();
    this.notoSans = ResourceUtils.getFile("classpath:fonts/NotoSansBengali-Light.ttf").getPath();
  }

  public void createMcqPdf(
      HttpServletResponse response, List<MCQDto> mcqs, QuestionPaper paperDetails)
      throws IOException {
    final String licenceFile = ResourceUtils.getFile("classpath:saha.xml").getPath();
    LicenseKey.loadLicenseFile(licenceFile);
    answerSheet = new StringBuilder();
    String fileName = makeNameForFile(paperDetails);
    buildResponse(response, fileName);
    ExamType examType = ExamType.valueOf(paperDetails.getExamType());
    logger.info("Selected size ==> {} questions for download.", mcqs.size());
    try (ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())) {
      ZipEntry questionEntry = new ZipEntry(fileName + ".pdf");
      zipOutputStream.putNextEntry(questionEntry);
      final PdfWriter questionPaperWriter = new PdfWriter(zipOutputStream);
      final PdfDocument questionPdfDocument = new PdfDocument(questionPaperWriter);
      Document questionDocument = new Document(questionPdfDocument);
      setFontToDocument(questionDocument);
      addHeader(examType, questionDocument, "বহুনির্বাচনী প্রশ্ন");
      int i = 1;
      for (MCQDto mcqDto : mcqs) {
        String question = "";
        if (mcqDto instanceof GeneralMCQDto) {
          question = renderGeneralMcq(i, ((GeneralMCQDto) mcqDto).getGeneralMCQDetail());
        } else if (mcqDto instanceof PolynomialMCQDto) {
          question = renderPolynomialMcq(i, ((PolynomialMCQDto) mcqDto).getPolynomialMCQDetail());
        } else if (mcqDto instanceof StemBasedMCQDto) {
          question = renderStemBasedMcq(i, ((StemBasedMCQDto) mcqDto).getStemBasedMCQDetail());
        }
        i += mcqDto.getWeight();
        Paragraph p = new Paragraph(question);
        questionDocument.add(p);
      }
      questionDocument.add(new AreaBreak());
      Paragraph ap = new Paragraph(answerSheet.toString());
      questionDocument.add(ap);

      questionDocument.close();
      questionPdfDocument.close();
      questionPaperWriter.close();
      zipOutputStream.closeEntry();
    }
  }

  private void addHeader(ExamType examType, Document questionDocument, String qType) {
    Paragraph paragraph = new Paragraph();
    paragraph.setTextAlignment(TextAlignment.CENTER);
    paragraph.add(
        examType.getLabel() + " " + enNumberToBnNumber(LocalDate.now().getYear()) + "\n" + qType);
    questionDocument.add(paragraph);
  }

  private void buildResponse(HttpServletResponse response, String fileName) {
    response.setContentType("application/zip");
    response.setHeader(
        HttpHeaders.CONTENT_DISPOSITION,
        ContentDisposition.builder("attachment").filename(fileName + ".zip").build().toString());
  }

  public void createCqPdf(
      HttpServletResponse response, List<CQQuestion> cqs, QuestionPaper paperDetails)
      throws IOException {
    final String licenceFile = ResourceUtils.getFile("classpath:saha.xml").getPath();
    LicenseKey.loadLicenseFile(licenceFile);

    String fileName = makeNameForFile(paperDetails);
    buildResponse(response, fileName);
    ExamType examType = ExamType.valueOf(paperDetails.getExamType());
    logger.info("Selected size ==> {} questions for download.", cqs.size());

    try (ZipOutputStream zipOutputStream = new ZipOutputStream(response.getOutputStream())) {
      ZipEntry questionEntry = new ZipEntry(fileName + ".pdf");
      zipOutputStream.putNextEntry(questionEntry);
      final PdfWriter questionPaperWriter = new PdfWriter(zipOutputStream);
      final PdfDocument questionPdfDocument = new PdfDocument(questionPaperWriter);
      Document questionDocument = new Document(questionPdfDocument);
      setFontToDocument(questionDocument);
      addHeader(examType, questionDocument, "সৃজনশীল প্রশ্ন");
      int i = 1;
      for (CQQuestion cq : cqs) {
        String question = renderCq(i, cq);
        i++;
        Paragraph p = new Paragraph(question);
        questionDocument.add(p);
      }
      zipOutputStream.closeEntry();
      questionDocument.close();
      questionPdfDocument.close();
      questionPaperWriter.close();
    }
  }

  private String renderCq(int i, CQQuestion cq) {
    String serial = enNumberToBnNumber(i);
    String question = "%s. %s\n" + "(ক) %s\n" + "(খ) %s\n " + "(গ) %s \n" + "(ঘ) %s\n";

    return String.format(
        question,
        serial,
        cq.getStem(),
        cq.getKnowledgeBased(),
        cq.getUnderstandingBased(),
        cq.getApplicationBased(),
        cq.getHigherAbility());
  }

  private String makeNameForFile(QuestionPaper paper) {
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    return String.format(
        "%s_%s_%s", paper.getType(), paper.getExamType(), dateFormat.format(paper.getCreatedAt()));
  }

  private void setFontToDocument(Document questionDocument) {
    final FontSet set = new FontSet();
    set.addFont(notoSans);
    set.addFont(notoSerif);
    set.addFont(arialUni);
    questionDocument.setFontProvider(new FontProvider(set));
    questionDocument.setProperty(Property.FONT, new String[] {"MyFontFamilyName"});
  }

  private String renderGeneralMcq(int i, GeneralMCQDetail detail) {
    String serial = enNumberToBnNumber(i);
    String question = "%s. %s\n" + "(ক) %s \t\t (খ) %s\n" + "(গ) %s \t\t (ঘ) %s\n";
    answerSheet
        .append(serial)
        .append(" - ")
        .append(getAnswerFromIndex(detail.getAnswer()))
        .append("\n");
    return String.format(
        question,
        serial,
        detail.getQuestionBody(),
        detail.getOption1(),
        detail.getOption2(),
        detail.getOption3(),
        detail.getOption4());
  }

  private String renderPolynomialMcq(int i, PolynomialMCQDetail detail) {
    String serial = enNumberToBnNumber(i);
    String question =
        "%s. %s\n"
            + "(i) %s\n"
            + "(ii) %s\n"
            + "(iii) %s\n"
            + "%s\n"
            + "(ক) %s \t\t (খ) %s\n"
            + "(গ) %s \t\t (ঘ) %s\n";
    answerSheet
        .append(serial)
        .append(" - ")
        .append(getAnswerFromIndex(detail.getAnswer()))
        .append("\n");
    return String.format(
        question,
        serial,
        detail.getQuestionStatement(),
        detail.getStatement1(),
        detail.getStatement2(),
        detail.getStatement3(),
        detail.getQuestionBody(),
        detail.getOption1(),
        detail.getOption2(),
        detail.getOption3(),
        detail.getOption4());
  }

  private String renderStemBasedMcq(int i, StemBasedMCQDetail detail) {
    StringBuilder sb = new StringBuilder(detail.getStem() + "\n");
    int j = i;
    for (GeneralMCQDetail generalMCQDetail : detail.getGeneralMcqs()) {
      sb.append(renderGeneralMcq(j, generalMCQDetail));
      sb.append("\n");
      j++;
    }
    for (PolynomialMCQDetail polynomialMCQDetail : detail.getPolynomialMcqs()) {
      sb.append(renderPolynomialMcq(j, polynomialMCQDetail));
      sb.append("\n");
      j++;
    }
    return sb.toString();
  }

  private String enNumberToBnNumber(int i) {
    String numb = Integer.toString(i);
    StringBuilder sb = new StringBuilder();
    for (int j = 0; j < numb.length(); j++) {
      sb.append(getEnToBn(numb.charAt(j)));
    }
    return sb.toString();
  }

  private char getEnToBn(char in) {
    switch (in) {
      case '1':
        return '১';
      case '2':
        return '২';
      case '3':
        return '৩';
      case '4':
        return '৪';
      case '5':
        return '৫';
      case '6':
        return '৬';
      case '7':
        return '৭';
      case '8':
        return '৮';
      case '9':
        return '৯';
      default:
        return '০';
    }
  }

  private String getAnswerFromIndex(int i) {
    switch (i) {
      case 1:
        return "ক";
      case 2:
        return "খ";
      case 3:
        return "গ";
      default:
        return "ঘ";
    }
  }
}
