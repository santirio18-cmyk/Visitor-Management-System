const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Cloud Storage client
let storage;
let bucket;
const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'visitor-management-db';
const DB_FILE_NAME = 'vendor_management.db';

// Only initialize if on App Engine
const isAppEngine = process.env.GAE_ENV || process.env.GOOGLE_CLOUD_PROJECT;

const initCloudStorage = () => {
  if (!isAppEngine) {
    console.log('Not on App Engine - skipping Cloud Storage initialization');
    return null;
  }

  try {
    storage = new Storage();
    bucket = storage.bucket(BUCKET_NAME);
    console.log(`Cloud Storage initialized for bucket: ${BUCKET_NAME}`);
    return { storage, bucket };
  } catch (error) {
    console.error('Error initializing Cloud Storage:', error.message);
    console.log('Falling back to local storage');
    return null;
  }
};

// Download database from Cloud Storage
const downloadDatabase = async (localPath) => {
  if (!isAppEngine || !bucket) {
    return false;
  }

  try {
    const file = bucket.file(DB_FILE_NAME);
    const [exists] = await file.exists();
    
    if (exists) {
      console.log('Downloading database from Cloud Storage...');
      await file.download({ destination: localPath });
      console.log('Database downloaded successfully');
      return true;
    } else {
      console.log('No existing database found in Cloud Storage - will create new one');
      return false;
    }
  } catch (error) {
    console.error('Error downloading database from Cloud Storage:', error.message);
    return false;
  }
};

// Upload database to Cloud Storage
const uploadDatabase = async (localPath) => {
  if (!isAppEngine || !bucket) {
    return false;
  }

  try {
    if (!fs.existsSync(localPath)) {
      console.log('Local database file does not exist - skipping upload');
      return false;
    }

    console.log('Uploading database to Cloud Storage...');
    await bucket.upload(localPath, {
      destination: DB_FILE_NAME,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    console.log('Database uploaded successfully to Cloud Storage');
    return true;
  } catch (error) {
    console.error('Error uploading database to Cloud Storage:', error.message);
    return false;
  }
};

// Ensure bucket exists
const ensureBucketExists = async () => {
  if (!isAppEngine || !storage) {
    return false;
  }

  try {
    const [exists] = await bucket.exists();
    if (!exists) {
      console.log(`Creating bucket: ${BUCKET_NAME}...`);
      await bucket.create({
        location: 'asia-southeast2', // Match your App Engine region
        storageClass: 'STANDARD',
      });
      console.log(`Bucket ${BUCKET_NAME} created successfully`);
    }
    return true;
  } catch (error) {
    console.error('Error ensuring bucket exists:', error.message);
    return false;
  }
};

module.exports = {
  initCloudStorage,
  downloadDatabase,
  uploadDatabase,
  ensureBucketExists,
};
