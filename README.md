## Helpful commands
```
ionic capacitor sync    # build to native device platforms
ionic capacitor run     # launch app on native device emulator
ionic capacitor run ios -l --external # launch app on ios emulator with realtime update  
```

## Amplify CLI
Amplify CLI cannot pull credentials from environment variables. So to source the credentials, run the following command:

```
export DEV_ACCOUNT=123456789012
. ./script/get-tmp-creds.sh
aws configure set aws_access_key_id $AWS_ACCESS_KEY_ID --profile AdministratorAccess-$DEV_ACCOUNT
aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY --profile AdministratorAccess-$DEV_ACCOUNT
aws configure set aws_session_token $AWS_SESSION_TOKEN --profile AdministratorAccess-$DEV_ACCOUNT
```