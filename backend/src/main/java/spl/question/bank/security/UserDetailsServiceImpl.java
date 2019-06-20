package spl.question.bank.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import spl.question.bank.model.AppUser;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final BCryptPasswordEncoder encoder;
    private final String ROLE_PREFIX = "ROLE_";
    @Autowired
    public UserDetailsServiceImpl(BCryptPasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<String> role1 = new ArrayList<>();
        role1.add("USER");
        role1.add("ADMIN");
        List<String> role2 = new ArrayList<>();
        role2.add("USER");

        final List<AppUser> users = Arrays.asList(
                new AppUser(1, "admin", encoder.encode("123456"), role1),
                new AppUser(2, "saha", encoder.encode("12345"), role2)
        );
        for (AppUser appUser : users) {
            if (appUser.getUsername().equals(username)) {

                // Remember that Spring needs roles to be in this format: "ROLE_" + userRole (i.e. "ROLE_ADMIN")
                // So, we need to set it to that format, so we can verify and compare roles (i.e. hasRole("ADMIN")).
                List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
                for (String role : appUser.getRoles()) {
                    grantedAuthorities.add(new SimpleGrantedAuthority(ROLE_PREFIX + role));
                }

                // The "User" class is provided by Spring and represents a model class for user to be returned by UserDetailsService
                // And used by auth manager to verify and check user authentication.
                return new User(appUser.getUsername(), appUser.getPassword(), grantedAuthorities);
            }
        }

        // If user not found. Throw this exception.
        // throw new UsernameNotFoundException("Username: " + username + " not found");
        throw new RuntimeException("Username: " + username + " not found");

    }
}
