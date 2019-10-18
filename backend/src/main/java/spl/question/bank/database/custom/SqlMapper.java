package spl.question.bank.database.custom;

import org.apache.ibatis.annotations.SelectProvider;
import spl.question.bank.database.MapperMarker;

public interface SqlMapper extends MapperMarker {

  @SelectProvider(type = SqlProvider.class, method = "findModeratorByMinDate")
  Integer findModeratorIdByMinAssignDate();

}
