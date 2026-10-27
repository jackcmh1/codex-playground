import { mkdir, readFile, writeFile, copyFile, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=resolve(root,'dist-preview');
await rm(output,{recursive:true,force:true});
await mkdir(join(output,'images'),{recursive:true});
await mkdir(join(output,'cm18'),{recursive:true});
// Explicit publication list: two illustrative portraits only. No source PDF or local library.
for (const name of ['index.html','app.js','styles.css']) await copyFile(join(root,'cm23',name),join(output,name));
for (const name of ['oguri-100602.webp','kitasan-106802.png']) await copyFile(join(root,'cm23/images',name),join(output,'images',name));
// Keep the prior CM18 interaction example available without its local reference art.
const oldHtml=(await readFile(join(root,'index.html'),'utf8'))
 .replace('data-assets="local"','data-assets="placeholder"')
 .replace('<head>','<head>\n<meta name="robots" content="noindex, nofollow">')
 .replace("Character crops come only from the PDF you supplied. They are local review assets, excluded from Git. Original ownership and public reuse permission remain unverified. No GameTora images are hotlinked.",'All character artwork in this archived CM18 sample is replaced with placeholders.');
await writeFile(join(output,'cm18/index.html'),oldHtml);
for(const name of ['app.js','styles.css'])await copyFile(join(root,name),join(output,'cm18',name));
// Exported CM23 is at the Pages project root; its archive link must stay within the project.
const html=(await readFile(join(output,'index.html'),'utf8')).replace('href="../cm18/"','href="cm18/"');
await writeFile(join(output,'index.html'),html);
await writeFile(join(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
await writeFile(join(output,'.nojekyll'),'');
async function list(dir,prefix=''){
 let result=[];
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const path=prefix+entry.name;
  if(entry.isDirectory())result.push(...await list(join(dir,entry.name),path+'/'));
  else result.push(path);
 }
 return result.sort();
}
const files={};
for(const name of await list(output))files[name]=createHash('sha256').update(await readFile(join(output,name))).digest('hex');
await writeFile(join(output,'manifest.json'),JSON.stringify({version:'cm23-transcript-draft-v1',artwork:'two illustrative portraits; reuse permission unverified',files},null,2)+'\n');
console.log(`Exported CM23 draft + archived CM18: ${Object.keys(files).length+1} files. No PDF or local asset library included.`);
