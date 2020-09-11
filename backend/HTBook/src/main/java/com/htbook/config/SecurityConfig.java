package com.htbook.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

import com.htbook.util.SecurityUtils;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService uDetailsService;

	// need to change later
	private static final String[] PUBLIC_MATCHERS = { "" + "/css/**", "/js/**", "/image/**", "/book/**",
			"/customer/register", "/user/login-google", "/user/login-facebook" };

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.httpBasic().and().authorizeRequests().antMatchers(PUBLIC_MATCHERS)
//				.permitAll().anyRequest().authenticated();
		http.csrf().disable().cors().disable().httpBasic().and().authorizeRequests()
		.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
		.antMatchers(PUBLIC_MATCHERS)
				.permitAll().anyRequest().authenticated();

		// Chỉ cho phép user có quyền ADMIN hoặc USER truy cập đường dẫn /user/**
		//http.authorizeRequests().antMatchers("/user/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')");
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(uDetailsService).passwordEncoder(SecurityUtils.passwordEncoder());
	}

	@Bean
	public HttpSessionIdResolver httpSessionStrategy() {
		return HeaderHttpSessionIdResolver.xAuthToken();
	}
}
