export interface EventPayloads {
  'generate.image-thumbnail': { filePath: string };
  'user.reset-password': { name: string; email: string; link: string };
  'user.verify-email': { name: string; email: string; otp: string };
}
