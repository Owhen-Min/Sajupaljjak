package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.RegionFilter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionFilterRepository extends JpaRepository<RegionFilter, Long> {
}
