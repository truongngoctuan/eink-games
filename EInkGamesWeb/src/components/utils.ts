const isProd = process.env.NODE_ENV === 'production';
export function getImagePath(path: string): string {

  return isProd ? "/eink-games" + path : path;
}