# Aragon Discussion App


Proof of concept for an Aragon Discussion App.


## Requirements

1. For the transport layer, a Geth node with Whisper enabled must be running

2. To support signing data, a custom [aragon client](https://github.com/espresso-org/aragon.git) is also required:

```sh
git clone --branch sign https://github.com/espresso-org/aragon.git ~/.aragon/wrapper-sign-enabled
cd ~/.aragon/wrapper-sign-enabled
npm install 
npm run build
```

## Running the app

```ssh
npm install
npm run build
npm start
```
