import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAFAF8',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: 320,
            fontFamily: 'Georgia, serif',
            color: '#1A1A18',
            lineHeight: 1,
          }}
        >
          ๏
        </span>
      </div>
    ),
    { ...size }
  )
}
