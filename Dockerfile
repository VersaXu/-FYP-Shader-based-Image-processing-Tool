# 设置基础镜像
FROM nginx:1.21.0
LABEL maintainer "Richard"
ADD ./dist/ /usr/share/nginx/html/bdtp/
ADD ./nginx/nginx.conf /etc/nginx/
EXPOSE 80