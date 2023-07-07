import * as path from 'path';
import type { Stream } from 'stream';
import * as fs from 'fs';
import axios from 'axios';

export async function downloadImage(url: string, dirPath: string, fileName: string) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const imagePath = path.resolve(dirPath, fileName);
    const writer = fs.createWriteStream(imagePath);

    const response = await axios<Stream>({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const w = response.data.pipe(writer);

    return await new Promise((resolve, reject) => {
      w.on('finish', resolve);
      w.on('error', reject);
    });
  } catch (error) {
    console.log(`Error downloading image ${fileName}: ${error as string}`);
    throw error;
  }
}
