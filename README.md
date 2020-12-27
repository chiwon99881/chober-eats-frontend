# Uber-eats Clone

- #01 Settings

```bash
npx create-react-app uber-eats-frontend --template typescript
```

- #02 Tailwind CSS

```bash
npm install tailwindcss
```

> extension : Tailwind CSS IntelliSense

- #03 Tailwind CSS 2

```bash
npm install postcss autoprefixer
```

> 1. create postcss.config.js

> 2. npx tailwindcss init

> 3. create tailwind.css

> 4. create scripts in package.json
>    "tailwind:build": "tailwind build ./src/styles/tailwind.css -o ./src/styles/styles.css",

- #04 Apollo setup

```bash
npm i @apollo/client graphql
```

- #05 React Router Dom

```bash
npm i react-router-dom
```

- #05 Local Only Fields

  > Reactive variables

  > https://www.apollographql.com/docs/react/local-state/reactive-variables/

- #06 React Hook Form

```bash
npm i react-hook-form
```

- #07 React Hook Form 2

- #08 Router and @types

```bash
npm i @types/react-router-dom
```

- #09 Login Form 1

- #10 Login Form 2

- #11 Login Mutation 1

```bash
npm i -g apollo

npm i apollo
```

- #12 Apollo Codegen

  > backend에서 정의한 DTO를 통해 Query나 Mutation의 타입을 frontend에서 타입 정의에 대한 파일을 생성해준다.

  > 물론 모든 backend에서 정의한 타입을 얘가 다 해주는게 아니라 이 frontend에서 gql태그를 사용하여 작성한 query나 mutation을 정의한 경로의 파일을 다 찾아서 있는것들을 하나의 파일로 만들어준다.

  > 가끔 vsc terminal에서 안 먹힐때가 있는데 cmd창에서 실행하면 된다.

  ```bash
  apollo client:codegen src/__generated__ --target=typescript --outputFlat
  ```

- #13 Login Mutation 2

- #14 Login Mutation 3

- #15 Responsive CSS

- #16 Button Component
