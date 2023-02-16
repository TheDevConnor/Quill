# Law of Sines
# angle(A) := 64 side(a) := 16 side(b) := 17 [ We want to find B and determine if there is two triangles ]

# Calculate the angle B
# sin(angle(A)) / side(a) = sin(angle(B)) / side(b) [ we cross multiplied the two sides]
# angle(B) := side(b) * sin(angle(A)) / side(a)
# sin(angle(B)) := asin(17 * sin(64) / 16)
# sin(angle(B)) := 73 

# now we determine if there is two triangles
# if the calculated angle B is greater tehn the given, then there is two triangles
# else there is only one triangle

# So for this example, there is two triangles

# Now lets find the angle C
# angle(A) + angle(B) = Sum - 180 = angle(C)
# 64 + 73 = 137 - 180 = 43

# now let solve for side(c)
# sin(angle(C)) / side(c) = sin(angle(A)) / side(a)
# side(c) := side(a) * sin(angle(C)) / sin(angle(A))
# side(c) := 16 * sin(43) / sin(64)
# side(c) := 12

# Now we have the acute triangle
# Angle A = 64   Side a = 16
# Angle B = 73   Side b = 17
# Angle C = 43   Side c = 12

# Now lets find the obtuse triangle
# 			  Angle A = 64    Side a = 16
# 180 - 73 := Angle B = 107   Side b = 17
# 180 - 171:= Angle C = 9     Side c = 3

# now let solve for side(c)
# sin(angle(C)) / side(c) = sin(angle(A)) / side(a)
# side(c) := side(a) * sin(angle(C)) / sin(angle(A))
# side(c) := 16 * sin(9) / sin(64)
# side(c) := 3

# Define our variables
have A := 64
have a := 16
have b := 17

func calculateTheLawOfSines () {
	# Calculate the angle B
	const CalculateAngle := {
		B: radToDeg(asin(b * sin(degToRad(A)) / a)),
	}

	# Calculate the angle C
	const CalculateAngleC := {
		C: 180 - CalculateAngle[B] - A,
	}

	# Calculate the side c
	const CalculateSideC := {
		c: a * sin(degToRad(CalculateAngleC[C])) / sin(degToRad(A)),
	}

	# now we determine if there is two triangles
	# if the calculated angle B is greater then the given, then there is two triangles
	# else there is only one triangle
	if CalculateAngle[B] > A {
		const CalculateObtuseAngle := {
			ObtuseAngleA: A,
			ObtuseAngleB: 180 - CalculateAngle[B],
			
			ObtuseSideA: a,
			ObtuseSideB: b,
		}

		const CalculateObtuseAngleC := {
			ObtuseAngleC: 180 - (CalculateObtuseAngle[ObtuseAngleB] + CalculateObtuseAngle[ObtuseAngleA]),
		}

		const CalculateObtuseSideC := {
			ObtuseSideC: CalculateObtuseAngle[ObtuseSideA] * sin(degToRad(CalculateObtuseAngleC[ObtuseAngleC])) / sin(degToRad(CalculateObtuseAngle[ObtuseAngleA])),
		}
		# Print out teh results of the calculations
		trace(1, A, CalculateAngle[B], CalculateAngleC[C])
		trace(2, a, b, CalculateSideC[c])
		warn(10, CalculateObtuseAngle[ObtuseAngleA], CalculateObtuseAngle[ObtuseAngleB], CalculateObtuseAngleC[ObtuseAngleC])
		warn(20, CalculateObtuseAngle[ObtuseSideA], CalculateObtuseAngle[ObtuseSideB], CalculateObtuseSideC[ObtuseSideC])
	} else {
		info(1, A, CalculateAngle[B], CalculateAngleC[C])
		info(2, a, b, CalculateSideC[c])
	}
}

calculateTheLawOfSines()

