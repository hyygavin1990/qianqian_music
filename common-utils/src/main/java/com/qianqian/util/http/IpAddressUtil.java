package com.qianqian.util.http;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.*;
import java.util.Enumeration;

public class IpAddressUtil {
    public static void main(String[] args) {
        try {
            String outerIp = getOuterIp();
            String innerIp = getInnerIp();
            System.out.println("外网IP地址: " + outerIp);
            System.out.println("内外IP地址: " + innerIp);
        } catch (IOException e1) {
            e1.printStackTrace();
        }
    }

    public static String getOuterIp() throws IOException {
        InputStream inputStream = null;  
        try {  
            URL url = new URL("http://1212.ip138.com/ic.asp");  
            URLConnection urlconnnection = url.openConnection();  
            inputStream = urlconnnection.getInputStream();  
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "GB2312");  
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            StringBuffer webContent = new StringBuffer();  
            String str = null;  
            while ((str = bufferedReader.readLine()) != null) {  
                webContent.append(str);  
            }  
            int ipStart = webContent.indexOf("[") + 1;  
            int ipEnd = webContent.indexOf("]");  
            return webContent.substring(ipStart, ipEnd);  
        } finally {  
            if (inputStream != null) {  
                inputStream.close();  
            }  
        }  
    }

    public static String getInnerIp() {
        try {
            InetAddress inetAddress = null;
            inetAddress = InetAddress.getLocalHost();
            return inetAddress.getHostAddress();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static String getInnerIpLinux() throws SocketException {
        String localip = null;// 本地IP，如果没有配置外网IP则返回它
        String netip = null;// 外网IP
        try {
            Enumeration netInterfaces = NetworkInterface.getNetworkInterfaces();
            InetAddress ip = null;
            boolean finded = false;// 是否找到外网IP
            while (netInterfaces.hasMoreElements() && !finded) {
                NetworkInterface ni = (NetworkInterface) netInterfaces.nextElement();
                Enumeration address = ni.getInetAddresses();
                while (address.hasMoreElements()) {
                    ip = (InetAddress) address.nextElement();
                    if (!ip.isSiteLocalAddress() && !ip.isLoopbackAddress() && ip.getHostAddress().indexOf(":") == -1) {// 外网IP
                        netip = ip.getHostAddress();
                        finded = true;
                        break;
                    } else if (ip.isSiteLocalAddress() && !ip.isLoopbackAddress() && ip.getHostAddress().indexOf(":") == -1) {// 内网IP
                        localip = ip.getHostAddress();
                        //获取192.168.0.X那个，因为多网卡会有多个ip
                        String[] localips = localip.split("\\.");
                        if(localips.length == 4 && localips[2].equals("0") && localips[0].equals("192")){
//                            System.out.println(localip);
                            finded = true;
                            break;
                        }
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }

        if (netip != null && !"".equals(netip)) {
            return netip;
        } else {
            return localip;
        }
    }
}