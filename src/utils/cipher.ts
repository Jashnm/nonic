import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
const scryptAsync = promisify(scrypt);

const ALGORITHM = "aes-256-gcm";

export const encrypt = async (text: string, keyString: string) => {
  let iv = randomBytes(12);
  const key = (await scryptAsync(keyString, "salt", 32)) as Buffer;
  let cipher = createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const encryptedHex =
    iv.toString("hex") +
    ";" +
    encrypted +
    ";" +
    cipher.getAuthTag().toString("hex");

  return encryptedHex;
};

export const decrypt = async (encryptedText: string, keyString: string) => {
  const key = (await scryptAsync(keyString, "salt", 32)) as Buffer;

  const encryptedArray = encryptedText.split(";");
  const iv = Buffer.from(encryptedArray[0], "hex");
  const tag = Buffer.from(encryptedArray[2], "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  let decryptedText = decipher.update(encryptedArray[1], "hex", "utf8");
  decryptedText += decipher.final("utf8");

  return decryptedText;
};
