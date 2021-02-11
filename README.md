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

- #17 Create Account Mutation 1

```bash

npm i react-helmet-async

npm i --save-dev @types/react-helmet

```

- #18 Create Account Mutation 2

  > New concept: useHistory

- #19 Save Token

  > tiny bug: react-helmet

  > fixed: react-helmet-async

- #20 Using Token

  > New concept: link, concat

- #21 Redirect or 404 Page

- #22 Header 1

- #23 Header 2

  > Concept: make hooks

```bash

npm i --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

```

- #24 Email Verify

- #25 Write Cache, Fragment

- #26 Edit Profile 1

- #27 Edit Profile 2

- #28 writeFragment vs Refetch function

  > Fragment or Refetch function

  > 최적화를 위해서는 Fragment를 사용하는것이 좋을 것 백엔드에게로 API 호출이 없으니

- #29 Restaurants Page

- #30 Restaurants Page Style

- #31 Restaurants Page Style 2

- #32 Restaurants Page Pagination

- #33 Search Page 1

  > New concept: history.push({pathname, state, search})

- #34 Search Page 2

  > New concept: Lazy Query

- #35 Category

  > New concept: useParams()

- #36 Category Page

- #37 Search Page

- #38 Restaurant Detail Page

- #39 Restaurant Detail Page 2

- #40 Test Settings

  > jest

- #41 App Component Test

  > mock, waitFor

- #42 Button Component Test

  > container, rerender

- #43 FormError, Restaurant Component Test

- #44 Header, 404 Component Test

  > MockedProvider, queryByText

- #45 Login Component Test 1

  ```bash
  npm i mock-apollo-client --save-dev
  ```

  > mock-apollo-client 를 사용하는 이유는 mutation의 경우 입력값도 제대로 들어가는지 확인하고 싶어서
  > 그냥 mockapolloprovider 쓰면 그것이 불가능하기 때문에

  > userEvent, createMockClient

- #46 Login Component Test 2

  > mockResolvedValue

- #47 Login Component Test 3

- #48 Test Setup

  > test-utils.tsx

- #49 Create Account Component Test

- #50 Create Account Component Test 2

  > how to mock hook !

- #51 SearchForm, Loading Component Test

  > enter key event test

- #52 Cypress

  > Cypress는 end-to-end 테스트를 해주게 하는 소프트웨어

  > 자동화 테스트를 스크립트를 통해서 수행한다고 보면된다.

  ```bash
  npm install cypress

  npx cypress open
  ```

- #53 First E2E Test with Cypress

  > @testing-library/cypress 이 아이는 element 요소들을 react-test-library처럼 가져올 수 있다 예를들면,
  > getByText , getByPlaceholderText 등등..

  ```bash
  npm install @testing-library/cypress --save-dev
  ```

- #54 Login E2E with Cypress

- #55 Create Account E2E with Cypress 1

- #56 Create Account E2E with Cypress 2

  > intercept 의 쓰임과 이유

- #57 Custom Commands with Cypress

- #58 Edit Profile E2E with Cypress 1

- #59 Intercept request data AND fixture

  > request, response 모두 intercept가 가능하다.

  > fixture는 Template이라고 생각하면 된다. mock할 데이터 형식을 미리 만들어 두는 파일

- #60 Owner Routes AND Recap

- #61 Add Restaurants 1

- #62 Add Restaurants 2

  > Renew Loader CSS

  > fetch to back-end for upload file and responsed file url

- #63 Write Cache

  > 레스토랑을 새로 생성했을 때, 생성한 레스토랑이 바로 보여지게 하기위해
  > API를 다시 Request하는게 아니라, Cache만 업데이트해서 애플리케이션을 최적화 하기위함

- #64 My Restaurant Dashboard for Owner

- #65 My Restaurant Dashboard 2

  > Create Dish Component

- #66 My Restaurant Dashboard 3

  > Create Dish Component 2

- #67 Dish Options 1

  > 음식 메뉴의 여러 옵션을 frontend 에서 생성하기 위해

- #68 Dish Options 2

- #69 Dish Component

- #70 Chart for Owner 1

  > Using Victory

  > https://formidable.com/open-source/victory/

  ```bash
  npm install victory
  ```

- #71 Chart for Owner 2

- #72 Chart for Owner 3

- #73 Extending Dish Component

- #74 Order Part 1

- #75 Order Part 2

- #76 Order Part 3

- #77 My Order Component

- #78 Order Subscription

  ```bash
  npm i subscriptions-transport-ws
  ```

- #79 SubscribeToMore

  > Subscription을 통해 데이터를 업데이트할 때 Query에서의 결과 데이터와 Subscription에서의 결과 데이터가 약간 다름
  > 그래서 뭐 useState를 통해서 변경해줘도 되겠지만 쿼리를 실행할 때 subscribeToMore이라는 함수를 사용하여 subscription이 일어날 때 쿼리를 알아서 업데이트 쳐줌
