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
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

/**
 * 手动配置{@link MongoDbFactory}，主库
 *
 * @author fonlin
 * @date 2018/6/28
 */
@Configuration
//禁用spring boot的自动配置
@EnableAutoConfiguration(exclude={MongoAutoConfiguration.class, MongoDataAutoConfiguration.class})
//激活@Repository注解，并且设置dao扫描包
@EnableMongoRepositories(basePackages = "com.qianqian.musicplayer.dao.mongodb.master", mongoTemplateRef = "masterMongoHelper")
public class MasterMongoDbConfig {


    @Bean(name = "masterMongoProperties")
    @ConfigurationProperties(prefix = "spring.data.mongodb.master")
    @Primary
    public MongoProperties mongoProperties() {
        return new MongoProperties();
    }

    @Bean(name = "masterMongoClientFactory")
    @Primary
    public MongoClientFactory mongoClientFactory(@Qualifier("masterMongoProperties") MongoProperties properties, Environment environment) {
        return new MongoClientFactory(properties, environment);
    }

    @Bean(name = "masterMongoClient")
    @Primary
    public MongoClient mongoClient(@Qualifier("masterMongoClientFactory") MongoClientFactory factory) {
        return factory.createMongoClient(null);
    }


    @Bean(name = "masterMongoDbFactory")
    @Primary
    public MonthlyMongoDbFactory mongoDbFactory(@Qualifier("masterMongoClient") MongoClient mongoClient, @Qualifier("masterMongoProperties") MongoProperties properties) {
        //这里new我们自己的MongoDbFactory即可
        return new MonthlyMongoDbFactory(mongoClient, properties.getDatabase());
    }

    @Bean(name = "masterMongoHelper")
    @Primary
    public MongoHelper mongoTemplate(@Qualifier("masterMongoDbFactory") MonthlyMongoDbFactory mongoDbFactory) {
        return new MongoHelper(mongoDbFactory);
    }

}
