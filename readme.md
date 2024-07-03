# Test Driven Development for Typescript

Test Driven Development (or TTD for short) is a way of writing code that involves writing an automated unit-test level that case success or failure. the main goal is to make sure that the code is working as expected and return error if something must be wrong.

In case we want to test code in Typescript language, same like Javascript that can use [Jest](https://jestjs.io) library for unit testing. Jest supports Typescript via Babel. first, make sure you followed the instructions of using Babel.

## Add Jest Library for Unit Testing
##### Using Yarn
```
yarn add --dev jest @types/jest
```

##### Using NPM
```
npm install --save-dev jest @types/jest
```
$~$

## Add Babel Library
#### 1. Install babel-jest library first.

##### Using Yarn
```
yarn add --dev babel-jest
```

##### Using NPM
```
npm install --save-dev babel-jest
```

#### 2. In your `package.json`, make sure your file looks like this: 
```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }
}
```

#### 3. Create `babel.package.json` configuration file
To start, you can use the env preset, which enables transforms for ES2015+. and don't forget to install @jest/globals

##### Using Yarn
```.
yarn add --dev @bae=bel/preset-env
```
##### Using NPM
```.
npm install @babel/preset-env --save-dev
```

In order to enable the preset you have to define it in your `babel.config.json` file, like this:
```json
{
  "presets": ["@babel/preset-env"]
}
```

$~$

## Setup Typescript for Jest

##### Using Yarn
```
yarn add --dev @babel/preset-typescript
```

##### Using NPM
```
npm install --save-dev @babel/preset-typescript
```

After installing @babel/preset-typescript, then add it to the list of presets of your babel.config.json
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

Also don't forget to install @jest/globals for provides access to Jest's global testing utilities.
##### Using Yarn
```
yarn add --dev @jest/globals
```

##### Using NPM
```
npm install --save-dev @jest/globals
```
$~$

## Adding Supertest Library
HTTP assertions made easy via superagent. Maintained for Forward Email and Lad. for more information you can click this [link](https://github.com/ladjs/supertest#readme)

##### Using Yarn
```
yarn add --dev supertest
```
##### Using NPM
```
npm install supertest --save-dev
```

$~$

## How to Use Unit Testing

### App Structure
```bash
├── src   # Contain the all the source files
├── test  # Contain all the unit test for testing code from src folder
```
$~$

### Unit Test Pseudocode
first thing before initialize the unit test, we need to wrap unit test based on group by using `describe` function and in `describe` can contain setup (`beforeEach()`, `beforeAll()`) and teardown (`afterEach()`, `afterAll()`) function for initialize setup, also `it` function for unit test. here's the breakdown:

```ts 
  describe('<your-test-name', () => {

    /**
     * @beforeEach
     * setup function for unit test
     * 
    */
    beforeEach(() => {
     /**
      * you can add more setup or teardown functions before it function is called
      * Delete all data in database for example
     */
    })
    
    it('should <your-test-condition>', () => {
      /**
       * your unit test code
       * example of expect function in jest
      */
      expect(<your-code-result>).toBe(<expected-result>)
    })
  })
```

`IMPORTANT!`: Unit test file must have `*.test.ts` extension

$~$

For example, you can test simple code of operation that sum two number. here is the code:

```ts title=src/test.ts

  export function sum(num1: number, num2: number): number {
    return num1 + num2;
  }
```

$~$

The unit test code should look like this:
```ts
import { sumNumber } from '../src/test.ts'

describe('Test file test.ts', () => {

  it('should have value of sum function', () => {
    expect(sumNumber(1, 1)).toEqual(2)
  });

});
```

$~$

Success Result:
```
PASS  test/unit-testing.test.ts
  Test file test.ts
    ✓ should have value of sum function (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.27 s, estimated 1 s
```

Failure Result:
```
 FAIL  test/unit-testing.test.ts
  Test file test.ts
    ✕ should have value of sum function (1 ms)

  ● Test file test.ts › should have value of sum function

    expect(received).toEqual(expected) // deep equality

    Expected: 3
    Received: 2

      4 |
      5 |   it('should have value of sum function', () => {
    > 6 |     expect(sumNumber(1, 1)).toEqual(3)
        |                             ^
      7 |   });
      8 |
      9 | });

      at Object.toEqual (test/unit-testing.test.ts:6:29)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.322 s, estimated 1 s
```

$~$

## Supertest
`IMPORTANT!`: Make sure you already installed the Supertest package in this [guide](#adding-supertest-library)
Supertest works with any test framework, in this case we're using Jest as a test framework.

This code bellow is an example without using any test framework:

```ts
import express from "express"
import supertest from "supertest"

const app = express()

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'John' })
});

supertest(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (res, err) {
    if (err) throw err;
  });

```

For async function, you can use Promise syntax in the unit test like this:
```ts
describe('GET /user' () => {
  it('respond with json format', () => {
    return supertest(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .then(response => {
        expect(response.body.name).toEqual('John')
      });
  });
});
```

Or you can use async await syntax like this:
```ts
describe('GET /user' () => {
  it('respond with json format', async () => {
    const response = await supertest(app)
      .get('/user')
      .set('Accept', 'application/json')
    
    expect(response.body.name).toEqual('John')
    // etc expect can be used
  });
});
```