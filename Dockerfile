FROM node:11.10 as base
WORKDIR /mazemap/frontend/reactproject
RUN yarn install

FROM base as development
EXPOSE 3000
ENV NODE_ENV=development
WORKDIR /mazemap/frontend/reactproject

FROM development as build
ENV NODE_ENV=production
RUN ["yarn", "build"]

# Make a target without unecessary files, to minimize image size
FROM mhart/alpine-node as production
WORKDIR /mazemap/frontend/reactproject
COPY --from=build /mazemap/frontend/reactproject/dist ./dist
