import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';

const secret_name = 'ticketmaster_api_key';

const retrieveApiKey = async () => {
  const client = new SecretsManagerClient({
    region: 'us-east-1',
  });

  let response;

  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: 'AWSCURRENT', // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    throw error;
  }

  return response.SecretString;
};

export default retrieveApiKey;
