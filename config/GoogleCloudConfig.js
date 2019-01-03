const { Storage } = require("@google-cloud/storage");
const projectId = "thuexequytam";
var config = {
  type: "service_account",
  project_id: "thuexequytam",
  private_key_id: "3462f3331946a94cef8403ce24984a114745ae2d",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC97OwDg6FUgUsh\nbCRqVgMU1tWAmrVqursmJcnJh08mTU3+hEgOvVxQ0l4Xp4zN3bxMjtxpiI63472f\nWfm7tw62vot+I4miG9QZZ6v0/U0iSwjAnMX1For2pk0hJACMmjdkoeubV/x2SZnU\nNPvuTX9RD/njVkMaSAeauUymgx7qRM7eRhMUF6MkLYvSE/MDmJ8d4JYpERLK8C6f\nV2dUsQEU/aWwxYBZeMe30Ex+TcPSr67t9GhuTCYtARV0xDBkdKyvUHQ4oZkKmdqd\nJpyijkQn4gdLptMA980kxaJCGQ35+xtfpyQY0nNK1DXhl4AE+/fZ94ZYzNwXJr9d\nfxk32RZVAgMBAAECggEABfy8C/hQU6unxKv2EewYOMX1ARLfeTfdwnwaemHrmteB\nB+7/nodVq66WDMTZaXv9/aPbSvBlH2LsjWN2vfYtXpFvMFDKe/PIoexkvVpm3hfj\ndL78dpd5VgE0GUFbSxNpf6CjHsiNSuVTFh99eauzwchxJjuH7gIrSzNgOTeU9+mZ\nefmuxK2ow5yE4hqF1w+h672btE4Ar1PibVluVVRkKdVBw4dRb/Qe8PArFALLtjWn\n3ve4rxw3f01bEtlA/OsE3ZESDqOED1d1mety7SFpgVvolstUUyeOrlIMR1Lt8TBo\nCJeeZAOyq4Y0dX49blWuT6DutATaFU1X5xlbm420mQKBgQDljyh6GrCxP6o1IYVv\nTsb7KTMTtbNJA/BiTzOxz9+FARP8Py1MiaoBEBkx0uLNVH/96GzvWsnD9zgatqYh\nkONYZKyoK/3DsxTuvuO39pt/SSB9yoquKW9pH9YF1OSVSIZbLz7CF1nNGV3r2BRJ\nm/hCvfXCuoPrX5yUTjCI78yAWwKBgQDTzR0CgGl+AJsReF/uUkBLj5/yuYlIP92h\nCgYCf0bEafqQUP7txLXiCDpyn8krZvgrXkzIRrJiw+3bvVVXqi46Mpvp0vNMMKu2\namX6p/D0mq14UUpZEodreBU0qsNOy+4ILnffsme2ZeRS/wR2B3uSv2pNyPcle+K9\nOEoD5r2DDwKBgQCoI30gQmBc0ybWF6Fmb6rq17hjnVieCFaPizdv67Pp9Wov/g4t\n2z873BC4H6CjiFrfHNh9UGAsOu1LE7EHMNp0KfkUjHQoXQjd/c9JNUWbq3Iy8KE3\nA35o3zqhttdeSGqwayBqhTPvN79FOVVSvPzP1dcmM/rf8X38WnDOO+XrtQKBgGbB\nJSjYidWCj7jLEKd7qgu+k1fb4Zl2upxtU3sUqo2R6OjpErTh8WfGnCyODrgKza2k\no1WqztKRwa0Qzv2n56N+eBvZpwW4uyXVusH/hiv1euFbdtl93sspyAf0LKrmzwWT\nHb8eO6jHCB2n8U8d1DreuMEiFZ1O3DL2wxnfcOPLAoGABFZVf2QAXZpYn1kAxl/Z\nVAiiLARhqo06nIIEHzgwfpOfYzsIpaJ8cUzuEhfbkeKo6jOUG04wFDaI3kxaoLDF\nSPHHo7YkFiNKdc1eC79YnkWmsvyVq7lr5IWirTCq7g9hg9mSdRXgIdPKiMBnoN8d\nMliD0v1/xpqRu5LZK8s2m6Q=\n-----END PRIVATE KEY-----\n",
  client_email: "thuexequytam@appspot.gserviceaccount.com",
  client_id: "107463794767302666922",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/thuexequytam%40appspot.gserviceaccount.com"
};
const storage = new Storage(config);
const bucket = storage.bucket("thuexequytam");

module.exports = bucket;
