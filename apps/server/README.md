# Nestjs Typeorm Boilerplate

## migrations

npm run migration:generate --name=initial-db

## Resources

- [Migrations Guide](https://constantsolutions.dk/2024/08/05/nestjs-project-with-typeorm-cli-and-automatic-migrations/)
- [Original Boilerplate](https://github.com/NarHakobyan/awesome-nest-boilerplate)

## Create Public Key and Private Key

```bash
#Generate SSL certificates

 #   Generate an RSA private key, of size 2048, and output it to a file named key.pem:

openssl genrsa -out private_key.pem 2048

# It needs be copied&pasted from terminal manually

awk 'NF {sub(/\r/, ""); printf"%s\\n",$0;}' private_key.pem

  #  Extract the public key from the key pair, which can be used in a certificate:

openssl rsa -in private_key.pem -outform PEM -pubout -out public_key.pem

# It needs be copied&pasted from terminal manually

awk 'NF {sub(/\r/, ""); printf "%s\\n",$0;}' public_key.pem
```
