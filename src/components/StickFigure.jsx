import './StickFigure.css'

// Base stick figure component
function StickFigure({ 
  headX = 50, 
  headY = 20, 
  bodyParts = {},
  exerciseType = 'default',
  className = ''
}) {
  const {
    headRadius = 8,
    bodyLength = 30,
    armAngle = 0,
    armLength = 20,
    legAngle = 0,
    legLength = 25,
    leftArmAngle = null,
    rightArmAngle = null,
    leftLegAngle = null,
    rightLegAngle = null,
    bodyAngle = 0,
    headAngle = 0,
    weights = false,
    bench = false,
    box = false,
  } = bodyParts

  // Calculate positions
  const bodyStartX = headX
  const bodyStartY = headY + headRadius
  const bodyEndX = bodyStartX + Math.sin(bodyAngle * Math.PI / 180) * bodyLength
  const bodyEndY = bodyStartY + Math.cos(bodyAngle * Math.PI / 180) * bodyLength

  // Arms
  const leftArmAngleFinal = leftArmAngle !== null ? leftArmAngle : armAngle
  const rightArmAngleFinal = rightArmAngle !== null ? rightArmAngle : -armAngle
  const shoulderX = bodyStartX
  const shoulderY = bodyStartY + 5

  const leftArmEndX = shoulderX + Math.sin((bodyAngle + leftArmAngleFinal) * Math.PI / 180) * armLength
  const leftArmEndY = shoulderY + Math.cos((bodyAngle + leftArmAngleFinal) * Math.PI / 180) * armLength
  const rightArmEndX = shoulderX + Math.sin((bodyAngle + rightArmAngleFinal) * Math.PI / 180) * armLength
  const rightArmEndY = shoulderY + Math.cos((bodyAngle + rightArmAngleFinal) * Math.PI / 180) * armLength

  // Legs
  const leftLegAngleFinal = leftLegAngle !== null ? leftLegAngle : legAngle
  const rightLegAngleFinal = rightLegAngle !== null ? rightLegAngle : -legAngle
  const hipX = bodyEndX
  const hipY = bodyEndY

  const leftLegEndX = hipX + Math.sin((bodyAngle + 180 + leftLegAngleFinal) * Math.PI / 180) * legLength
  const leftLegEndY = hipY + Math.cos((bodyAngle + 180 + leftLegAngleFinal) * Math.PI / 180) * legLength
  const rightLegEndX = hipX + Math.sin((bodyAngle + 180 + rightLegAngleFinal) * Math.PI / 180) * legLength
  const rightLegEndY = hipY + Math.cos((bodyAngle + 180 + rightLegAngleFinal) * Math.PI / 180) * legLength

  return (
    <g className={`stick-figure ${className} ${exerciseType}`}>
      {/* Bench */}
      {bench && (
        <rect x="10" y="75" width="80" height="5" fill="#8B4513" rx="2" />
      )}
      
      {/* Box/Platform */}
      {box && (
        <rect x="30" y="70" width="40" height="10" fill="#A0A0A0" rx="2" />
      )}

      {/* Head */}
      <circle 
        cx={headX} 
        cy={headY} 
        r={headRadius} 
        fill="#333" 
        className="head"
        transform={`rotate(${headAngle} ${headX} ${headY})`}
      />

      {/* Body */}
      <line 
        x1={bodyStartX} 
        y1={bodyStartY} 
        x2={bodyEndX} 
        y2={bodyEndY} 
        stroke="#333" 
        strokeWidth="3" 
        className="body"
      />

      {/* Left Arm */}
      <line 
        x1={shoulderX} 
        y1={shoulderY} 
        x2={leftArmEndX} 
        y2={leftArmEndY} 
        stroke="#333" 
        strokeWidth="2.5" 
        className="arm left-arm"
      />
      {weights && (
        <circle cx={leftArmEndX} cy={leftArmEndY} r="6" fill="#666" className="weight" />
      )}

      {/* Right Arm */}
      <line 
        x1={shoulderX} 
        y1={shoulderY} 
        x2={rightArmEndX} 
        y2={rightArmEndY} 
        stroke="#333" 
        strokeWidth="2.5" 
        className="arm right-arm"
      />
      {weights && (
        <circle cx={rightArmEndX} cy={rightArmEndY} r="6" fill="#666" className="weight" />
      )}

      {/* Left Leg */}
      <line 
        x1={hipX} 
        y1={hipY} 
        x2={leftLegEndX} 
        y2={leftLegEndY} 
        stroke="#333" 
        strokeWidth="3" 
        className="leg left-leg"
      />

      {/* Right Leg */}
      <line 
        x1={hipX} 
        y1={hipY} 
        x2={rightLegEndX} 
        y2={rightLegEndY} 
        stroke="#333" 
        strokeWidth="3" 
        className="leg right-leg"
      />

      {/* Ground line */}
      <line x1="0" y1="100" x2="100" y2="100" stroke="#ccc" strokeWidth="1" strokeDasharray="2,2" />
    </g>
  )
}

export default StickFigure

