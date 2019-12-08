package spl.question.bank.service;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {

  public static Date getDateMinusMonth(int count) {
    Calendar cal = Calendar.getInstance();
    cal.add(Calendar.MONTH, (-1 * count));
    return cal.getTime();
  }

  public static Date getFirstDateBefore(int monthCount) {
    Date date = getDateMinusMonth(monthCount);
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH);
    return getFirstDate(year, month);
  }

  public static Date getFirstDate(int year, int month) {
    Calendar cal = Calendar.getInstance();
    cal.set(Calendar.YEAR, year);
    cal.set(Calendar.MONTH, month);
    cal.set(Calendar.DAY_OF_MONTH, 1);
    return cal.getTime();
  }

  public static String getYearMonth(Date date) {
    Calendar cal = Calendar.getInstance();
    cal.setTime(date);
    int year = cal.get(Calendar.YEAR);
    int month = cal.get(Calendar.MONTH) + 1;
    return year + "-" + month;
  }
}
