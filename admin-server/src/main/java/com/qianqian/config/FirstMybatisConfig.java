package com.qianqian.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import tk.mybatis.mapper.autoconfigure.MapperAutoConfiguration;
import tk.mybatis.spring.annotation.MapperScan;

import javax.sql.DataSource;

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
@MapperScan(basePackages = "com.qianqian.dao.mysql.first", sqlSessionTemplateRef = "sqlSessionTemplate1")
@EnableAutoConfiguration(exclude = {MapperAutoConfiguration.class, MybatisAutoConfiguration.class})
public class FirstMybatisConfig {

    @Bean(name = "datasource1")
    @ConfigurationProperties(prefix = "spring.datasource.first")
    @Primary
    @RefreshScope
    public DataSource testDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "sessionFactory1")
    @Primary
    public SqlSessionFactory testSqlSessionFactory(@Qualifier("datasource1") DataSource dataSource) throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setTypeAliasesPackage("com.qianqian.entity");
        org.apache.ibatis.session.Configuration configuration = new org.apache.ibatis.session.Configuration();
        configuration.setMapUnderscoreToCamelCase(true);
        bean.setConfiguration(configuration);
        return bean.getObject();
    }

    @Bean(name = "transactionManager1")
    @Primary
    public DataSourceTransactionManager testTransactionManager(@Qualifier("datasource1") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "sqlSessionTemplate1")
    @Primary
    public SqlSessionTemplate testSqlSessionTemplate(@Qualifier("sessionFactory1") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
