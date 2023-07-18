package com.lukidev.loja;

import jakarta.persistence.*;

@Entity
@Table(name = "cegonha")
public class Cegonha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    private String name_user;
    private String password;
    private String email;
    private String cpf;

    public Cegonha() {}

    public Cegonha(String name_user, String password, String email, String cpf, Long id_user) {
        this.name_user = name_user;
        this.password = password;
        this.email = email;
        this.cpf = cpf;
        this.id_user = id_user;
    }

    public Long getIdUser() {
        return id_user;
    }

    public void setIdUser(Long id_user) {
        this.id_user = id_user;
    }

    public String getUsername() {
        return name_user;
    }

    public void setUsername(String name_user) {
        this.name_user = name_user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail(){
        return email;
    }

    public String setEmail(String email){
        return this.email = email;
    }

    public String getCpf(){
        return cpf;
    }

    public String setCpf(String cpf){
        return this.cpf = cpf;
    }

}