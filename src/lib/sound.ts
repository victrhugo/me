const MUTE_STORAGE_KEY = "vh-sound-muted"

function readMuted(): boolean {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(MUTE_STORAGE_KEY) === "1"
}

let muted = readMuted()
const muteListeners = new Set<(muted: boolean) => void>()

export function isMuted() {
  return muted
}

export function setMuted(value: boolean) {
  muted = value
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MUTE_STORAGE_KEY, value ? "1" : "0")
  }
  muteListeners.forEach((listener) => listener(muted))
}

export function toggleMuted() {
  setMuted(!muted)
}

export function subscribeMuted(listener: (muted: boolean) => void) {
  muteListeners.add(listener)
  return () => {
    muteListeners.delete(listener)
  }
}

let audioContext: AudioContext | null = null

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) return null
    audioContext = new AudioContextClass()
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume()
  }

  return audioContext
}

function playTone(frequency: number, duration: number, gain: number, type: OscillatorType = "triangle") {
  if (muted) return

  const ctx = getContext()
  if (!ctx) return

  const oscillator = ctx.createOscillator()
  const gainNode = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.value = frequency

  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(gain, now)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  oscillator.connect(gainNode)
  gainNode.connect(ctx.destination)

  oscillator.start(now)
  oscillator.stop(now + duration)
}

export function playClick() {
  playTone(620, 0.05, 0.14, "triangle")
}

export function playKey() {
  const frequency = 380 + Math.random() * 140
  playTone(frequency, 0.03, 0.09, "triangle")
}

/** A short burst of filtered noise — pen scratching on paper. Used for the handwriting reveal. */
export function playWrite() {
  if (muted) return

  const ctx = getContext()
  if (!ctx) return

  const duration = 0.03 + Math.random() * 0.02

  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration))
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    // Noise with a built-in decay so each grain feels like a single scratch,
    // not a sustained hiss.
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) ** 1.5
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer

  const bandpass = ctx.createBiquadFilter()
  bandpass.type = "bandpass"
  bandpass.frequency.value = 2200 + Math.random() * 3000
  bandpass.Q.value = 0.7

  const gainNode = ctx.createGain()
  const now = ctx.currentTime
  gainNode.gain.setValueAtTime(0.22, now)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  noise.connect(bandpass)
  bandpass.connect(gainNode)
  gainNode.connect(ctx.destination)

  noise.start(now)
  noise.stop(now + duration)
}

/**
 * Browsers only allow audio to start after a real user gesture (click,
 * key press, touch — never hover). Call this on the very first such
 * gesture, anywhere on the page, so the AudioContext is already running
 * by the time a hover-triggered sound tries to play.
 */
export function unlockAudio() {
  getContext()
}
