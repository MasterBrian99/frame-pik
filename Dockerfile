FROM node:22  AS build

WORKDIR /app

COPY . .

RUN pwd && ls

RUN npm install

WORKDIR /app/apps/server 

RUN pwd && ls

RUN npm install

WORKDIR /app
RUN pwd && ls


RUN npm run server:build

RUN npm run client:build

FROM node:22 
WORKDIR /app


COPY --from=build /app/apps/server/dist /app/dist
COPY --from=build /app/apps/server/tsconfig.json .
COPY --from=build /app/apps/server/package*.json .

RUN npm install 

RUN pwd && ls
# COPY /app/apps/server/dist /app/dist

CMD ["npm", "run","start"]
# RUN npm run server:build