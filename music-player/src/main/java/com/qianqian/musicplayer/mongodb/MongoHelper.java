package com.qianqian.mongodb;

import com.mongodb.client.*;
import com.mongodb.client.result.UpdateResult;
import com.qianqian.util.dateutil.DateFormat;
import org.apache.commons.lang3.StringUtils;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by zhouyi on 2018/6/25.
 */
public class MongoHelper extends MongoTemplate {

    private MonthlyMongoDbFactory monthlyMongoDbFactory;

    public MongoHelper(MonthlyMongoDbFactory mongoDbFactory) {
        super(mongoDbFactory);
        this.monthlyMongoDbFactory = mongoDbFactory;
    }

    public MongoDatabase getDb(String dbName) {
        return monthlyMongoDbFactory.getDb(dbName);
    }

    public MongoDatabase getDb(Date date) {
        String month = DateFormat.dateFormat(date, "yyyyMM");
        return monthlyMongoDbFactory.getDbByMonth(month);
    }

    public MongoCollection getCollection(String collectionName){

        return monthlyMongoDbFactory.getDb().getCollection(collectionName);
    }

    public MongoCollection getCollection(String dbName, String collectionName){
        return monthlyMongoDbFactory.getDb(dbName).getCollection(collectionName);
    }

    public MongoCollection getCollection(Date date, String collectionName){
        String month = DateFormat.dateFormat(date, "yyyyMM");
        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(collectionName);
    }

    public MongoCollection getCollectionByMonth(String month, String collectionName){
        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(collectionName);
    }

    public MongoCollection getCollectionByDay(String day, Class<?> entityClass){
        String month = null;
        try {
             month = DateFormat.dateFormat(DateFormat.dateFormat(day, "yyyy-MM-dd"), "yyyyMM");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(getCollectionName(entityClass));
    }

    public MongoCollection getCollection(Class<?> entityClass){
        String month = DateFormat.dateFormat(new Date(), "yyyyMM");
        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(getCollectionName(entityClass));
    }

    public MongoCollection getCollection(String dbName, Class<?> entityClass){
        return monthlyMongoDbFactory.getDb(dbName).getCollection(getCollectionName(entityClass));
    }

    public MongoCollection getCollection(Date date, Class<?> entityClass){
        String month = DateFormat.dateFormat(date, "yyyyMM");
        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(getCollectionName(entityClass));
    }

    public MongoCollection getCollectionByMonth(String month, Class<?> entityClass){
        return monthlyMongoDbFactory.getDbByMonth(month).getCollection(getCollectionName(entityClass));
    }

    public void insert(Date date, Object objectToSave) {
        MonthSelector.set(date);
        super.insert(objectToSave);
    }

    public void insertAll(Date date, Collection<? extends Object> objectsToSave) {
        MonthSelector.set(date);
        super.insertAll(objectsToSave);
    }

    public UpdateResult updateFirst(Date date, Query query, Update update, Class<?> entityClass) {
        MonthSelector.set(date);
        return super.updateFirst(query, update, entityClass);
    }

    public UpdateResult updateMulti(Date date, Query query, Update update, Class<?> entityClass) {
        MonthSelector.set(date);
        return super.updateMulti(query, update, entityClass);
    }

    /**
     * 更新
     * @param query 更新条件
     * @param update 更新内容
     */
    public UpdateResult update(MongoCollection collection, Document query, Document update){
        if (query == null) {
            query = new Document();
        }
        Document setUpdate = new Document("$set", update);
        return collection.updateMany(query, setUpdate);
    }

    /**
     * 更新
     * @param query 更新条件
     * @param setUpdate 更新内容
     * @param incUpdate 更新内容
     */
    public UpdateResult update(MongoCollection collection, Document query, Document setUpdate, Document incUpdate) {
        if (query == null) {
            query = new Document();
        }
        Document update = new Document();
        update.put("$set", setUpdate);
        update.put("$inc", incUpdate);
        return collection.updateMany(query, update);
    }

    /**
     * inc更新
     * @param query 更新条件
     * @param update 更新内容
     */
    public UpdateResult incUpdate(MongoCollection collection, Document query, Document update){
        if (query == null) {
            query = new Document();
        }
        Document incUpdate = new Document("$inc", update);
        return collection.updateMany(query, incUpdate);
    }

    /**
     * 更新
     * @param query 更新条件
     * @param update 更新内容
     */
    public UpdateResult updateOne(MongoCollection collection, Document query, Document update){
        if (query == null) {
            query = new Document();
        }
        Document setUpdate = new Document("$set", update);
        return collection.updateOne(query, setUpdate);
    }

    /**
     * 更新
     * @param query 更新条件
     * @param setUpdate 更新内容
     * @param incUpdate 更新内容
     */
    public UpdateResult updateOne(MongoCollection collection, Document query, Document setUpdate, Document incUpdate) {
        if (query == null) {
            query = new Document();
        }
        Document update = new Document();
        update.put("$set", setUpdate);
        update.put("$inc", incUpdate);
        return collection.updateOne(query, update);
    }

    /**
     * inc更新
     * @param query 更新条件
     * @param update 更新内容
     */
    public UpdateResult incUpdateOne(MongoCollection collection, Document query, Document update){
        if (query == null) {
            query = new Document();
        }
        Document incUpdate = new Document("$inc", update);
        return collection.updateOne(query, incUpdate);
    }

    /**
     * 根据id查询一条记录
     * @param id 表的_id主键
     */
    public Document getOne(MongoCollection collection, ObjectId id) {
        if (id == null) {
            return null;
        }
        return (Document) collection.find(new Document("_id", id)).first();
    }

    /**
     * 根据id查询一条记录
     * @param id 表的_id主键
     * @param keys 要查询的字段
     */
    public Document getOne(MongoCollection collection, ObjectId id, Document keys) {
        if (id == null) {
            return null;
        }
        return (Document) collection.find(new Document("_id", id)).projection(keys).first();
    }

    /**
     * 查询列表
     * @param query 查询条件
     */
    public List<Document> findList(MongoCollection collection, Document query) {
        if (query == null) {
            query = new Document();
        }
        List<Document> list = new ArrayList<>();
        return (List<Document>) collection.find(query).into(list);
    }

    /**
     * 查询列表
     * @param query 查询条件
     * @param sort 排序
     */
    public List<Document> findList(MongoCollection collection, Document query, Document sort) {
        if (query == null) {
            query = new Document();
        }
        List<Document> list = new ArrayList<>();
        return (List<Document>) collection.find(query).sort(sort).into(list);
    }

    /**
     * 查询列表
     * @param query 查询条件
     * @param keys 字段
     */
    public List<Document> findListByKeys(MongoCollection collection, Document query, Document keys) {
        if (query == null) {
            query = new Document();
        }
        List<Document> list = new ArrayList<>();
        return (List<Document>) collection.find(query).projection(keys).into(list);
    }

    /**
     * 查询列表
     * @param query 查询条件
     * @param sort 排序
     */
    public List<Document> findListByKeys(MongoCollection collection, Document query, Document keys, Document sort) {
        if (query == null) {
            query = new Document();
        }
        List<Document> list = new ArrayList<>();
        return (List<Document>) collection.find(query).projection(keys).sort(sort).into(list);
    }

    /**
     * 分片集群count数据量时请用这个方法
     */
    public long count(MongoCollection collection, Document query) {
        Document match = new Document("$match", query);
        List<Document> countList = new ArrayList<>();
        countList.add(match);
        countList.add(Document.parse("{$group:{_id:null,count:{$sum:1}}}"));
        MongoCursor<Document> mongoCursor = collection.aggregate(countList).iterator();
        long count = 0;
        if (mongoCursor.hasNext()) {
            count = mongoCursor.next().getInteger("count");
        }
        return count;
    }

    /**
     * 分页查询
     * @param query 查询条件
     */
    public List<Document> findList(MongoCollection collection, Document query, MongoPage page) {
        if (query == null) {
            query = new Document();
        }
        FindIterable findIterable = collection.find(query);
        //设置总数和分页数
        //long totalCount = collection.count(query);
        long totalCount = count(collection, query);
        page.setTotalCount(totalCount);
        long totalPage = Math.round(Math.ceil((double)totalCount/(double)page.getPageSize()));
        page.setTotalPage(totalPage);
        //设置排序
        if (page.getOrderBy() != null) {
            findIterable.sort(page.getOrderBy());
        }
        //设置分页查询
        findIterable.skip((page.getPageNumber() - 1) * page.getPageSize()).limit(page.getPageSize());
        List<Document> list = new ArrayList<>();
        return (List<Document>) findIterable.into(list);
    }

    /**
     * 分页查询，只查询需要的字段keys
     * @param query 查询条件
     */
    public List<Document> findList(MongoCollection collection, Document query, MongoPage page, Document keys) {
        if (query == null) {
            query = new Document();
        }
        FindIterable findIterable = collection.find(query);
        //设置字段
        if (keys != null && keys.size() > 0) {
            findIterable.projection(keys);
        }
        // 设置总数和分页数
        //long totalCount = collection.count(query);
        long totalCount = count(collection, query);
        page.setTotalCount(totalCount);
        long totalPage = Math.round(Math.ceil((double) totalCount / (double) page.getPageSize()));
        page.setTotalPage(totalPage);
        // 设置排序
        if (page.getOrderBy() != null) {
            findIterable.sort(page.getOrderBy());
        }
        // 设置分页查询
        findIterable.skip((page.getPageNumber() - 1) * page.getPageSize()).limit(page.getPageSize());
        List<Document> list = new ArrayList<>();
        return (List<Document>) findIterable.into(list);
    }

    /**
     * 分页查询
     * @param query 查询条件
     */
    public List<Document> findListBySort(MongoCollection collection, Document query, MongoPage page, Integer sort, String sidx) {
        if (query == null) {
            query = new Document();
        }
        FindIterable findIterable = collection.find(query);
        //设置总数和分页数
        //long totalCount = collection.count(query);
        long totalCount = count(collection, query);
        page.setTotalCount(totalCount);
        long totalPage = Math.round(Math.ceil((double)totalCount/(double)page.getPageSize()));
        page.setTotalPage(totalPage);
        //设置排序
        if (page.getOrderBy() != null) {
            findIterable.sort(page.getOrderBy());
        } else if (StringUtils.isNotBlank(sidx)) {
            findIterable.sort(new Document(sidx, sort));
        }
        //设置分页查询
        findIterable.skip((page.getPageNumber() - 1) * page.getPageSize()).limit(page.getPageSize());
        List<Document> list = new ArrayList<>();
        return (List<Document>) findIterable.into(list);
    }

    /**
     * 管道聚合
     */
    public AggregateIterable<Document> aggregate(MongoCollection collection, Document query, Document project, Document group) {
        if (query == null) {
            query = new Document();
        }
        List<Document> queryList = new ArrayList<>();
        queryList.add(new Document("$match", query));
        if (project != null && project.size() > 0) {
            queryList.add(new Document("$project", project));
        }
        if (group != null && group.size() > 0) {
            queryList.add(new Document("$group", group));
        } else {
            return null;
        }
        return collection.aggregate(queryList);
    }

    /**
     * 查询下一条记录
     * @param query 查询条件
     */
    public List<Document> findNextDocument(MongoCollection collection, Document query , Integer sort, String sidx) {
        if (query == null) {
            query = new Document();
        }
        FindIterable findIterable = collection.find(query);
        findIterable.sort(new Document("_id", 1));
        findIterable.limit(1);
        List<Document> list = new ArrayList<>();
        return (List<Document>) findIterable.into(list);
    }

}
