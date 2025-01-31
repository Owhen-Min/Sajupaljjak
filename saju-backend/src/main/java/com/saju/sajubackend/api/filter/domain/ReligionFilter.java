package com.saju.sajubackend.api.filter.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "RELIGION_FILTER")
public class ReligionFilter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "religion_filter_id")
    private Long religionFilterId;

    @Column(nullable = false)
    private int religionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id", nullable = false)
    private Filter filter;

    @Builder
    private ReligionFilter(Long religionFilterId, int religionId, Filter filter) {
        this.religionFilterId = religionFilterId;
        this.religionId = religionId;
        this.filter = filter;
    }
}
