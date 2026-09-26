# HeroUI v3 Patterns

1. **No `classNames` Support**: In HeroUI v3 (which relies on Tailwind CSS v4), the legacy `classNames` prop (object with slot keys like `base`, `content`, `inputWrapper`) is no longer supported on simple components like `Chip` or `Card`. 
2. **Use `className` Instead**: To style components, use the standard `className` prop as a single string of Tailwind classes.
3. **Compound Components**: Always use dot-notation compound components (e.g., `Card.Header`, `Card.Content`) instead of legacy separate imports (e.g., `CardHeader`, `CardBody`).
4. **Separator**: In HeroUI v3, the component for dividing content is called `Separator`, not `Divider`. Do not import or use `Divider`.
