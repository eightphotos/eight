import Image from 'next/image';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <Image 
        src="/images/bg3.jpg"
        alt="Background image"
        fill
        className="object-cover"
        priority
      />
    </div>
  )
}
