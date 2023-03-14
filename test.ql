// func public async calAreaOfTrinangleSSS (a, b, c) {
// 	have area := sqrt((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)) / 4
// 	info("The area of the triangle is: ", area)
// }

// calAreaOfTrinangleSSS(13, 10, 8)

have a := 13
have b := 10
have c := 8

const areaSSS := {
	area: sqrt((a + b + c) * (b + c - a) * (c + a - b) * (a + b - c)) / 4
}

info("The area of the triangle is: ", areaSSS.area)