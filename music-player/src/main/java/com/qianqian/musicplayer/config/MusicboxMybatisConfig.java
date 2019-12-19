package com.qianqian.musicplayer.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * 多数据源配置
 *
 * 自定义{@link org.apache.ibatis.session.Configuration}，避免多个数据源使用同一个Configuration
 * 否则相关配置比如datasource会错乱。
 *
 * 注意：必须禁用mybatis和tk.mybatis的AutoConfiguration。
 *
 * @author fonlin
 * @date 2018/6/28
 */
@Configuration
//@MapperScan(basePackages = "com.qianqian.dao.mysql.first", sqlSessionTemplateRef = "sqlSessionTemplate1")
//@EnableAutoConfiguration(exclude = {MapperAutoConfiguration.class, MybatisAutoConfiguration.class})
public class MusicboxMybatisConfig {

    @Primary
    @Bean(name = "musicboxDataSourceProperties")
    @ConfigurationProperties(prefix = "musicbox.datasource")
    public DataSourceProperties primaryDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Primary
    @Bean(name = "musicboxDataSource")
    @RefreshScope
    @ConfigurationProperties(prefix = "musicbox.datasource")
    public DataSource dataSource(@Qualifier("musicboxDataSourceProperties") DataSourceProperties dataSourceProperties) {
        return dataSourceProperties.initializeDataSourceBuilder().build();
    }

    @Primary
    @Bean(name = "musicboxTransactionManager")
    public DataSourceTransactionManager transactionManager(@Qualifier("musicboxDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Primary
    @Bean(name = "musicboxSqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("musicboxDataSource") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        return factoryBean.getObject();
    }

    @Primary
    @Bean(name = "musicboxConfigurer")
    public static MapperScannerConfigurer mapperScannerConfigurer(){
        MapperScannerConfigurer mapperScannerConfigurer = new MapperScannerConfigurer();
        mapperScannerConfigurer.setBasePackage("cn.qianqian.musicplayer.dao.mysql.musicbox");
        Properties propertiesMapper = new Properties();
        //通用mapper位置，不要和其他mapper、dao放在同一个目录
        propertiesMapper.setProperty("mappers", "tk.mybatis.mapper.common.Mapper,tk.mybatis.mapper.common.special.InsertListMapper");
        propertiesMapper.setProperty("notEmpty", "false");
        //主键UUID回写方法执行顺序,默认AFTER,可选值为(BEFORE|AFTER)
//        propertiesMapper.setProperty("ORDER","BEFORE");
        mapperScannerConfigurer.setProperties(propertiesMapper);
        mapperScannerConfigurer.setSqlSessionFactoryBeanName("musicboxSqlSessionFactory");
        return mapperScannerConfigurer;
    }
}
