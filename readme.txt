# project
run project
$ npm run start:dev

create module
$ nest g module [module name] --no-spec

create controller
$ nest g controller [controller name] --no-spec

setup field validator library
$ npm i class-transformer class-validator

change case
$ npm i change-case

pips
$ g pi changeStringCase --no-spec

# connect with db
$ npm install --save typeorm mysql2 // mysql
$ npm install --save typeorm pg //progress sql
$ npm install --save mongoose // mongodb

new update
$ @nestjs/typeorm

multipart
$ npm i multer fs-extra

encryp password
$ npm i bcrypt

create middleware (middle watch request only)
$ nest g mi logger --no-spec

create interceptor (interceptor watch request and response)
$ nest g itc logger --no-spec

create gurad (Guards are executed after all middleware, but before any interceptor or pipe.)
$ nest g gu my --no-spec

create passport + jwt
$ yarn add @nestjs/jwt @nestjs/passport passport passport-jwt

serve static
$ yarn add @nestjs/serve-static
