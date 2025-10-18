package com.SecondSavour.store.controller;

import com.SecondSavour.store.dto.LoginRequest;
import com.SecondSavour.store.dto.RegisterRequest;
import com.SecondSavour.store.dto.UserResponse;
import com.SecondSavour.store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3008") // Allow requests from Next.js frontend
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * User Login Endpoint
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserResponse userResponse = userService.loginUser(request);
            
            response.put("success", true);
            response.put("message", "Login successful");
            response.put("user", userResponse);
            
            return ResponseEntity.ok(response); // 200 OK
            
        } catch (RuntimeException e) {
            response.put("success", false);
            
            switch (e.getMessage()) {
                case "USER_NOT_FOUND":
                    response.put("error", "User not found. Please sign up first.");
                    response.put("errorCode", "USER_NOT_FOUND");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
                    
                case "INVALID_CREDENTIALS":
                    response.put("error", "Invalid email or password");
                    response.put("errorCode", "INVALID_CREDENTIALS");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // 401 Unauthorized
                    
                default:
                    response.put("error", "Login failed");
                    response.put("errorCode", "LOGIN_FAILED");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Internal server error");
            response.put("errorCode", "INTERNAL_ERROR");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }
    
    /**
     * User Registration Endpoint
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody RegisterRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            UserResponse userResponse = userService.registerUser(request);
            
            response.put("success", true);
            response.put("message", "Account created successfully");
            response.put("user", userResponse);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response); // 201 Created
            
        } catch (RuntimeException e) {
            response.put("success", false);
            
            switch (e.getMessage()) {
                case "USER_ALREADY_EXISTS":
                    response.put("error", "An account with this email already exists. Please sign in instead.");
                    response.put("errorCode", "USER_ALREADY_EXISTS");
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
                    
                case "EMAIL_REQUIRED":
                    response.put("error", "Email address is required");
                    response.put("errorCode", "EMAIL_REQUIRED");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
                    
                case "FULL_NAME_REQUIRED":
                    response.put("error", "Full name is required");
                    response.put("errorCode", "FULL_NAME_REQUIRED");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
                    
                case "PASSWORD_TOO_SHORT":
                    response.put("error", "Password must be at least 6 characters long");
                    response.put("errorCode", "PASSWORD_TOO_SHORT");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
                    
                case "INVALID_EMAIL_FORMAT":
                    response.put("error", "Please enter a valid email address");
                    response.put("errorCode", "INVALID_EMAIL_FORMAT");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
                    
                default:
                    response.put("error", "Registration failed");
                    response.put("errorCode", "REGISTRATION_FAILED");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Internal server error");
            response.put("errorCode", "INTERNAL_ERROR");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }
    
    /**
     * Check if user exists by email
     * GET /api/auth/check-email/{email}
     */
    @GetMapping("/check-email/{email}")
    public ResponseEntity<Map<String, Object>> checkEmailExists(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            boolean exists = userService.userExists(email);
            
            response.put("exists", exists);
            response.put("email", email.toLowerCase().trim());
            
            if (exists) {
                response.put("message", "User found");
            } else {
                response.put("message", "User not found. Please sign up first.");
            }
            
            return ResponseEntity.ok(response); // 200 OK
            
        } catch (Exception e) {
            response.put("error", "Failed to check email");
            response.put("errorCode", "CHECK_EMAIL_FAILED");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }
    
    /**
     * Get user profile by email (for frontend use)
     * GET /api/auth/profile/{email}
     */
    @GetMapping("/profile/{email}")
    public ResponseEntity<Map<String, Object>> getUserProfile(@PathVariable String email) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            var userResponse = userService.getUserByEmail(email);
            
            if (userResponse.isPresent()) {
                response.put("success", true);
                response.put("user", userResponse.get());
                
                return ResponseEntity.ok(response); // 200 OK
            } else {
                response.put("success", false);
                response.put("error", "User not found");
                response.put("errorCode", "USER_NOT_FOUND");
                
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response); // 404 Not Found
            }
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "Failed to get user profile");
            response.put("errorCode", "PROFILE_FETCH_FAILED");
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // 500 Internal Server Error
        }
    }
}


