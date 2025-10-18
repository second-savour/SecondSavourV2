package com.SecondSavour.store.service;

import com.SecondSavour.store.dto.LoginRequest;
import com.SecondSavour.store.dto.RegisterRequest;
import com.SecondSavour.store.dto.UserResponse;
import com.SecondSavour.store.model.User;
import com.SecondSavour.store.model.AuthIdentity;
import com.SecondSavour.store.repository.UserRepository;
import com.SecondSavour.store.repository.AuthIdentityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AuthIdentityRepository authIdentityRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Handle user login - verify existing user credentials
     */
    @Transactional(readOnly = true)
    public UserResponse loginUser(LoginRequest request) throws RuntimeException {
        String email = request.getEmail().toLowerCase().trim();
        
        // Find user by email through auth_identities table
        Optional<AuthIdentity> authOptional = authIdentityRepository.findPasswordAuthByEmail(email);
        
        if (authOptional.isEmpty()) {
            throw new RuntimeException("USER_NOT_FOUND");
        }
        
        AuthIdentity auth = authOptional.get();
        User user = auth.getUser();
        
        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), auth.getPasswordHash())) {
            throw new RuntimeException("INVALID_CREDENTIALS");
        }
        
        // Return user data (without password)
        return new UserResponse(
            user.getId(),
            user.getEmail(),
            user.getFullName(),
            user.getPhone()
        );
    }
    
    /**
     * Handle user registration - create new user account
     */
    @Transactional
    public UserResponse registerUser(RegisterRequest request) throws RuntimeException {
        String email = request.getEmail().toLowerCase().trim();
        
        // Check if user already exists
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("USER_ALREADY_EXISTS");
        }
        
        // Validate input
        validateRegistrationData(request);
        
        // Create new user
        User user = new User();
        user.setEmail(email);
        user.setFullName(request.getFullName().trim());
        user.setPhone(request.getPhone() != null ? request.getPhone().trim() : null);
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Create password authentication identity
        AuthIdentity passwordAuth = new AuthIdentity();
        passwordAuth.setUserId(savedUser.getId());
        passwordAuth.setProvider("password");
        passwordAuth.setProviderUid(email); // Use email as provider UID for password auth
        passwordAuth.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        passwordAuth.setMfaEnabled(false);
        
        // Save auth identity
        authIdentityRepository.save(passwordAuth);
        
        // Return user data (without password)
        return new UserResponse(
            savedUser.getId(),
            savedUser.getEmail(),
            savedUser.getFullName(),
            savedUser.getPhone()
        );
    }
    
    /**
     * Check if user exists by email
     */
    @Transactional(readOnly = true)
    public boolean userExists(String email) {
        return userRepository.existsByEmail(email.toLowerCase().trim());
    }
    
    /**
     * Get user by email (for profile lookup)
     */
    @Transactional(readOnly = true)
    public Optional<UserResponse> getUserByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email.toLowerCase().trim());
        
        if (user.isPresent()) {
            User u = user.get();
            return Optional.of(new UserResponse(
                u.getId(),
                u.getEmail(),
                u.getFullName(),
                u.getPhone()
            ));
        }
        
        return Optional.empty();
    }
    
    /**
     * Add external auth provider (Google, Facebook, etc.)
     */
    @Transactional
    public void addExternalAuth(String email, String provider, String providerUid) throws RuntimeException {
        Optional<User> userOptional = userRepository.findByEmail(email.toLowerCase().trim());
        
        if (userOptional.isEmpty()) {
            throw new RuntimeException("USER_NOT_FOUND");
        }
        
        User user = userOptional.get();
        
        // Check if this provider is already linked
        Optional<AuthIdentity> existingAuth = authIdentityRepository.findByUserIdAndProvider(user.getId(), provider);
        if (existingAuth.isPresent()) {
            throw new RuntimeException("PROVIDER_ALREADY_LINKED");
        }
        
        // Create new auth identity for external provider
        AuthIdentity externalAuth = new AuthIdentity();
        externalAuth.setUserId(user.getId());
        externalAuth.setProvider(provider);
        externalAuth.setProviderUid(providerUid);
        externalAuth.setMfaEnabled(false);
        
        authIdentityRepository.save(externalAuth);
    }
    
    /**
     * Validate registration data
     */
    private void validateRegistrationData(RegisterRequest request) throws RuntimeException {
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("EMAIL_REQUIRED");
        }
        
        if (request.getFullName() == null || request.getFullName().trim().isEmpty()) {
            throw new RuntimeException("FULL_NAME_REQUIRED");
        }
        
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            throw new RuntimeException("PASSWORD_TOO_SHORT");
        }
        
        // Basic email validation
        if (!request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new RuntimeException("INVALID_EMAIL_FORMAT");
        }
    }
}


