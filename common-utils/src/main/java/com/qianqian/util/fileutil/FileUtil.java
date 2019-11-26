package com.qianqian.util.fileutil;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.*;

/**
 * Created by Satroler on 2017/8/22.
 */
public class FileUtil {
    //临时文件转成wav
    public static void transformSocketFile(String tempFilePath, String realFilePath) {
        //文件转格式
        try {
            FileInputStream fileInputStream = new FileInputStream(tempFilePath);

            File outFile = new File(realFilePath);
            AudioFormat frmt = new AudioFormat(8000, 16, 1, true, false);

          /*  AudioInputStream ais = new AudioInputStream(
                    fileInputStream
                    ,frmt
                    ,fileInputStream.available());

            AudioSystem.write(
                    ais
                    , AudioFileFormat.Type.WAVE
                    ,new File(realFilePath));

            System.out.println("录音文件已经写到本地：" + realFilePath );*/

            //-----------------------------------------
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte tempBuffer[] = new byte[320];

            while (true) { //读取数据

                int cnt = fileInputStream.read(tempBuffer, 0, tempBuffer.length);

                if (cnt > 0) { //保存该数据

                    byteArrayOutputStream.write(tempBuffer, 0, cnt);

                } else {

                    byteArrayOutputStream.close();

                    break;

                }

            }
            byte audioData[] = byteArrayOutputStream.toByteArray();

            InputStream byteArrayInputStream = new ByteArrayInputStream(audioData);

            AudioInputStream audioInputStream = new AudioInputStream(byteArrayInputStream, frmt, audioData.length / frmt.getFrameSize());


            AudioSystem.write(audioInputStream, AudioFileFormat.Type.WAVE, outFile);

            System.out.println("success");

            //------------------------------------------------

            //关闭连接
            fileInputStream.close();
            //存在文件流没有关闭，导致文件被占用，无法删除。 垃圾回收
            System.gc();
            System.gc();
            //删除原始文件
            File localTmpFile = new File(tempFilePath);

            if (localTmpFile.exists() && localTmpFile.isFile()) {
                if (localTmpFile.delete()) {
                    System.out.println("原始文件已经删除 ：" + tempFilePath);
                }
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
