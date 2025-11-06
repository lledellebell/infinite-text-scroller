import { copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  mkdirSync('dist', { recursive: true });
  copyFileSync('src/index.d.ts', 'dist/index.d.ts');
  console.log('TypeScript 정의 파일이 dist/로 복사되었습니다.');
} catch (error) {
  console.error('타입 파일 복사 실패:', error);
  process.exit(1);
}