# Visory Engineering Challenge 🚀 

Hey there 👋 Thanks for taking the time to code review my work - looking forward to your feedback 🙂

# Architecture Design

### Further Improvements


# Getting Started

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
