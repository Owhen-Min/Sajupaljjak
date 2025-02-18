package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FilterRepository extends JpaRepository<Filter, Long> {

    @Query("select f from Filter f where f.member.memberId = :memberId")
    Optional<Filter> findByMemberId(@Param("memberId") Long memberId);
}
