package spl.question.bank.web.admin;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import spl.question.bank.model.admin.ChapterDto;
import spl.question.bank.service.ChapterService;

import java.util.List;

import static org.apache.commons.lang3.StringUtils.isBlank;

@RestController
@Slf4j
@RequestMapping("/api/user")
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
    public void updateChapter(final @RequestBody ChapterDto chapterDto) {
        validateChapterDto(chapterDto);
        chapterService.saveChapter(chapterDto);
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

}
