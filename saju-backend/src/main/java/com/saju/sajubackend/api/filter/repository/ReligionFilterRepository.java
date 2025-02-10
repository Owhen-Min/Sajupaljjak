package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReligionFilterRepository extends JpaRepository<ReligionFilter, Long> {
}
