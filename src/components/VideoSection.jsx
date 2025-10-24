import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Settings, Maximize } from 'lucide-react'

function VideoSection() {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.parentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="py-10 px-4">
      {/* Video Player - Centered with larger width */}
      <div className="max-w-[850px] mx-auto mb-10">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black group">
          {/* Video Element with Sample Video */}
          <video
            ref={videoRef}
            className="w-full aspect-video"
            onClick={togglePlay}
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            playsInline
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Custom Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
            {/* Control Buttons Row */}
            <div className="flex items-center gap-4">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="text-white hover:text-white/80 transition-colors flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" fill="white" />
                ) : (
                  <Play className="w-5 h-5" fill="white" />
                )}
              </button>

              {/* Progress Bar with Scrubber */}
              <div className="flex-1 relative group">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleProgressChange}
                  className="video-progress-slider w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${progress}%, #4b5563 ${progress}%)`,
                  }}
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm font-medium whitespace-nowrap flex-shrink-0">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              {/* Volume Control with Mute Button and Slider */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-5 h-5" strokeWidth={2} />
                  ) : (
                    <Volume2 className="w-5 h-5" strokeWidth={2} />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume * 100}
                  onChange={handleVolumeChange}
                  className="video-volume-slider w-20 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${
                      isMuted ? 0 : volume * 100
                    }%, #4b5563 ${isMuted ? 0 : volume * 100}%)`,
                  }}
                />
              </div>

              {/* Settings Button */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <Settings className="w-5 h-5" strokeWidth={2} />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-[150px] border border-gray-200">
                    <div className="text-gray-700 text-sm space-y-2">
                      <button className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded">
                        Quality: Auto
                      </button>
                      <button className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded">
                        Speed: 1x
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-white/80 transition-colors flex-shrink-0"
              >
                <Maximize className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description Text Below Video - Aligned with content below */}
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-base text-gray-700 leading-relaxed mb-12 max-w-[600px] pl-2">
          Frappe HR is a <span className="font-semibold text-gray-900">100% open source</span>, modern, user-friendly solution to drive excellence within your team. Simplify your HR and Payroll operations with a product crafted as per your needs.
        </p>
      </div>
    </div>
  )
}

export default VideoSection
