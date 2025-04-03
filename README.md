# OTP Generator & Verifier 🔑

A simple and secure OTP (One-Time Password) generator and verifier without the need to store OTPs in the database. Generate OTPs and verify them seamlessly using cryptographic techniques.

## Features

- ✅ Generate Secure OTPs
- ✅ Verify OTPs without storing them.
- ✅ Customizable expiration time.
- ✅ Lightweight and fast.

## Installation

```
npm install otp-verifier

OR

yarn install otp-verifier

```

## Usuage

### Common Js

    ```
    const {otpGenerator,otpVerifier}=require('otp-verifier');

    ```

### ES Module

    ```
    import {otpGenerator,otpVerifier} from 'otp-verifier';

    ```

### Generate OTP

```
    const {hashedData,otp}=await otpGenerator({
        email:'johnDoe@gmail.com',
        validityTimeInMinutes:'3'
    })
```

### Verify OTP

```
 const {isVerified, message}=await otpVerifier({
     email: 'johnDoe@gmail.com';
     otp: '121212';
     hash: 'asdfasdf.1212.342342.34123.12.afadfadeawr.adfasdfhgrserty';
 })
```

## 🌟 Why Choose This Package?

- No need to store OTPs in the database.

- Simple and easy to integrate.

- Highly secure with cryptographic techniques

## 📝 License

This project is licensed under the MIT License.
