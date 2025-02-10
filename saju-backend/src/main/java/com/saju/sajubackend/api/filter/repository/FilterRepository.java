package com.saju.sajubackend.api.filter.repository;

import com.saju.sajubackend.api.filter.domain.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilterRepository extends JpaRepository<Filter, Long> {
}
