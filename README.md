
# Step Functions

State Machines to Manage AWS Services

![aws-services][aws-services-image]

## Input JSON for Execution

### To check the current status
```
{
  "federation":
  {
      "roles":[
          {"roleArn": "arn:aws:iam::<<federate_account>>:role/<<federate_role>>"},
          {"roleArn": "arn:aws:iam::<<target_account>>:role/<account_role>", "externalId": "<<external_id>>"}
      ],
      "sessionName": "<<session_name>>",
      "durationSeconds": 0
  },
  "method": "GET"
}
```

### To enable the services
```
{
  "federation":
  {
      "roles":[
          {"roleArn": "arn:aws:iam::<<federate_account>>:role/<<federate_role>>"},
          {"roleArn": "arn:aws:iam::<<target_account>>:role/<account_role>", "externalId": "<<external_id>>"}
      ],
      "sessionName": "<<session_name>>",
      "durationSeconds": 0
  },
  "account": "<<target_account>>",
  "method": "POST"
}
```

### To diable the services
```
{
  "federation":
  {
      "roles":[
          {"roleArn": "arn:aws:iam::<<federate_account>>:role/<<federate_role>>"},
          {"roleArn": "arn:aws:iam::<<target_account>>:role/<account_role>", "externalId": "<<external_id>>"}
      ],
      "sessionName": "<<session_name>>",
      "durationSeconds": 0
  },
  "method": "DELETE"
}
```
