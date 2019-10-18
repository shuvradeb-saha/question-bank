package spl.question.bank.model.admin;

import lombok.Getter;

@Getter
public enum Roles {
  ADMIN(1),
  TEACHER(2),
  MODERATOR(3),
  HEADMASTER(4);

  private Integer value;

  Roles(final Integer value) {
    this.value = value;
  }


/*
        1	ADMIN
        2	TEACHER
        3	MODERATOR
        4	HEADMASTER
*/
}
