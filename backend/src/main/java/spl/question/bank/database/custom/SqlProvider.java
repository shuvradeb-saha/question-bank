package spl.question.bank.database.custom;

public class SqlProvider {

  public String findModeratorByMinDate() {
    return "select moderator_id from moderator_question where "
        + "assigned_date=(select min(assigned_date) from moderator_question);";
  }

}
