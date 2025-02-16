package com.saju.sajubackend.api.member.repository;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.member.domain.MemberSocial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberSocialRepository extends JpaRepository<MemberSocial, Long> {


    @Query(value = "SELECT ms.member FROM MemberSocial ms WHERE ms.email = :email")
    Optional<Member> findMemberByEmail(@Param("email") String email);

    boolean existsByEmail(@Param("email") String email);

    // ✅ MemberSocial을 조회하는 메서드 추가
    Optional<MemberSocial> findByEmail(String email);


}
