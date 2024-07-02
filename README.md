# Visory Engineering Challenge 🚀 

Hey there 👋 Thanks for taking the time to code review my work - looking forward to your feedback 🙂

# Architecture Design

The architecture of this submission consists of:
- A UI built using Angular and deployed in S3 (URL here: http://visory-engineering-challenge-frontend.s3-website-us-east-1.amazonaws.com/).
- An API deployed in a lambda function, fronted by API Gateway that communicates with the Ticketmaster API and provides mappings for the frontend to display events to the user. 
- API Key for the Ticketmaster API is stored in AWS Secrets Managers and a policy is attached to the lambda function for retrieval.
- The backend API uses AWS SAM and Github Actions to automatically deploy on succesful merge of feature branch to main
- The angular application is deployed by manually uploaded ng build files to the S3 bucket via the console
- The API expects a `location` field of type 2-Alpha Country Code (i.e. AU, US, IE, etc.), along with a `startDate` and `endDate` for search in format `YYY-MM-DD`
  - I  have provided a simple postman suite if you wish to test the API directly


### Further Improvements

#### Lambda Function
- Due to time constraints with other fulltime work commitments, my testing approach for this assignments was all manual integration testing in both local and deployed environments using Postman. Unit tests are needed to ensure quality and performance, and given more time I would want to ensure 100% code coverage. 
- Add rate limiting protection for the Ticketmaster API, along with improving the API to return paginated data.
- I would like to take more time to explore the full capabilities of the Ticketmaster Discovery API and implement better error handling and event mapping to provide more complex data sets to be returned to the UI.
- I would like to improve on the user experience of this API with more consistent error reporting and responses.
- Develop a structured API schema so that front-end developers integrating with this lambda function can better determine it's functionality.
- Improve use of middleware for error handling and logging for better development experience.
- Add proper auth using JWT to protect the API. 

#### Angular App
- It has been some time since I've used Angular in industry and will admit I'm not up to date with the full capabilities of the latest release of Angular. I would love to spend more time to dig into the current Angular Docs to further improve the code quality of my angular app.
- Add better search capabilities with more flexible location querying (dependent on lambda implementation)
- Improve styling and CSS for better user experience
- Add pagination ability (dependent on lambda implementation)
- Add further routing to provide details pages on specific events

# Getting Started

### Backend
To run the project locally you will need to:
1. Clone the repository:
```bash
   git clone <repository-url>
```

2. Install dependencies:
```bash
   cd visory-engineering-challenge-backend
   npm install
```

3. Build using SAM:
```bash
   sam build
```

4. Run using SAM:
```bash
   sam local start-api 
```

> Note: You may need your own AWS Account and user with relavant IAM permissions/Access Keys if you want to thoroughly test this project in AWS.

### Frontend

To run the project locally you will need to:
1. Clone the repository:
```bash
   git clone <repository-url>
```

2. Install dependencies:
```bash
   cd visory-engineering-challenge-frontend
   npm install
```

3. Build using Angular CLI:
```bash
   ng build
```

4. Run using Angular CLI:
```bash
   ng serve
```


## CICD
Github Actions is used to automatically deploy resources to AWS after a succesful merge of dev into main. 

```yml
name: Deploy SAM Application on merge to main

on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  deploy:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.x'

      - name: Set up SAM CLI
        uses: aws-actions/setup-sam@v1

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Build SAM application
        run: sam build

      - name: Deploy SAM application
        run: sam deploy --no-confirm-changeset --no-fail-on-empty-changeset --stack-name visory-engineeering-challenge-backend --region us-east-1 

```

## Testing

You can find the postman suite I used for testing in this implementation at `test/postman/Visory.postman_collection.json`. To access the ticketmaster API you will need your own API KEY which can be created at: https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/