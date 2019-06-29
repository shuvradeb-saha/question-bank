package spl.question.bank.service;

import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import spl.question.bank.database.client.ChapterMapper;
import spl.question.bank.database.client.LearningOutcomeMapper;
import spl.question.bank.database.model.Chapter;
import spl.question.bank.database.model.LearningOutcome;

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

  public void saveChapter(Chapter chapter) {
    if (isBlank(chapter.getName()) || chapter.getSubjectId() == null
        || chapter.getClassId() == null) {
      throw new IllegalArgumentException("Enter all information  correctly");
    }

    if (chapter.getId() == null) {
      chapterMapper.insert(chapter);
    } else {
      chapterMapper.updateByPrimaryKey(chapter);
    }
  }

  public Chapter getChapter(Integer chapterId) {

    return chapterMapper.selectByPrimaryKey(chapterId);
  }

  public List<Chapter> getAllChapter() {
    return chapterMapper.selectByExample(null);
  }

  public void saveLearningOutcome(LearningOutcome learningOutcome) {
    if (isBlank(learningOutcome.getOutcome()) || learningOutcome.getChapterId() == null) {
      throw new IllegalArgumentException("Enter all information  correctly");
    }

    if (learningOutcome.getId() == null) {
      learningOutcomeMapper.insert(learningOutcome);
    } else {
      learningOutcomeMapper.updateByPrimaryKey(learningOutcome);
    }
  }

  public LearningOutcome getLearingOutcome(Integer id) {
    return learningOutcomeMapper.selectByPrimaryKey(id);
  }

  public List<LearningOutcome> getAllLearningOutcome() {
    return learningOutcomeMapper.selectByExample(null);
  }
}
