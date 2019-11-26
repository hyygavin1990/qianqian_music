package com.qianqian.core.log;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

/**
 * 日志管理器
 *
 * 使用异步线程池进行日志操作
 *
 * @author fonlin
 * @date 2018/9/20
 */
public class LogManager {

    /**
     * 这里固定线程池大小5，当有其他任务到来时进入队列等待
     */
    private static final Executor executor = Executors.newFixedThreadPool(5);

    public static void execute(Runnable runnable) {
        executor.execute(runnable);
    }

}
