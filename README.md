# Lyst - Service Architecture Patterns

This repository focuses on architectural design patterns for interacting with services and servers, implemented without comprehensive frameworks.

This repository contains projects I worked on between September 2018 and March 2021.

## Basic Concept

Lyst is a simple custom field app implementation. This repo explores various ways to implement an API for website and client interactions. All code is NodeJS-based and written in TypeScript.
There is not much commenting to explain the code, so I will briefly explain what each folder in this repo is about.
If you want to do a bit of a deeper dive into how each section functions then I would recommend cloning the repo and using GitHub Copilot in VSCode (Claude 3.5 Sonnet is the best bet) and ask it to give a brief overview of the project, eg. test-communication-service. It will not be entirely accurate but it should give a decent summary of what the project is about.
I originally didn't plan to publish any of this work, because it was more meant as a way for me to learn and understand the concepts, but I recently started looking at this project again to get some practice with docker and docker compose. I will publish it as is and slowly update all the projects to be part of the docker compose. I will also fix some of the issues present and try to make the repository more well organised.

### core
This project contains all the types and interfaces for interacting with a Lyst entity. This should ideally be an npm package and included in the dependencies section of package.json for the projects wanting to reference it.

### core-services
This project contains service wrappers and communication interfaces for interacting with services and for creating services. This should also be an npm package.

### lyst-website
This project is a nuxt website implementing a basic custom field builder.

### test-communication-service
This project is a service registry and message broker. The communication is using SocketIO which is an implementation of websockets. Services will use the wrappers and interfaces in core-services to register with the communication service. Then when a client wants to call a method on the Service it will automatically go through the communication service and send a message to the correct service and respond accordingly to the client.

### template
A very basic service used as a template to create a new service in the repository. This folder is zipped with 7z and then you run the Lyst-CreateService powershell script to create a copy with a new Name and Description.

### test-service
The most basic service used as a basic test.

### test-client
The most basic client implementation. Demonstrating how to invoke a method on a service from a client application or service.

### database-service
A service that implements IDatabaseService. This implementation uses a MongoDB client to interact with a MongoDB database in order to perform operations on the database.

### entity-service
A service that implements IEntityService. This implementation uses the database service for getting information and updating information on the entities used in the Lyst app.

### validation-service
A service that implements IValidationService. This implementation creates a validation registry using reflect metadata, enabling runtime validation of entities based on their type and method (create, update, etc.).

### database
This project is entirely separate from the communication-service architecture. It is self-contained except for using the interfaces and types in core. It uses IoC containers and a loader to create controllers and services. This allows for dependency injection. It is essentially a factory of services and controllers. The client will connect to the server using SocketIO and send requests which will be routed to the correct controller. The controller will use services to do the action required in the request and then respond accordingly.

### api-rest
This implements a standard rest api over http and then connects to the database service above via SocketIO to fulfil requests. This also implements IoC containers for creating controllers and services.

### api
This is an older project and was a first attempt at creating a similar pattern to the api-rest project. It is very barebones though.

------------------------------------------

## Key Projects
The best projects to look at in this repo to get a good idea of what is going on is as follows:
- **core-services**: Nearly all of the powerful code for the service registry/message broker pattern can be found in the interfaces, service wrappers and util functions in this project.
- **database**: This project is almost entirely self contained and displays a very powerful design prototype for implementing a service. The combination of inversion of control and dependency injection is useful for many reasons.

## Design Patterns

### Service Registry Pattern
The core-services project implements a service registry and message broker pattern, enabling:

- Dynamic service discovery
- Loose coupling
- Easy testing
- Modular architecture

### Dependency Injection
The database service demonstrates IoC container usage with:

- Constructor injection
- Interface-based design
- Service factories
- Runtime binding

Feel free to contact me if you have feedback/questions.
