# TDS200-Xplatform-Exam

## Grade A - Candidate 2009

![logo](./assets/2009logo.jpg)

This is the Exam 2023 in Cross-platform at Høyskolen Kristiania.<br />
The project will fail to run if `.env` for **Firebase** is not configured.<br />
Rename the `.env template` and set it up with your Firebase application configuration.

- [TDS200-Xplatform-Exam](#tds200-xplatform-exam)
  - [Introduction](#introduction)
  - [Issues \& bugs](#issues--bugs)
  - [Dependencies](#dependencies)
    - [Expo](#expo)
    - [Expo-Blur](#expo-blur)
    - [Firebase](#firebase)
    - [Image Manipulator](#image-manipulator)
    - [Fonts](#fonts)
    - [Linear Gradient](#linear-gradient)
    - [Local storage](#local-storage)
    - [Expo Location](#expo-location)
    - [Media Library](#media-library)
    - [Navigation](#navigation)
    - [Prettier](#prettier)
    - [React Native dotenv](#react-native-dotenv)
    - [Splash screen](#splash-screen)
    - [Safe Area](#safe-area)
    - [TailWind \& NativeWind](#tailwind--nativewind)
    - [Vector Icons](#vector-icons)
  - [GitHooks](#githooks)
    - [Instructions](#instructions)

## Introduction

- When application load the context, it will fetch to firebase and return the galleries from storage.
The decision for when to query firebase when you take a picture or cache the assets then query the firebase based on some condition was thought thoroughly.
- The initial idea was to post the pictures in a batch, but firebase does not allow post in batch. The workaround is to cache the pictures for this session in a collection then iterate over each item and post to firebase. This is of course not implemented.
The current state is to request for neccessarily API's on certain screen when focused, i.e. 'GalleryScreen' component.
- A separate navigation is created for authenticated user and guest for security. Extensive functions are only available if a user is logged in, and a shared data is available for both parties.

- A test user is provided for the sake of demonstration
email: *`2009@mail.com`*
password: *`123123`*

---

## How to use

- Install all dependencies `npm i`
- To run, `npx expo start`, or run on android `npx expo start --android`

---

## Issues & bugs

- Not any well known bugs per `12/12/2023`. Take this with a grain of salt.
- A minor patch has been done when newly created user name is not displayed immediately. Due to firebase function updating a user name is not in the same operation, combined with React state asynchrounus state batching the name is not setting before next event trigger. Thus, we implemented an additional state and doing a functional state update, while forcing React to reconcile before returning the **SignUp** component. *This was discovered accidentally whereas HomeScreen was showing immediate name even without utilizing our created state.*

- The user can **not** reset the password via email, so remember your password when creating a new user.

- **Physical device** an Android phone was used for developing and testing for the project.

- **Android** emulator was tested on a `Pixel5 API34`. It is worth to note that network configuration has to be setup in the device in order to run the app. Static IP is required with DNS and a cold boot will do. Instructions can be found [here](https://stackoverflow.com/a/52765004)

![Pixel5](./assets/screens.jpg)
![Emulator](./assets/emulator.png)

- **iOS** emulator should work in theory. Phyiscal device is at unknown state.

- **Webpack** does not compile on this project. Many dependencies are not supported for react-native-web.

---

## Dependencies

### [Authentication](https://firebase.google.com/docs/auth/web/manage-users?hl=en&authuser=1)

Using Firebase auth for authentication. User can create, login or browse as guest user. To store the authentication state we need to persist it. Somehow the typescript does not recognize the declared files so we have to add this into **tsconfig.json**

```json
  // Firebase auth module declaration
  "paths": {
      "@firebase/auth": ["./node_modules/@firebase/auth/dist/index.rn.d.ts"]
  }
```

---

### [Expo](https://docs.expo.dev/)

The bare bone is installed using **Expo Go** `npx create-expo-app -t` with TypeScript template. Flag `-t` for template.&nbsp;&nbsp;<br />

---

### [Expo-Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)

The modal is achieved by using Expo-Blur package via `npx expo install expo-blur`

---

### [Firebase](https://firebase.google.com/docs/web/setup)

The Firebase comes with **FireStore** and **Realtime Database**. Both has to be activated and configured in order make requests. The difference is one is for `JSON` and the other is for `Media` objects. To install Firebase `npm i firebase`. To start using Firebase create a project and add the appropriate platform i.e. `iOS` or `Android`.&nbsp;&nbsp;<br />
When the app has been registered, move the `google-services.json` file into root directory. Finally, create a **firebaseConfig.ts** file and configure the API accordingly

```js
// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

---

### [Image Manipulator](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/)

In order to save storage before uploading to Firebase, we compress the asset using `npx expo install expo-image-manipulator`

```js
const compressedBro = await manipulateAsync(
    snapshot.uri,
    [
        {
            resize: { height: 800, width: 800 },
        },
        {
            flip: FlipType.Horizontal,
        },
    ],
    { compress: 0.2, format: SaveFormat.JPEG }
);
```

---

### [Fonts](https://docs.expo.dev/versions/latest/sdk/font/)

Using custom fonts with library **Expo Font** via `npx expo install expo-font`. &nbsp;&nbsp;'The Typeface is **Handjet** & **Ubuntu** from [Google Fonts](https://fonts.google.com/). To use the Typeface in TypeScript we need to declare a module with **.ttf** files as strings. For optimal performance we use a HOC to dynamically pass in the Typeface we want.

---

### [Linear Gradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/)

React Native does not support gradients. We use Expo-LinearGradient from `npx expo install expo-linear-gradient` and pass in an array of colors.

---

### [Local storage](https://react-native-async-storage.github.io/async-storage/docs/usage)

The local storage works exactly like on web browser where we can store data in form of key and value pairs. &nbsp;&nbsp; Install via `npm install @react-native-async-storage/async-storage`.

---

### [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)

Expo location allows reading geolocation using `npx expo install expo-location`
Setting configuration inside **app.json/app.config.js**

```json
{
    "expo": {
        "plugins": [
            [
                "expo-location",
                {
                    "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
                }
            ]
        ]
    }
}
```

---

### [Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/)

The photo asset can be saved to album using `npx expo install expo-media-library` and store the image object as **uri**

---

### [Map View](https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md)

Using React Native Map for showing geolocation. `"npm install react-native-maps@1.7.1` using latest version will cause current dependencies to break. For Android SDK, iOS SDK we need GCP developer API key.

---

### [Navigation](https://reactnative.dev/docs/next/navigation)

Navigation between screens is similar to web with links **\<a href='#Home'>** but on native we are using same technique with **navigation.navigate('Home')**.&nbsp;&nbsp;
The gist is to wrap the entry of our Application with a container `NavigationContainer` then we can provide the navigation routes for different screens.
Install the container `npm install @react-navigation/native` and then we need the navigation from `npm install @react-navigation/stack` &nbsp;&nbsp; which offers animations and gestures. There is also a **[native-stack](https://reactnavigation.org/docs/stack-navigator)** which use the navigation primitives.

---

### [Prettier](https://medium.com/@killerchip0/react-native-typescript-with-eslint-and-prettier-e98d50585627)

Code structure formatter via `npx i --save-dev prettier` and add the following to **package.json**

```json
"scripts": {
        ...
        "prettier:write": "npx prettier --write **/*.{js,jsx,ts,tsx,json} && npx prettier --write *.{js,jsx,ts,tsx,json}"
    }
```

Create a new file `.prettierrc` and add the following rules

```json
{
    "arrowParens": "always",
    "bracketSpacing": true,
    "jsxSingleQuote": false,
    "quoteProps": "as-needed",
    "singleQuote": true,
    "semi": true,
    "printWidth": 100,
    "useTabs": false,
    "tabWidth": 4,
    "trailingComma": "es5",
    "endOfLine": "auto"
}
```

Finally, we add VSCODE settings in `settings.json` under TypeScript to prettify on save

```json
"[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
    },
```

---

### [React Native dotenv](https://www.npmjs.com/package/react-native-dotenv)

Loading environment variables using a babel plugin. To use **.env** file install `npm install -D react-native-dotenv`&nbsp;&nbsp;flag `-D` is default.
Add the following in **.babelrc** or **babel.config.js**

```js
module.exports = function(api) {
  api.cache(true);
  return {
    ...
    plugins: ["nativewind/babel", [
      'module:react-native-dotenv', {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        allowUndefined: true,
      }
    ]],
  };
};
```

Then create a folder `types` and create a file `env.d.tsx` with the following

```js
// env.d.tsx
declare module '@env' {
 export const APIKEY: string;
}
// to import
import { APIKEY } from '@env';
```

Finally add the following in `tsconfig.json` to compile

```js
{
  "compilerOptions": {
      "typeRoots": ["./src/types"]
  }
}
```

---

### [Splash screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)

**SplashScreen** module from the **expo-splash-screen** for preloading fonts and other gimmicks. Install via `npx expo install expo-splash-screen`

---

### [Safe Area](https://docs.expo.dev/develop/user-interface/safe-areas/)

The Component **SafeAreaView** is unstable and the recommendation is to use the hook instead **useSafeAreaInsets**. `npx expo install react-native-safe-area-context`

---

### [TailWind & NativeWind](https://www.nativewind.dev/quick-starts/expo)

NativeWind uses Tailwind CSS as scripting language, Styled Components is using **StyleSheet.create** for native. The latest NativeWind is not fully supported so we have to explicit install version **3.3.2** `npm i tailwindcss@3.3.2 --save-dev`. Flag `--save-dev` will put dependencies into `devDependencies` and will not be part of the production build. Now we install NativeWind `npm i nativewind`.
Then we have to declare the types for referencing NativeWind by creating a file `app.d.ts` with the following line

```js
/// <reference types="nativewind/types" />
```

Then setup the TailWind configuration `npx tailwindcss init`, and extend the content with the following line

```js
content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
```

Finally modify **babel.config.js** and add the line

```js
module.exports = function (api) {
  api.cache(true);
  return {
    ...
+   plugins: ["nativewind/babel"],
  };
};
```

---

### [Vector Icons](https://docs.expo.dev/guides/icons/#expovector-icons)

A library that provides various vector icons via `npm i @expo/vector-icons` &nbsp;&nbsp;For more official [documentation](https://icons.expo.fyi/Index/Entypo/login)

---

## GitHooks

- GitHooks is running a bash script named `post-checkout.sh` that does pulling from remote branch
    asserting that you are always developing from the latest update.
- This will reduce the merge conflict to a certain extent.
    Developers will be able to branch out new features from the "developer" branch.
- Hooks are running locally inside hidden folder .git/hooks when a git repository is initialized.
- In order to provide the team with the hooks in their environment, a symbolic link has to be created.

### Instructions

1. Make sure you are in the root directory `pwd` *~/TDS200-Xplatform-Exam*
2. Create **two** Symbolic Links from the provided script `post-checkout.sh` using command:
3. `ln -s -f ../../githooks/post-checkout.sh .git/hooks/post-checkout`
4. `ln -s -f ../../githooks/post-switch.sh .git/hooks/post-switch`<br />
5. Make sure .sh has permissions `chmod +x .git/hooks/post-*`

- The Hooks should be working now with both commands like `switch` or `checkout` whichever the developer prefers. It may be tested running `git checkout developer` and you should see a prompt "*Checked out developer branch, pulling latest from origin/developer...*"
- `ln` links in Unix `-s` pointer to a file `-f` force override <br />
