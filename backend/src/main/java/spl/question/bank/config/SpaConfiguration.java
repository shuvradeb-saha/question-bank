package spl.question.bank.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SpaConfiguration implements WebMvcConfigurer {

  /**
   * This method basically serves the index.html for any page requested. Basically makes our spring
   * boot server capable of serving a real SPA.
   *
   * Inspired from: https://stackoverflow.com/a/42998817/391221
   */
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/{spring:\\w+}").setViewName("forward:/");
    registry.addViewController("/**/{spring:\\w+}").setViewName("forward:/");
    registry.addViewController("/{spring:\\w+}/**{spring:?!(\\.js|\\.css)$}")
        .setViewName("forward:/");
  }
}
