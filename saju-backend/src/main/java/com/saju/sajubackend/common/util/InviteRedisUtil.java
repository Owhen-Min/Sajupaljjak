package com.saju.sajubackend.common.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class InviteRedisUtil {
    public final RedisTemplate<String, String> redisTemplate;
    private static final String ID_PREFIX = "invitation:id:";
    private static final String CODE_PREFIX = "invitation:code:";
    private static final Duration CODE_TTL = Duration.ofHours(24);

    public void saveInvitationCode(Long memberId, String code) {
        String idKey = ID_PREFIX + memberId;
        String codeKey = CODE_PREFIX + code;

        redisTemplate.opsForValue().set(idKey, code, CODE_TTL);
        redisTemplate.opsForValue().set(codeKey, String.valueOf(memberId), CODE_TTL);
    }

    public Optional<Long> findMemberIdByCode(String code) {
        String codeKey = CODE_PREFIX + code;
        return Optional.ofNullable(redisTemplate.opsForValue().get(codeKey))
                .map(Long::valueOf);
    }

    public Optional<String> findCodeByMemberId(Long memberId) {
        String idKey = ID_PREFIX + memberId;
        return Optional.ofNullable(redisTemplate.opsForValue().get(idKey));
    }

    public void deleteBothCode(Long inviterId, Long joinerId) {
        String luaScript = """
                local codeInv = redis.call('GET', KEYS[1])
                if codeInv then
                    local codeKeyInv = ARGV[1] .. codeInv
                    redis.call('DEL', codeKeyInv)
                    redis.call('DEL', KEYS[1])
                end
                
                local codeJoin = redis.call('GET', KEYS[2])
                if codeJoin then
                    local codeKeyJoin = ARGV[1] .. codeJoin
                    redis.call('DEL', codeKeyJoin)
                    redis.call('DEL', KEYS[2])
                end
                """;

        DefaultRedisScript<Void> redisScript = new DefaultRedisScript<>();
        redisScript.setScriptText(luaScript);
        redisScript.setResultType(Void.class);

        redisTemplate.execute(
                redisScript,
                Arrays.asList(ID_PREFIX + inviterId, ID_PREFIX + joinerId),
                CODE_PREFIX
        );
    }

    public Long getTTL(Long memberId) {
        String idKey = ID_PREFIX + memberId;
        return redisTemplate.getExpire(idKey, TimeUnit.SECONDS);
    }
}