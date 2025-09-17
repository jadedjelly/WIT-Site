import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import react from '@vitejs/plugin-react-swc'

// MDX must come first so React SWC can compile the MDX->JSX output
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      // providerImportSource: '@mdx-js/react' // uncomment if you use <MDXProvider>
    }),
    react(),
  ],
})
