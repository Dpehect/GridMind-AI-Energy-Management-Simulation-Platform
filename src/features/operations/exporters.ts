export function exportCsv(rows:Record<string,unknown>[]) {
  if(!rows.length) return "";
  const headers=Object.keys(rows[0]);
  const escape=(value:unknown)=>`"${String(value??"").replaceAll('"','""')}"`;
  return [headers.join(","),...rows.map(row=>headers.map(h=>escape(row[h])).join(","))].join("\n");
}
export function exportJson(data:unknown){return JSON.stringify(data,null,2)}
export function exportHtml(title:string,body:string){return `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${body}</body></html>`}
export function downloadFile(name:string,content:string,type:string){
 const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob);
 const a=document.createElement("a");a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);
}
