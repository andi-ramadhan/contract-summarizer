export default function Button({link, text, classStyle = ''}) {
  return (
    <div>
      <a href={link} className={classStyle}>{text}</a>
    </div>
  );
}