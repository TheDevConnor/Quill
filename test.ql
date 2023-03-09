# An airplane is flying on a compass heading​ (bearing) of 300° at 305 mph. 
# A wind is blowing with the bearing 290° at 20 mph.
# ​(a) Find the component form of the velocity of the airplane.
# ​(b) Find the actual ground speed and direction of the plane.

have planeSpeed = 305
have windsSpeed = 20

have planeBearing = 300
have windBearings = 290

# First we need to solve the bearing to be an angle
const bearingToAngle := {
	planeAngle: (360 - planeBearing) + 90,
	windsAngle: (360 - windBearings) + 90,
}

# Now we need to find the vector components of the plane and wind
# (||v||cosθ, ||v||sinθ)
const getVectorComponents := {
	planeX: planeSpeed * cos(degToRad(bearingToAngle.planeAngle)),
	planeY: planeSpeed * sin(degToRad(bearingToAngle.planeAngle)),
	windsX: windsSpeed * cos(degToRad(bearingToAngle.windsAngle)),
	windsY: windsSpeed * sin(degToRad(bearingToAngle.windsAngle)),
}

have VectorResultForX := getVectorComponents.planeX + getVectorComponents.windsX
have VectorResultForY := getVectorComponents.planeY + getVectorComponents.windsY

# Now we need to find the magnitude of the vector or the speed
# ||v|| = √(x^2 + y^2)
have magnitude := sqrt((VectorResultForX * VectorResultForX) + (VectorResultForY * VectorResultForY))

# Now we need to find the direction of the new vector
# θ = tan^-1(y/x)
have direction := radToDeg(atan(VectorResultForY / VectorResultForX))

# We also need to determine the quadrant of the vector
# The first quadrant is +, +. So we need to check if the x and y are both positive
# if in the fist quadrant, we do not need to do anything
# The second quadrant is -, +. So we need to check if the x is negative and the y is positive
# if in the second quadrant, we need to add 180
# The third quadrant is -, -. So we need to check if the x and y are both negative
# if in the third quadrant, we need to add 180
# The fourth quadrant is +, -. So we need to check if the x is positive and the y is negative
# if in the fourth quadrant, we need to add 360
if ((VectorResultForX < 0) && (VectorResultForY > 0)) || (VectorResultForX < 0) {
	# This if statement handles the second, and third quadrants
	direction := direction + 180
} elif (VectorResultForX > 0) && (VectorResultForY < 0) {
	# This if statement handles the fourth quadrant
	direction := direction + 360
}

# Now we need to find the bearing of the new vector
# Which now we would do the opposite of what we did before
# So instead of adding 90, we need to subtract 90
# And we need to subtract the direction from 360
have newBearing := 360 - (direction - 90)

# Now we print out the results
trace("The Vector Result for X is: ", VectorResultForX)
trace("The Vector Result for Y is: ", VectorResultForY)
trace("The new bearing is: ", newBearing)