Informer
============
service for sending notification messages

# Demo

## Start service

### local

```sh
npm ci
npm run start
```

### docker

```sh
docker-compose up --build
```

## Send email

```sh
curl -XPOST http://localhost:8888/email -d '{"from": "a@gmail.com", "to": "b@gmail.com", "subject":"test", "text": "hello"}'
```

## Send apple push notification

```sh
curl -XPOST http://localhost:8888/apple -d '{"from": "informer", "to": "d482531bf9ee214d14ad7593bd88d78991ec6bcece5c8982c917ae029ae641e1", "subject":"test", "text": "hello"}'
```

## Send google push notification

```sh
curl -XPOST http://localhost:8888/google -d '{"from": "informer", "to": "dcTEm2sHrPCmTMYTeYjTXX:APA91bEfwLnzlf2T2c9j4R5REfETxnzrphrvtXar3dvNIiRLYd_sn-Y5Ax4b09-J2ZnGcFtcZCBgRpk9IzavDKPIVBCF7bdurf803CxoCzsQTmUjoUmEEraCFBbE3mqzu-elOqoi6UE-", "subject":"test", "text": "hello"}'
```