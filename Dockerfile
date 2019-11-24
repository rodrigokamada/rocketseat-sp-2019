# APP BUILD STAGE
FROM node:dubnium AS appbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm ci

# Build app
COPY tsconfig.json /usr/src/app/
COPY src /usr/src/app/src
RUN npm run build

# Install app production dependencies
RUN rm -rf node_modules && \
    npm ci --production && \
    npm cache clean --force


# IMAGE BUILD STAGE
FROM node:dubnium-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY --from=appbuild /usr/src/app/node_modules /usr/src/app/node_modules

# Bundle app source
COPY --from=appbuild /usr/src/app/dist /usr/src/app/dist
COPY config /usr/src/app/config

EXPOSE 3000

CMD [ "node", "dist" ]
