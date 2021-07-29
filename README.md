# Whatsapp forwarder

>Functions

Whatsapp bot that forwards every message you receive to your email address

##Getting started

First, you need to install all modules used in this project

```shell
npm install
```

## Configuring

After you installed modules, you need to create .env file that stores your data.
It should look like this:
```shell
email=sender@mail.com
pass=examplepass
receiver=receiver@mail.com
```
Note: you need to turn on feature that gives access to less secure apps:
        https://myaccount.google.com/lesssecureapps
        It can't have two factor authentication

## Starting app

Type:
```shell
npm start
```
QR Code will be created and next you need to link it with your phone.
You should receivee message like this:
    "Client is ready!"

When someone sends you a message, contact will receiver a reply.
    >You can change message on line 47 in index.js
Email will be sent and you will be notified in console.

Every sent message is logged in log.txt

## Licensing
This project is licensed under Unlicense license. This license does not require you to take the license with you to your project.