import waveBackground from "@/presentation/assets/wave.svg"

export const WaveBackgroundComponent = () => {
  return (
    <div className="pointer-events-none absolute top-8 z-0 w-full md:top-16 lg:top-20 xl:top-24">
      <img
        src={waveBackground}
        alt=""
        className="h-full w-full object-contain"
        aria-hidden
      />
    </div>
  )
}
