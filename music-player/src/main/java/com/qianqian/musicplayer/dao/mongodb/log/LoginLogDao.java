package com.qianqian.dao.mongodb.log;

import com.qianqian.entity.mongodb.log.LoginLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * @author fonlin
 * @date 2018/10/26
 */
@Repository
public interface LoginLogDao extends MongoRepository<LoginLog, String> {
}
