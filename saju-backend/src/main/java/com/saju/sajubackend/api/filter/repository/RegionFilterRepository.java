package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.RegionFilter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegionFilterRepository extends JpaRepository<RegionFilter, Long> {
    List<RegionFilter> findByFilter(Filter filter);

    void deleteByFilter(Filter filter);
}
