const fs = require('fs');
const files = [
  'src/app/admin/page.tsx', 
  'src/app/checkout/page.tsx', 
  'src/app/login/page.tsx', 
  'src/app/not-found.tsx', 
  'src/app/product/[id]/page.tsx', 
  'src/app/products/page.tsx', 
  'src/components/FilterSidebar.tsx', 
  'src/components/Newsletter.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('"use client"')) {
    fs.writeFileSync(f, '"use client";\n\n' + content);
  }
});
console.log('Fixed files');
