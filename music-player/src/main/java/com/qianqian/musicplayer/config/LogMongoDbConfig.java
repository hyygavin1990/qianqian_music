package com.qianqian.musicplayer.config;

import com.mongodb.MongoClient;
import com.qianqian.musicplayer.mongodb.MongoHelper;
import com.qianqian.musicplayer.mongodb.MonthlyMongoDbFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoClientFactory;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * 手动配置{@link MongoDbFactory}，日志库
 *
 * @author zhouyi
 * @date 2019/1/15
 */
@Configuration
//禁用spring boot的自动配置
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
//激活@Repository注解，并且设置dao扫描包
@EnableMongoRepositories(basePackages = "com.qianqian.musicplayer.dao.mongodb.log", mongoTemplateRef = "logMongoHelper")
public class LogMongoDbConfig {

    @Bean(name = "logMongoProperties")
    @ConfigurationProperties(prefix = "spring.data.mongodb.log")
    public MongoProperties mongoProperties() {
        return new MongoProperties();
    }

    @Bean(name = "logMongoClientFactory")
    public MongoClientFactory mongoClientFactory(@Qualifier("logMongoProperties") MongoProperties properties, Environment environment) {
        return new MongoClientFactory(properties, environment);
    }

    @Bean(name = "logMongoClient")
    public MongoClient mongoClient(@Qualifier("logMongoClientFactory") MongoClientFactory factory) {
        return factory.createMongoClient(null);
    }

    @Bean(name = "logMongoDbFactory")
    public MonthlyMongoDbFactory mongoDbFactory(@Qualifier("logMongoClient") MongoClient mongoClient, @Qualifier("logMongoProperties") MongoProperties properties) {
        //这里new我们自己的MongoDbFactory即可
        return new MonthlyMongoDbFactory(mongoClient, properties.getDatabase());
    }

    @Bean(name = "logMongoHelper")
    public MongoHelper mongoTemplate(@Qualifier("logMongoDbFactory") MonthlyMongoDbFactory mongoDbFactory) {
        return new MongoHelper(mongoDbFactory);
    }

}
