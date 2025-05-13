# whatIsaw 🚀

Welcome to **whatIsaw**, an Expo + React Native project powered by Expo Router and TypeScript.

## 🛠️ Setup

1. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

   Options in the terminal:

   - **Android emulator** (`a`)
   - **iOS simulator** (`i`)
   - **Web** (`w`)
   - **Expo Go** (scan the QR code)

3. **Run on a device**

   - **Android**: `npm run android` / `yarn android`
   - **iOS**: `npm run ios` / `yarn ios`
   - **Web**: `npm run web` / `yarn web`

## 📂 Project structure

- **app/** — Your app’s entrypoints and file-based routes
- **components/** — Reusable React Native components
- **constants/** — App-wide constants
- **hooks/** — Custom React hooks
- **assets/** — Images, fonts, icons, etc.
- **scripts/** — Automation scripts (e.g., custom reset)

## ⚙️ Scripts

| Script                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `npm start`           | Start Expo development server                     |
| `npm run android`     | Open on Android emulator/device                   |
| `npm run ios`         | Open on iOS simulator/device                      |
| `npm run web`         | Open in web browser                               |
| `npm run lint`        | Run ESLint checks (`expo lint`)                   |
| `npm run format`      | Format code with Prettier                         |
| `npm run prepare`     | Install Husky Git hooks                           |

## ✨ Technologies

- [Expo SDK](https://expo.dev) (SDK 53)
- [Expo Router](https://expo.github.io/router/) for file-based routing
- React Native 0.79
- TypeScript
- ESLint + Prettier + Husky + lint-staged for code quality
- React Navigation for screens

## 📖 Learn More

- **Expo docs**: https://docs.expo.dev
- **React Native docs**: https://reactnative.dev/docs/getting-started
- **Expo Router guide**: https://docs.expo.dev/router/introduction
- **TypeScript support**: https://docs.expo.dev/guides/typescript

Happy coding! 🎉

