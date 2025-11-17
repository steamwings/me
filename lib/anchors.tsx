import Link from 'next/link'

export const generateSlug = (str: string) => {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

export const h3 = ({ node, ...props }) => {
  const slug = generateSlug(props.children[0]);
  return (
    <h3 id={slug} {...props}>
      <Link href={`#${slug}`}>
        {props.children}
      </Link>
    </h3>
  )
}
