
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

## [![Sungard Availability Services | Labs][labs-logo]][labs-github-url]

This project is maintained by the Labs group at [Sungard Availability
Services](http://sungardas.com)

GitHub: [https://sungardas.github.io](https://sungardas.github.io)

Blog:
[http://blog.sungardas.com/CTOLabs/](http://blog.sungardas.com/CTOLabs/)

[labs-github-url]: https://sungardas.github.io
[labs-logo]: https://raw.githubusercontent.com/SungardAS/repo-assets/master/images/logos/sungardas-labs-logo-small.png
[aws-services-image]: ./docs/images/logo.png?raw=true
