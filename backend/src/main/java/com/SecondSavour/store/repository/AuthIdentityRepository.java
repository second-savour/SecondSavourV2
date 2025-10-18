package com.SecondSavour.store.repository;

import com.SecondSavour.store.model.AuthIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthIdentityRepository extends JpaRepository<AuthIdentity, UUID> {
    
    // Find auth identity by user ID and provider
    Optional<AuthIdentity> findByUserIdAndProvider(UUID userId, String provider);
    
    // Find auth identity by provider and provider UID (for login)
    Optional<AuthIdentity> findByProviderAndProviderUid(String provider, String providerUid);
    
    // Check if user has password authentication
    @Query("SELECT ai FROM AuthIdentity ai WHERE ai.userId = :userId AND ai.provider = 'password'")
    Optional<AuthIdentity> findPasswordAuthByUserId(@Param("userId") UUID userId);
    
    // Find all auth identities for a user
    @Query("SELECT ai FROM AuthIdentity ai WHERE ai.userId = :userId")
    java.util.List<AuthIdentity> findAllByUserId(@Param("userId") UUID userId);
    
    // Check if user exists with email (via password provider)
    @Query("SELECT ai FROM AuthIdentity ai JOIN ai.user u WHERE u.email = :email AND ai.provider = 'password'")
    Optional<AuthIdentity> findPasswordAuthByEmail(@Param("email") String email);
}
