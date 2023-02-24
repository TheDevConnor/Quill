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

func async calculateTheLawOfSines (A, a, b) {
	# Calculate the angle B
	const CalculateAngle := {
		B: radToDeg(asin(b * sin(degToRad(A)) / a)),
	}

	# Calculate the angle C
	const CalculateAngleC := {
		C: 180 - (CalculateAngle[B] + A),
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
		# Print out the results of the calculations
		info("Acute Triangle Degeers", A, CalculateAngle[B], CalculateAngleC[C])
		info("Acute Triangle Sides",a, b, CalculateSideC[c])
		info("Obtuse Triangle Degeers",CalculateObtuseAngle[ObtuseAngleA], CalculateObtuseAngle[ObtuseAngleB], CalculateObtuseAngleC[ObtuseAngleC])
		info("Acute Triangle Sides", CalculateObtuseAngle[ObtuseSideA], CalculateObtuseAngle[ObtuseSideB], CalculateObtuseSideC[ObtuseSideC])
	} else {
		info("Acute Triangle Degeers", A, CalculateAngle[B], CalculateAngleC[C])
		info("Acute Triangle Sides", a, b, CalculateSideC[c])
	}
}

# calculateTheLawOfSines(64, 16, 17)

# Law of Cosines for SAS
# Off the bat we know that we will only have one triangle. 
#This is because we have two sides and one angle.
# We will use the Law of Cosines to find the missing angle and side

# The law of cosins formula is as follows
# a^2 = b^2 + c^2 - 2(b)(c)(cos(A))
# b^2 = a^2 + c^2 - 2(a)(c)(cos(B))
# c^2 = a^2 + b^2 - 2(a)(b)(cos(C))

# so lets say that we are given the the following values
# side(a) := 11 side(b) := 5 angle(C) := 20

# the first thing we need to do is calculate the side c
# c^2 = a^2 + b^2 - 2(a)(b)(cos(C))
# c^2 = 11^2 + 5^2 - 2(11)(5)(cos(20))
# c^2 = 121 + 25 - 2(55)(cos(20))
# c^2 = 121 + 25 - 110(cos(20))
# c^2 = 146 - 110(cos(20))
# c = sqrt(146 - 110(cos(20)))
# c = approx 6.529

# now that we have the side c, we can calculate the angle B
# b^2 = a^2 + c^2 - 2(a)(c)(cos(B))
# 5^2 = 11^2 + 6.529^2 - 2(11)(6.529)(cos(B))
# 25 = 121 + 42.627 - 2(11)(6.529)(cos(B))
# 25 = 163.627 - 145.638(cos(B))
# 25 - 163.627 = -145.638(cos(B))
# -138.627 = -145.638(cos(B))
# 138.627 = 145.638(cos(B))
# 138.627 / 145.638 = cos(B)
# acos(138.627 / 145.638) = B
# cosB = approx 15.179

# now that we have the angle B, we can calculate the angle A
# A = 180 - (B + C)
# A = 180 - (15.179 + 20)
# A = 180 - 35.179
# A = 144.821

# now we can print out the results
# A = 144.821   a = 11
# B = 15.179    b = 5
# C = 20        c = 6.529

func async calculateTheLawOFCosineForSAS (a, b, C){
	# Calculate the side c
	const CalculateSideC := {
		c: sqrt(pow(a, 2) + pow(b, 2) - 2 * a * b * cos(degToRad(C))),
	}

	# Calculate the angle B
	const CalculateAngleB := {
		B: radToDeg(asin(b * sin(degToRad(C)) / CalculateSideC[c])),
	}

	# Calculate the angle A
	const CalculateAngleA := {                                                                                                                                                                                                                                                          
		A: 180 - (CalculateAngleB[B] + C),
	}

	# Print out the results of the calculations
	trace(CalculateAngleA[A], CalculateAngleB[B], C)
	trace(a, b, CalculateSideC[c])
}

# calculateTheLawOFCosineForSAS(7, 5, 98.6)

# Law of Cosines for SSS
# So in order to tell if we have an actual triangle, we need find the sum of 
# any two sides and compare it to the third side. If the sum of any two sides
# is greater than the third side, then we have a triangle. If not, then we do not.

# So lets say that we are given the following values
# side(a) := 9 side(b) := 7 side(c) := 6

# 9 + 7 > 6
# 16 > 6
# true so we have a triangle

# Now that we know that we have a triangle, we can use the Law of Cosines to find the missing angles
# which follow the same formula as the SAS example
# just instead of using any angles we are trying to find the angles to complete the triangle

func async calculateTheLawOFCosineForSSS (a, b, c){
	# an if statement to check if we have a triangle
	if (a + b > c) && (a + c > b) && (b + c > a) {
		# Calculate the angle A
		const CalculateAngleA := {
			A: radToDeg(acos((pow(b, 2) + pow(c, 2) - pow(a, 2)) / (2 * b * c))),
		}

		# Calculate the angle B
		const CalculateAngleB := {
			B: radToDeg(acos((pow(a, 2) + pow(c, 2) - pow(b, 2)) / (2 * a * c))),
		}

		# Calculate the angle C
		const CalculateAngleC := {
			C: 180 - (CalculateAngleA[A] + CalculateAngleB[B]),
		}

		# Print out the results of the calculations
		trace(CalculateAngleA[A], CalculateAngleB[B], CalculateAngleC[C])
		trace(a, b, c)
		} else {
		trace(1)
	}
}

# calculateTheLawOFCosineForSSS(9, 7, 6)

# find the area of a triangle that is SAS
# The area of a triangle is given by the following formula
# area = 1/2 * a * b * sin(C)
# area = 1/2 * a * c * sin(B)
# area = 1/2 * b * c * sin(A)

# So lets say that we are given the following values
# side(b) := 32 side(c) := 19 angle(A) := 47
# for this example we would want to use the formula for the area of a triangle that has sin(A)

# area = 1/2 * b * c * sin(A)
# area = 1/2 * 32 * 19 * sin(47)
# area = 1/2 * 608 * sin(47)
# area = 304 * sin(47)
# area = 222.33152529

func async calculateTheAreaOfATriangleSAS (a, b, C){
	# Calculate the area
	const CalculateArea := {
		area: (a * b * sin(degToRad(C))) / 2,
	}

	# Print out the results of the calculations
	trace(CalculateArea[area])
	trace(a, b, C)
}

# calculateTheAreaOfATriangleSAS(19, 32, 47)

# find the area of a triangle that is SSS using Heron's Formula
# The area of a triangle is given by the following formula
# area = sqrt(s * (s - a) * (s - b) * (s - c))
# where s = (a + b + c) / 2

# So lets say that we are given the following values
# side(a) := 13 side(b) := 10 side(c) := 8

# lets calculate s
# s = (13 + 10 + 8) / 2
# s = 31 / 2
# s = 15.5

# Since we know s we can now calculate the area using Heron's Formula
# area = sqrt(s * (s - a) * (s - b) * (s - c))
# area = sqrt(15.5 * (15.5 - 13) * (15.5 - 10) * (15.5 - 8))
# area = sqrt(15.5 * 2.5 * 5.5 * 7.5)
# area = 39.98046397929869

func async calculateTheAreaOfATriangleSSS (a, b, c){
	# Calculate the area
	const CalculateArea := {
		area: sqrt((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)) / 4,
	}

	# Print out the results of the calculations
	info(CalculateArea[area])
	info(a, b, c)
}

# calculateTheAreaOfATriangleSSS(13, 10, 8)

# Fizz buzz example in a while loop
func async fizzBuzz (){
	while true {
		# print out the numbers 1 to 100
		for have i := 1; i <= 51; {
			# if the number is divisible by 3 and 5 then print out fizz buzz
			if (i % 3 = 0) && (i % 5 = 0) {
				info("fizz buzz")
			# if the number is divisible by 3 then print out fizz
			} if i % 3 = 0 {
				info("fizz")
			# if the number is divisible by 5 then print out buzz
			} elif i % 5 = 0 {
				info("buzz")
			# if the number is not divisible by 3 or 5 then print out the number
			} else {
				info(i)
			}
		
			# increment the counter
			i := i + 1
		}

		# break out of the loop
		break()
	}
}

# fizzBuzz()

# 45.8

# import math from "math"

const math := {
	x: 1, 
	y: "string of x",
	z: 3,

	complex: {
		a: 4,
		b: 5,
		c: 6,
	},
}

# info("y: ", math[y])
# info("x: ", math[x])
# info("z: ", math[z])
# info("complex: ", math[complex][a])

have string := "hello world"
string.len()

