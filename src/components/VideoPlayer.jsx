import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

function VideoPlayer({ src, className = "" }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleError = () => setError(true)

    video.addEventListener('timeupdate', updateTime)
    video.addEventListener('loadedmetadata', updateDuration)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('timeupdate', updateTime)
      video.removeEventListener('loadedmetadata', updateDuration)
      video.removeEventListener('error', handleError)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (e.target.value / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = e.target.value / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      video.requestFullscreen()
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  if (error) {
    return (
      <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
        <div className="w-full aspect-video flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-gray-400 text-lg mb-2">⚠️</div>
            <p className="text-gray-600 text-sm">Unable to load video</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative group bg-black rounded-lg overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        onClick={togglePlay}
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Custom Video Controls - Always visible */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 opacity-100 pointer-events-auto">
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
              className="video-progress-slider w-full h-1.5 bg-gray-500 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #000000 ${progress}%, #6b7280 ${progress}%)`,
              }}
            />
          </div>

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
              className="video-volume-slider w-20 h-1.5 bg-gray-500 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #000000 ${
                  isMuted ? 0 : volume * 100
                }%, #6b7280 ${isMuted ? 0 : volume * 100}%)`,
              }}
            />
          </div>

          {/* Settings Button */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="text-white hover:text-white/80 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="white">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
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
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer

