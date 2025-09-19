export default function Figure({
  src, alt, caption,
}: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <img src={src} alt={alt} loading="lazy" decoding="async" className="rounded-xl shadow" />
      {caption && <figcaption className="text-sm text-gray-500 mt-2">{caption}</figcaption>}
    </figure>
  )
}
