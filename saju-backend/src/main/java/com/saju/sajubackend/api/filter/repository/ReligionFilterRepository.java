package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReligionFilterRepository extends JpaRepository<ReligionFilter, Long> {
    List<ReligionFilter> findByFilter(Filter filter);

    void deleteByFilter(Filter filter);
}
