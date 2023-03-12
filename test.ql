//  An airplane is flying on a compass heading​ (bearing) of 300° at 305 mph. 
//  A wind is blowing with the bearing 290° at 20 mph.
//  ​(a) Find the component form of the velocity of the airplane.
//  ​(b) Find the actual ground speed and direction of the plane.

have planeSpeed = 305
have windsSpeed = 20

have planeBearing = 300
have windBearings = 290

//  First we need to solve the bearing to be an angle
const bearingToAngle := {
	planeAngle: (360 - planeBearing) + 90,
	windsAngle: (360 - windBearings) + 90,
}

//  Now we need to find the vector components of the plane and wind
//  (||v||cosθ, ||v||sinθ)
const getVectorComponents := {
	planeX: planeSpeed * cos(degToRad(bearingToAngle.planeAngle)),
	planeY: planeSpeed * sin(degToRad(bearingToAngle.planeAngle)),
	windsX: windsSpeed * cos(degToRad(bearingToAngle.windsAngle)),
	windsY: windsSpeed * sin(degToRad(bearingToAngle.windsAngle)),
}

have VectorResultForX := getVectorComponents.planeX + getVectorComponents.windsX
have VectorResultForY := getVectorComponents.planeY + getVectorComponents.windsY

//  Now we need to find the magnitude of the vector or the speed
//  ||v|| = √(x^2 + y^2)
have magnitude := sqrt((VectorResultForX * VectorResultForX) + (VectorResultForY * VectorResultForY))

//  Now we need to find the direction of the new vector
//  θ = tan^-1(y/x)
have direction := radToDeg(atan(VectorResultForY / VectorResultForX))

//  We also need to determine the quadrant of the vector
//  The first quadrant is +, +. So we need to check if the x and y are both positive
//  if in the fist quadrant, we do not need to do anything
//  The second quadrant is -, +. So we need to check if the x is negative and the y is positive
//  if in the second quadrant, we need to add 180
//  The third quadrant is -, -. So we need to check if the x and y are both negative
//  if in the third quadrant, we need to add 180
//  The fourth quadrant is +, -. So we need to check if the x is positive and the y is negative
//  if in the fourth quadrant, we need to add 360
if ((VectorResultForX < 0) && (VectorResultForY > 0)) || (VectorResultForX < 0) {
	//  This if statement handles the second, and third quadrants
	direction := direction + 180
} elif (VectorResultForX > 0) && (VectorResultForY < 0) {
	//  This if statement handles the fourth quadrant
	direction := direction + 360
}

//  Now we need to find the bearing of the new vector
//  Which now we would do the opposite of what we did before
//  So instead of adding 90, we need to subtract 90
//  And we need to subtract the direction from 360

have newBearing := 360 - (direction - 90)

//  Now we print out the results
//  trace("The Vector Result for X is: ", VectorResultForX)
//  trace("The Vector Result for Y is: ", VectorResultForY)
//  trace("The new bearing is: ", newBearing)


//  A ship is heading due north at 12 mph. 
//  The current is flowing southwest at 6mph. 
//  Find the actual bearing and speed of the ship.

//  Off the bat we know that the ships vector is <0, 12>
//  And since the current is flowing southwest, we know that
//  the current vector is 6cos(225) and 6sin(225)
//  225 comes from that southwest is exactly 225 degrees

have shipSpeedX = 0
have shipSpeedY = 12

have currentSpeedX = 6 * cos(degToRad(225))
have currentSpeedY = 6 * sin(degToRad(225))

//  Now we need to add the two vectors together to get the new vector
have newVectorX2 = shipSpeedX + currentSpeedX
have newVectorY2 = shipSpeedY + currentSpeedY

//  Now we need to find the magnitude of the vector or the speed
//  ||v|| = √(x^2 + y^2)
have magnitude2 := sqrt((newVectorX2 * newVectorX2) + (newVectorY2 * newVectorY2))

//  Now we need to find the direction of the new vector
//  θ = tan^-1(y/x)
have direction2 := radToDeg(atan(newVectorY2 / newVectorX2))

//  We also need to determine the quadrant of the vector
//  The first quadrant is +, +. So we need to check if the x and y are both positive
//  if in the fist quadrant, we do not need to do anything
//  The second quadrant is -, +. So we need to check if the x is negative and the y is positive
//  if in the second quadrant, we need to add 180
//  The third quadrant is -, -. So we need to check if the x and y are both negative
//  if in the third quadrant, we need to add 180
//  The fourth quadrant is +, -. So we need to check if the x is positive and the y is negative
//  if in the fourth quadrant, we need to add 360
if ((newVectorX2 < 0) && (newVectorY2 > 0)) || (newVectorX2 < 0) {
	//  This if statement handles the second, and third quadrants
	direction2 := direction2 + 180
} elif (newVectorX > 0) && (newVectorY2 < 0) {
	//  This if statement handles the fourth quadrant
	direction2 := direction2 + 360
}

//  Now we need to find the bearing of the new vector
//  Which now we would do the opposite of what we did before
//  So instead of adding 90, we need to subtract 90
//  And we need to subtract the direction from 360
have newBearing2 := 360 - (direction - 90)

//  Now we print out the results
info("The speed or magnitude is:", magnitude2)
info("The new bearing is:", newBearing)

have shipSpeedX := 0;
