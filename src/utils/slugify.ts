/**
 * The `slugify` function takes a string input, converts it to lowercase, removes special characters
 * and extra spaces, and replaces spaces with hyphens to create a URL-friendly slug.
 * @param {string} input - The `slugify` function takes a string input and converts it into a slug
 * format. It converts the input string to lowercase, replaces spaces with hyphens, removes any
 * non-alphanumeric characters except hyphens, removes consecutive hyphens, and trims any leading or
 * trailing hyphens
 */
export const slugify = (input: string) =>
  input
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
