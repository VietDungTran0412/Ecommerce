# Ecommerce Web Application

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies-specification)
  - [ReactJS](#1-reactjs)
  - [Java Spring Boot](#2-java-spring-boot-)
  - [MongoDB](#4-mongodb)

## Overview
Welcome to our E-Commerce Application! This application is designed to provide a seamless online shopping experience for users. It includes features for browsing products, managing user accounts, processing orders, and more. This README will guide you through the setup and usage of the application. 

This is a full-stack web application project from end to end including the development process which consisted of web frameworks like ReactJs and Java Spring Boot and the deployment process into AWS using different services.

## Usage

### 1. Prerequisite
It is required to have to Docker as the core prerequisite. For deployment purpose, I deployed to application into AWS and provision infrastructure there using Terraform. The details of deployment process will be specified later.
- [Docker](https://docs.docker.com/get-docker/)
- [AWS Account](https://aws.amazon.com/resources/create-account/) (For deployment purpose only)
- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) (For deployment purpose only)

### 2. Local Use
This project requires to launch Spring Boot server, React, RabbitMQ and MongoDB. 
It is recommended to use Docker specifically docker-compose to launch the whole application at once.
<br/>
<br/>
First, we will have to build the Spring Boot app in `ecommerce` directory. In `ecommerce` directory, run the following command to package Spring Boot Application.
It is required to package the Spring Boot App. You can either modify the Dockerfile.server so the build process of Java app will be comprehensively done in Docker.
```bash
./gradlew clean build
```
<br/>
Run the docker-compose command in the root directory of the project to launch the application:
```bash
docker compose up -d
```
or 
```bash
docker-compose up -d
```

The application now is accessible at port 80 of your own device.
<br/>

For more details about the deployment process into AWS, please refers to [Deployment Specification](#deployment-specification)

## Development Specification

### 1. ReactJS
The project employed ReactJS supported by AntDesign and TailwindCSS for rapid UI development. The source folder of the front-end development has been located in `ecommerce-views` directory.

### 2. Java Spring Boot 
As core part of the backend development, the project adopted Java Spring Boot. Spring Boot is one of a robust framework which enabled developers to rapidly create an enterprise scalable app. For mor information about Spring Boot, please refer to the official documentation at [docs.spring.io](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/).

### 3. GraphQL
For better client's data retrieval, a GraphQL has been developed using Java Spring Boot. GraphQL enables client to rapidly query the only fields that has been defined in the schema from the backend server. Hence, it provides the proactivity for my development in React to query and mutate data efficiently.

#### [DGS Framework](https://netflix.github.io/dgs)
In the GraphQL development phase, DGS Framework has been used as one of the core library that supported Spring Boot to develop a GraphQL server. This library has been developed my Netflix and in my opinion, it is one of the most robust GraphQL library for Spring Boot. For more information, please refer to the official site of [DGS Framework](https://netflix.github.io/dgs/).

#### [Apollo Client](https://www.apollographql.com/docs/react/)
From the client, it adopted Apollo Client for better GraphQL operation. Since Apollo Client is very well-documented and beginner's friendly and it also provided multiple useful features like caching, refetching, it s one of the most robust open-source library for GraphQL client at the moment. In the ui development phase, all the interaction between client and the server has been done by using Apollo Client. Please refer to [Apollo Client](https://www.apollographql.com/docs/react) for mor information. 

### 4. MongoDB
MongoDB has been employed in this project to provide better data storage and flexible schema for the application.

### 5. RabbitMQ
In the development process, the application integrated with Stripe for virtual payment implementation. Because you can not retrieve that status of the deployment immediately so the queue
would be used for retrieving the status of the payment and store in the database later

## AWS Deployment Specification