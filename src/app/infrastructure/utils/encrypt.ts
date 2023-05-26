import { JSEncrypt, IJSEncryptOptions } from "jsencrypt/lib/JSEncrypt";
import { environment } from "src/environment/environment";

export const encrypt = (value: string) => {
    const options: IJSEncryptOptions = {
      default_key_size: "4096",
      default_public_exponent: "010001",
      log: false
    };
    var encrypt = new JSEncrypt(options);
    encrypt.setPublicKey(environment.publicKey);
    let encrypted: any = encrypt.encrypt(value);
    return encrypted;
}