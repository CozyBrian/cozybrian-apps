import type { MDXComponents } from "mdx/types";
// Allows customizing built-in components, e.g. to add styling.
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-cozy-200 mt-6 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-cozy-200 mt-5 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-cozy-200 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-base leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4">{children}</ol>
  ),
  li: ({ children }) => <li className="mb-1 text-cozy-100">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-cozy-500 pl-4 italic text-cozy-400 mb-4 duration-200">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded px-1 py-0.5 font-mono text-sm">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-900 text-cozy-100 p-4 rounded-lg overflow-x-auto text-sm">
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-cozy-400 hover:text-cozy-500">
      {children}
    </a>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
export function getMDXComponents(): MDXComponents {
  return components;
}
