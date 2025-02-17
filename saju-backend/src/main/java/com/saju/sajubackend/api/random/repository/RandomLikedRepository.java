package com.saju.sajubackend.api.random.repository;

import com.saju.sajubackend.api.random.domian.RandomLiked;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RandomLikedRepository extends MongoRepository<RandomLiked, String> {

    boolean existsByMemberIdAndPartnerId(String memberId, String partnerId);
}
