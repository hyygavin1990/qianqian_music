package com.qianqian.musicplayer.mongodb;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoDatabase;
import com.qianqian.musicplayer.constant.Constants;
import org.apache.commons.lang3.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.util.Assert;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 继承 {@link SimpleMongoDbFactory }，重写{@code getDB}方法，添加月库
 *
 * @author fonlin
 * @date 2018/6/28
 */
public class MonthlyMongoDbFactory extends SimpleMongoDbFactory {

    /**
     * 没有分月库的数据库
     */
    private String databaseName;

    public MonthlyMongoDbFactory(MongoClientURI uri) {
        super(uri);
    }

    public MonthlyMongoDbFactory(MongoClient mongoClient, String databaseName) {
        super(mongoClient, databaseName);
        this.databaseName = databaseName;
    }

    public MongoDatabase getDb(String dbName) throws DataAccessException {
        return super.getDb(dbName);
    }

    public MongoDatabase getDb() throws DataAccessException {
        //获取当前ThreadLocal中的month
        String month = MonthSelector.getAndRemove();
        //如果没有，则设置当前月
        if (StringUtils.isEmpty(month)) {
            month = LocalDateTime.now().format(DateTimeFormatter.ofPattern(Constants.MONTH_PATTERN));
        }
        return getDbByMonth(month);
    }

    public MongoDatabase getDbByMonth(String month) throws DataAccessException {
        Assert.hasText(month, "month must not be empty.");
        String name = this.databaseName + "_" + month;
        return super.getDb(name);
    }

}
