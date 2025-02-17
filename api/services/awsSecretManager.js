// import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";
// import { fromIni } from "@aws-sdk/credential-provider-ini";
// import dotenv from 'dotenv';

// dotenv.config();

// console.log("process.env.AWS_REGION: ", process.env.AWS_REGION);


// export async function GetAwsKeys(secretId, versionStage="AWSCURRENT") {
//     const client = new SecretsManagerClient({
//         region: process.env.AWS_REGION,
//     });
//     const params = {
//         SecretId: secretId,
//         VersionStage: versionStage
//     };
    
//     let response;
    
//     try {
//         response = await client.send(new GetSecretValueCommand(params));

//     } catch (error) {
//         // For a list of exceptions thrown, see
//         // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//         throw error;
//     }
    
//     const secret_keys = response.SecretString;
//     return secret_keys;
// }
