import ParticleBackground from "../components/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <div className="relative min-h-screen flex items-center justify-center p-8 z-10">
        <main className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white/90 tracking-tight">
              Hello!
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              I&apos;m a passionate developer creating beautiful digital experiences.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-6 justify-center items-center flex-wrap">
              <a
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 hover:bg-white/20 transition-all duration-300 font-medium text-lg"
                href="#work"
              >
                View Work
              </a>
              <a
                className="px-8 py-4 bg-transparent border border-white/30 rounded-full text-white/80 hover:bg-white/10 hover:text-white/90 transition-all duration-300 font-medium text-lg"
                href="#about"
              >
                About Me
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
