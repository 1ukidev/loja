package com.lukidev.loja;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Cegonha, Long> {
    Cegonha findByEmail(String email);
}