package com.htbook.config;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestFilter implements Filter{
	public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with, x-auth-token");
		response.setHeader("Access-Control-Max-Age", "3600");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		
		if(!(request.getMethod().equalsIgnoreCase("OPTIONS"))) {
			try {
				chain.doFilter(req, res);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else { // neu dung options thi phai gui yeu cau len server xem phuong thuc co duoc chap nhan khong
			System.out.println("Pre-flight");
			response.setHeader("Access-Control-Allowed-Methods", "POST, GET, DELETE"); // o day co the sd tao moi, get va xoa
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, x-auth-token, " +
                    "access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with");
			response.setStatus(HttpServletResponse.SC_OK);
		}
	}
	
	public void init(FilterConfig filterConfig) {}
	
	public void destroy() {}
}
