# Serverless Repository

This repository contains the implementation of AWS Lambda functions for serverless operations in our application. The repository is designed to handle account creation workflows, including email verification via SNS integration.

---

## Features

- **Email Verification**: 
  - Sends an email to users with a verification link upon account creation.
  - Links expire after 2 minutes for security and demonstration purposes.
  
- **SNS Integration**: 
  - Subscribes to the AWS SNS topic for new account creation events.
  
- **RDS Integration**: 
  - Tracks sent emails and their verification status in the RDS database.

---

## Repository Structure

serverless/ ├── src/ │ ├── functions/ │ │ ├── emailVerification/ │ │ │ ├── handler.js # Main Lambda function code │ │ │ ├── utils.js # Helper utilities for the Lambda function │ │ │ ├── config.json # Configuration for environment-specific variables │ ├── tests/ │ │ ├── emailVerification.test.js # Jest tests for Lambda function │ ├── package.json # Node.js dependencies │ ├── README.md # Documentation ├── .gitignore # Git ignore file ├── serverless.yml # Serverless Framework configuration


---

## Development Workflow

1. **Fork This Repository**:
   - All development is done on the forked repository in your namespace.

2. **Branching Strategy**:
   - Create feature branches from the `main` branch for all updates.
   - Use pull requests for code reviews before merging.

3. **.gitignore**:
   - A `.gitignore` is added to exclude files like `node_modules`, logs, and sensitive files.

---

## Environment Setup

1. Clone your fork of the repository:  
   ```bash
   git clone https://github.com/<your-namespace>/serverless.git
   cd serverless

2. Install dependencies:

    bash
    Copy code
    npm install
    Configure environment variables:

3. Use a .env file or AWS Secrets Manager for managing sensitive information like database credentials.
Deploy with Serverless Framework:

    bash
    Copy code
    serverless deploy

4. Deploy with Serverless Framework:

    bash
    Copy code
    serverless deploy


# Lambda Function Details

## Email Verification
Trigger: AWS SNS message indicating new user creation.
## Functionality:
Sends a verification email with a time-limited link (2 minutes expiration).
Updates RDS database with email tracking information.
