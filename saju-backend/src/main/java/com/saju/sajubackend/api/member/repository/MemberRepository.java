package com.saju.sajubackend.api.member.repository;

import com.saju.sajubackend.api.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
