package com.SecondSavour.store.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "auth_identities")
public class AuthIdentity {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @Column(name = "provider", nullable = false)
    private String provider; // e.g., "password", "google", "facebook"
    
    @Column(name = "provider_uid", nullable = false)
    private String providerUid; // provider-specific user ID
    
    @Column(name = "mfa_enabled")
    private Boolean mfaEnabled = false;
    
    // For password provider, we'll store the hashed password here
    @Column(name = "password_hash")
    private String passwordHash;
    
    // Default constructor
    public AuthIdentity() {}
    
    // Constructor for password provider
    public AuthIdentity(UUID userId, String provider, String providerUid, String passwordHash) {
        this.userId = userId;
        this.provider = provider;
        this.providerUid = providerUid;
        this.passwordHash = passwordHash;
        this.mfaEnabled = false;
    }
    
    // Constructor for external providers (Google, etc.)
    public AuthIdentity(UUID userId, String provider, String providerUid) {
        this.userId = userId;
        this.provider = provider;
        this.providerUid = providerUid;
        this.mfaEnabled = false;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public UUID getUserId() {
        return userId;
    }
    
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public String getProvider() {
        return provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }
    
    public String getProviderUid() {
        return providerUid;
    }
    
    public void setProviderUid(String providerUid) {
        this.providerUid = providerUid;
    }
    
    public Boolean getMfaEnabled() {
        return mfaEnabled;
    }
    
    public void setMfaEnabled(Boolean mfaEnabled) {
        this.mfaEnabled = mfaEnabled;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
}


