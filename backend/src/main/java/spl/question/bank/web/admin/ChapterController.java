package spl.question.bank.web.admin;


import java.util.List;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.model.Chapter;
import spl.question.bank.database.model.LearningOutcome;
import spl.question.bank.model.admin.ChapterDto;
import spl.question.bank.service.ChapterService;

import static org.apache.commons.lang3.StringUtils.isBlank;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class ChapterController {

    private final ChapterService chapterService;

    public ChapterController(final ChapterService chapterService) {
        this.chapterService = chapterService;
    }

    @RequestMapping(value = "/chapter",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void createChapter(final @RequestBody ChapterDto chapterDto) {
        validateChapterDto(chapterDto);
        chapterService.saveChapter(chapterDto);
    }

    private void validateChapterDto(ChapterDto chapterDto) {
        if (isBlank(chapterDto.getChapterName()) || chapterDto.getSubjectId() == null
                || chapterDto.getClassId() == null) {
            throw new IllegalArgumentException("Enter chapter information correctly");
        }
    }

    @RequestMapping(value = "/chapter",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateChapter(final @RequestBody Chapter chapter) {
        //chapterService.saveChapter(chapter);
    }

    @RequestMapping(value = "/chapters/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ChapterDto getChapter(final @PathVariable(name = "id") Integer chapterId) {
        return chapterService.getChapter(chapterId);
    }

    @RequestMapping(value = "/chapters",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<ChapterDto> getAllChapter() {
        return chapterService.getAllChapter();
    }

    @RequestMapping(value = "/learning-outcome",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void createLearningOutcome(final @RequestBody LearningOutcome learningOutcome) {
        chapterService.saveLearningOutcome(learningOutcome);
    }

    @RequestMapping(value = "/learning-outcome",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateLearningOutcome(final @RequestBody LearningOutcome learningOutcome) {
        chapterService.saveLearningOutcome(learningOutcome);
    }

    @RequestMapping(value = "/learning-outcome/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public LearningOutcome getClass(final @PathVariable Integer id) {
        return chapterService.getLearingOutcome(id);
    }

    @RequestMapping(value = "/learning-outcome}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<LearningOutcome> getAllLearningOutcome() {
        return chapterService.getAllLearningOutcome();
    }


}
