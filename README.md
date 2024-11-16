# Next 14 Template

This is a Next.js 14 template that sets up a bunch of things that I commonly use in my Next.js projects.

> I'll constantly update this as I discover more things I use quite frequently.

Here's what the template comes with:
- Next.js `v14.2.17`
- Tailwind CSS
- Font: Inter
- Shadcn (includes all components and dark mode setup)
- Prettier

Shadcn configuration:
- Theme: New York
- Base Color: Zinc
- CSS Variables: yes

> To learn more about shadcn, visit [shadcn docs](https://ui.shadcn.com/docs/)

---
## Usage

Here's how to use it:

1. Install the dependencies
```bash
npm install
```

2. Run the dev server:
```bash
npm run dev
```

As mentioned above, prettier is also included. Once you're done writing your code, you can run the following command to format it with prettier:

```bash
npm run format
```

---

## Prettier

Prettier helps keep the code formatting in sync across everyone's copies of the project. And it also make your code look better (in my opinion). If you don't wish to use prettier, follow these steps to remove it from the template:

1. Replace the `.eslintrc.json` file's code with the following code:
```js
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```
2. Delete the `.prettierrc` file.
3. Remove the following from the `devDependenices` in the `package.json` file:
```js
"eslint-config-prettier": "^9.1.0"
"eslint-plugin-prettier": "^5.2.1"
"prettier": "3.3.3"
```
4. Run the following command:
```bash
npm install
```

---

Made with ❤️  
by [Charan](https://charan.dev/)