package spl.question.bank.service;

import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spl.question.bank.database.client.ChapterMapper;
import spl.question.bank.database.client.LearningOutcomeMapper;
import spl.question.bank.database.model.Chapter;
import spl.question.bank.database.model.LearningOutcome;
import spl.question.bank.database.model.LearningOutcomeExample;
import spl.question.bank.model.admin.ChapterDto;

@Service
@Slf4j
public class ChapterService {
    private final ChapterMapper chapterMapper;
    private final LearningOutcomeMapper learningOutcomeMapper;

    public ChapterService(
            final ChapterMapper chapterMapper,
            final LearningOutcomeMapper learningOutcomeMapper) {
        this.chapterMapper = chapterMapper;
        this.learningOutcomeMapper = learningOutcomeMapper;
    }

    @Transactional
    public void saveChapter(ChapterDto chapterDto) {
        Chapter chapter = new Chapter();
        chapter.setName(chapterDto.getChapterName());
        chapter.setClassId(chapterDto.getClassId());
        chapter.setSubjectId(chapterDto.getSubjectId());

        val learningOutComes = chapterDto.getLearningOutcome();

        if (chapterDto.getId() == null) {
            chapterMapper.insert(chapter);
            saveAllLearningOutcome(learningOutComes, chapter);
        } else {
            chapterMapper.updateByPrimaryKey(chapter);
            updateLearningOutCome(learningOutComes, chapter);
        }
    }

    private void updateLearningOutCome(List<String> learningOutComes, Chapter chapter) {
        val ex = new LearningOutcomeExample();
        ex.createCriteria()
                .andChapterIdEqualTo(chapter.getId())
                .andSubjectIdEqualTo(chapter.getSubjectId())
                .andClassIdEqualTo(chapter.getClassId());
        learningOutcomeMapper.deleteByExample(ex);
        saveAllLearningOutcome(learningOutComes, chapter);
    }

    private void saveAllLearningOutcome(List<String> learningOutComes, Chapter chapter) {
        if (learningOutComes.size() > 0) {
            learningOutComes.forEach(learningOutCome -> {
                LearningOutcome outcome = new LearningOutcome();
                outcome.setChapterId(chapter.getId());
                outcome.setOutcome(learningOutCome);
                outcome.setClassId(chapter.getClassId());
                outcome.setSubjectId(chapter.getSubjectId());
                learningOutcomeMapper.insert(outcome);
            });
        }
    }

    public ChapterDto getChapter(Integer chapterId) {
        val chapter = chapterMapper.selectByPrimaryKey(chapterId);
        val learningOutComes = getLearningOutcomesByChapter(chapter);
        return new ChapterDto()
                .setId(chapter.getId())
                .setClassId(chapter.getClassId())
                .setSubjectId(chapter.getSubjectId())
                .setChapterName(chapter.getName())
                .setLearningOutcome(learningOutComes);
    }

    private List<String> getLearningOutcomesByChapter(Chapter chapter) {
        val ex = new LearningOutcomeExample();
        ex.createCriteria()
                .andChapterIdEqualTo(chapter.getId())
                .andSubjectIdEqualTo(chapter.getSubjectId())
                .andClassIdEqualTo(chapter.getClassId());

        return learningOutcomeMapper.selectByExample(ex)
                .stream()
                .map(LearningOutcome::getOutcome)
                .collect(toList());
    }

    public List<ChapterDto> getAllChapter() {
        val chapters = chapterMapper.selectByExample(null);
        return chapters
                .stream()
                .map(chapter -> getChapter(chapter.getId()))
                .collect(Collectors.toList());
    }

    public LearningOutcome getLearingOutcome(Integer id) {
        return learningOutcomeMapper.selectByPrimaryKey(id);
    }

    public List<LearningOutcome> getAllLearningOutcome() {
        return learningOutcomeMapper.selectByExample(null);
    }
}
