package com.saju.sajubackend.api.random.domian;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "random_liked")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RandomLiked {

    @Id
    private String id;

    private String memberId;

    private String partnerId;
}
