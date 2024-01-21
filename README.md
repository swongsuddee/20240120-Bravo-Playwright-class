# 20240120-Bravo-Playwright-class

## Description
This is a simple project for automate testing with Playwright in class "Bravo Playwright for beginner to intermedite" on 20-21 Jan 2024.<br>
The version of this code is just an example we explored in our class.<br>
I will provide you with the new and clean code, along with comments, as soon as possible.

## Installation
Before running the scripts, make sure you have Node.js and npm installed on your machine.<br>
Then, install the project dependencies using the following command:

```
npm install
```

## Run test
<ol>
  <li>
    Run All Tests:
    To execute all the tests in your Playwright project, you can use the following command:
    
    npx playwright test
  </li>
  <li>
    Run a Specific Test Case:
    To execute a specific test case, you can use the --test option followed by the name of the test case:

    npx playwright test --test=testName
  </li>
  <li>
    Run Tests in a Specific Describe Block:
    If you organize your tests using describe blocks, you can use the --grep option to run tests within a specific describe block:
    
    npx playwright test --grep="Describe Block Name"
  </li>
  <li>
    <b>For more commands:</b> <a href='https://playwright.dev/docs/test-cli'>https://playwright.dev/docs/test-cli</a>
  </li>
</ol>

## Additional Options
<ul>
  <li>
    You can use the --headed option to run the browser in headed mode (visible GUI) during the test execution.
  
    npx playwright test --headed
  </li>
  <li>
    The --headed option can be combined with other commands, such as --project or --test, to run specific scenarios in headed mode.
  
    npx playwright test --project=mySuite --headed
  </li>
</ul>
<br>
Enjoy coding 😉.
