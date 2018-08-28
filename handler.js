"use strict";

const AWS = require("aws-sdk");

const s3 = new AWS.S3();

module.exports.fetchImages = function(event, context, callback) {
  const bucket = "camozzomedia";
  const path_to_folder = "/images/";
  const params = { Bucket: bucket, Delimiter: path_to_folder };

  s3.listObjects(params, function(err, data) {
    const message = err
      ? "Could not load objects from s3" + err
      : "Loaded " + data.Contents.length + " items from s3";

    callback(null, {
      statusCode: err ? 500 : 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify({
        message,
        gallery: data.Contents
      })
    });
  });
};
