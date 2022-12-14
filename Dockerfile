FROM node:16

WORKDIR /app

COPY ..

VOLUME ["/app/logs"]

EXPOSE 13000

CMD ["npm", "run" ,"start:prod"]