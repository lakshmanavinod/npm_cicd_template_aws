#Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node as build-stage

ARG app_dir=/usr/src/app/

WORKDIR $app_dir

COPY package*.json $app_dir

RUN npm install

COPY ./ $app_dir

# To run test cases in future
#RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

ARG configuration=prod

RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /usr/src/app/dist/out/ /usr/share/nginx/html
