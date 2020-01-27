import { DemoData } from '../assets/data/dataType';

const {
  Stitch,
  RemoteMongoClient,
  UserApiKeyCredential
} = require('mongodb-stitch-browser-sdk');

const DATABASE = 'DynamicLandscape';
const COLLECTION = 'Services';

const client = Stitch.initializeDefaultAppClient('dynamiclandscape-iaewx');
const db = client
  .getServiceClient(RemoteMongoClient.factory, 'DynamicLandscape_Service')
  .db(DATABASE);

const credential = new UserApiKeyCredential(
  '4o09WKCRtjhbQYOqQCBXRWvN6WRV4cke4AwXvGDUZW31UeODMl7e8cUVYoMu3fgN'
);

export default async function fetchAllServices(login?: any) {
  try {
    return JSON.parse(sessionStorage.serviceContent);
  } catch (error) {
    console.log(error);
    console.log('Fetching Data');
    let returnDoc = [] as DemoData[];
    await client.auth
      .loginWithCredential(credential)
      .then(() =>
        db
          .collection(COLLECTION)
          .find({})
          .toArray()
      )
      .then((docs: any) => {
        console.log('[MongoDB Stitch] Connected to Stitch');
        returnDoc = docs;
        sessionStorage.serviceContent = JSON.stringify(docs);
      })
      .catch((err: any) => {
        console.error(err);
      });
    return returnDoc;
  }
}
