package com.saju.sajubackend.api.couple.domain;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.entity.BaseTimeEntity;
import com.saju.sajubackend.common.enums.Gender;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "COUPLE")
public class Couple extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "couple_id")
    private Long coupleId;

    @OneToOne
    @JoinColumn(name = "couple_male_id", nullable = false)
    private Member coupleMale;

    @OneToOne
    @JoinColumn(name = "couple_female_id", nullable = false)
    private Member coupleFemale;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Builder
    private Couple(Long coupleId, Member coupleMale, Member coupleFemale, LocalDateTime startDate) {
        this.coupleId = coupleId;
        this.coupleMale = coupleMale;
        this.coupleFemale = coupleFemale;
        this.startDate = startDate;
    }

    public static Couple of(Member inviter, Member joiner, LocalDateTime startDate) {
        if (inviter.getGender() == Gender.MALE && joiner.getGender() == Gender.FEMALE) {
            return Couple.builder()
                    .coupleMale(inviter)
                    .coupleFemale(joiner)
                    .startDate(startDate)
                    .build();
        } else if (inviter.getGender() == Gender.FEMALE && joiner.getGender() == Gender.MALE) {
            return Couple.builder()
                    .coupleMale(joiner)
                    .coupleFemale(inviter)
                    .startDate(startDate)
                    .build();
        } else {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_GENDER_COMBINATION);
        }
    }
}