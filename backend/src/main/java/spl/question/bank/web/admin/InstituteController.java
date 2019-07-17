package spl.question.bank.web.admin;


import static java.util.stream.Collectors.toList;
import static org.apache.commons.lang3.StringUtils.isBlank;

import java.util.List;
import java.util.stream.Collectors;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import spl.question.bank.database.client.InstituteMapper;
import spl.question.bank.database.model.Institute;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class InstituteController {

    private final InstituteMapper instituteMapper;

    public InstituteController(final InstituteMapper instituteMapper) {
        this.instituteMapper = instituteMapper;
    }

    @RequestMapping(value = "/institute",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void createInstitute(final @RequestBody Institute institute) {
        logger.info("institute submitted {}", institute);
        if (isBlank(institute.getName()) || institute.getEiinNumber() == null) {
            throw new IllegalArgumentException("Must enter all info correctly");
        }
        instituteMapper.insert(institute);
    }

    @RequestMapping(value = "/institute",
            method = RequestMethod.PUT,
            consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void updateInstitute(final @RequestBody Institute institute) {
        logger.info("institute submitted {}", institute);
        if (isBlank(institute.getName()) || institute.getEiinNumber() == null) {
            throw new IllegalArgumentException("Must enter all info correctly");
        }
        instituteMapper.updateByPrimaryKey(institute);
    }

    @RequestMapping(value = "/institute/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Institute getInstitute(final @PathVariable Integer id) {
        return instituteMapper.selectByPrimaryKey(id);
    }

    @RequestMapping(value = "/institutes",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Institute> getAllInstitute() {
        return instituteMapper.selectByExample(null);
    }

    @RequestMapping(value = "/institutes/eiin",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Integer> getAllEiinNumber() {
        return instituteMapper
                .selectByExample(null)
                .stream()
                .map(Institute::getEiinNumber)
                .collect(toList());
    }


}

