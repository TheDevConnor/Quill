func main() {
	array running ["game", "tools", "science", "system"]
	have length_of_array := len(running) - 1
	have random_number := floor(random(0, length_of_array))
	info("Hello,",nth(running, random_number),"developer!")
}
main()
