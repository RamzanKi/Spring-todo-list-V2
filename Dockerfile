FROM tomcat
COPY /target/root.war /usr/local/tomcat/webapps/
