import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';
const uuidv4 = require("uuid/v4");
const mime = require('mime-types')

@Injectable()
export class MyUploadService {
  private s3 = new AWS.S3({
    endpoint: process.env.NODE_ENV !== 'production' ? `localstack:4572` : undefined,
  });
  private bucketName = process.env.AWS_S3_BUCKET_NAME;
  private acl = 'public-read'

  constructor() {

    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  public async uploadImage(file: any, path: string = "") {
    const filename = [uuidv4(), mime.extension(file.mimetype)].join(".");

    let urlKey = filename;
    if (path) {
      urlKey = [path, urlKey].join("/");
    }

    const params = {
      Body: file.buffer,
      Bucket: this.bucketName,
      Key: urlKey,
      ACL: this.acl,
      ContentType: file.mimetype,
    };

    return await this.s3
      .putObject(params)
      .promise()
      .then(
        data => {
          const publicUrlFull = this.s3.getSignedUrl("getObject", { Key: urlKey, Bucket: this.bucketName });
          const publicUrl = publicUrlFull.split("?")[0];

          return { urlKey, publicUrl };
        },
        error => {
          throw error;
        }
      );
  }
}