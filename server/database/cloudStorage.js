const { Storage } = require('@google-cloud/storage');
const fs = require('fs');
const path = require('path');

// Initialize Cloud Storage client
let storage;
let bucket;
// Use existing bucket or create new one
// Priority: 1) GCS_BUCKET_NAME env var, 2) Default App Engine bucket, 3) Project ID + '-db', 4) Default name
const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 
                    (process.env.GOOGLE_CLOUD_PROJECT ? `${process.env.GOOGLE_CLOUD_PROJECT}.appspot.com` : null) ||
                    (process.env.GOOGLE_CLOUD_PROJECT ? `${process.env.GOOGLE_CLOUD_PROJECT}-db` : null) ||
                    'visitor-management-db';
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
    console.log(`✅ Cloud Storage initialized for bucket: ${BUCKET_NAME}`);
    console.log(`   Using bucket: gs://${BUCKET_NAME}`);
    return { storage, bucket };
  } catch (error) {
    console.error('❌ Error initializing Cloud Storage:', error.message);
    console.error('Error details:', error.code, error.message);
    console.log('⚠️  Falling back to local storage (data will NOT persist)');
    return null;
  }
};

// Download database from Cloud Storage
const downloadDatabase = async (localPath) => {
  if (!isAppEngine) {
    console.log('Not on App Engine - skipping Cloud Storage download');
    return false;
  }

  if (!bucket) {
    console.error('Cloud Storage bucket not initialized - cannot download');
    return false;
  }

  try {
    const file = bucket.file(DB_FILE_NAME);
    const [exists] = await file.exists();
    
    if (exists) {
      console.log(`Downloading database from Cloud Storage: gs://${BUCKET_NAME}/${DB_FILE_NAME}`);
      await file.download({ destination: localPath });
      const fileSize = fs.existsSync(localPath) ? fs.statSync(localPath).size : 0;
      console.log(`✅ Database downloaded successfully (${fileSize} bytes)`);
      return true;
    } else {
      console.log(`ℹ️  No existing database found in Cloud Storage (gs://${BUCKET_NAME}/${DB_FILE_NAME}) - will create new one`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error downloading database from Cloud Storage:', error.message);
    console.error('Error details:', error.code, error.message);
    if (error.code === 403) {
      console.error('⚠️  Permission denied - check service account has Storage Object Viewer role');
    } else if (error.code === 404) {
      console.error('⚠️  File not found - this is normal for first deployment');
    }
    return false;
  }
};

// Upload database to Cloud Storage
const uploadDatabase = async (localPath) => {
  if (!isAppEngine) {
    console.log('Not on App Engine - skipping Cloud Storage upload');
    return false;
  }

  if (!bucket) {
    console.error('Cloud Storage bucket not initialized - cannot upload');
    return false;
  }

  try {
    if (!fs.existsSync(localPath)) {
      console.log('Local database file does not exist - skipping upload');
      return false;
    }

    const fileSize = fs.statSync(localPath).size;
    console.log(`Uploading database to Cloud Storage (${fileSize} bytes)...`);
    console.log(`Bucket: ${BUCKET_NAME}, File: ${DB_FILE_NAME}`);
    
    await bucket.upload(localPath, {
      destination: DB_FILE_NAME,
      metadata: {
        cacheControl: 'no-cache',
      },
    });
    
    console.log(`✅ Database uploaded successfully to Cloud Storage: gs://${BUCKET_NAME}/${DB_FILE_NAME}`);
    return true;
  } catch (error) {
    console.error('❌ Error uploading database to Cloud Storage:', error.message);
    console.error('Error details:', error.code, error.message);
    if (error.code === 403) {
      console.error('⚠️  Permission denied - check service account has Storage Object Admin role');
    } else if (error.code === 404) {
      console.error('⚠️  Bucket not found - check bucket name and ensure it exists');
    }
    return false;
  }
};

// Ensure bucket exists
const ensureBucketExists = async () => {
  if (!isAppEngine) {
    console.log('Not on App Engine - skipping bucket check');
    return false;
  }

  if (!storage) {
    console.error('Cloud Storage not initialized - cannot check bucket');
    return false;
  }

  try {
    const [exists] = await bucket.exists();
    if (!exists) {
      console.log(`⚠️  Bucket ${BUCKET_NAME} does not exist - attempting to create...`);
      try {
        await bucket.create({
          location: 'asia-southeast2', // Match your App Engine region
          storageClass: 'STANDARD',
        });
        console.log(`✅ Bucket ${BUCKET_NAME} created successfully`);
      } catch (createError) {
        console.error(`❌ Failed to create bucket: ${createError.message}`);
        if (createError.code === 403) {
          console.error('⚠️  Permission denied - you may need to create bucket manually in Cloud Console');
        }
        return false;
      }
    } else {
      console.log(`✅ Bucket ${BUCKET_NAME} exists`);
    }
    return true;
  } catch (error) {
    console.error('❌ Error checking bucket existence:', error.message);
    console.error('Error details:', error.code, error.message);
    if (error.code === 403) {
      console.error('⚠️  Permission denied - check service account has Storage Admin role');
    }
    return false;
  }
};

module.exports = {
  initCloudStorage,
  downloadDatabase,
  uploadDatabase,
  ensureBucketExists,
};
