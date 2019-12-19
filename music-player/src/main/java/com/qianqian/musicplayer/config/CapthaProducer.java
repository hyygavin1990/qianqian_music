package com.qianqian.musicplayer.config;

import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.google.code.kaptcha.util.Config;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Created by hyygavin on 2017/11/15.
 */
@Configuration
public class CapthaProducer extends DefaultKaptcha {
    CapthaProducer() {
        InputStream in;
        Properties props = new Properties();
        ClassLoader loader = Thread.currentThread().getContextClassLoader();
        in = loader.getResourceAsStream("mykaptcha.properties");
        try {
            props.load(in);
        } catch (IOException e) {
            e.printStackTrace();
        }
        Config config = new Config(props);
        this.setConfig(config);
    }
}
