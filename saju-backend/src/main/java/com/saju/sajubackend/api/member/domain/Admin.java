package com.saju.sajubackend.api.member.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "ADMIN")
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_no")
    private Long adminNo;

    @Column(nullable = false, length = 30)
    private String id;

    @Column(nullable = false, length = 100)
    private String password;

    @Builder
    private Admin(Long adminNo, String id, String password) {
        this.adminNo = adminNo;
        this.id = id;
        this.password = password;
    }
}
