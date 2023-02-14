func async test_case(min_, max_) {
	for have i := min_; i < max_; {
		info(min_, max_, i)

		i := i + 1
	}
}

test_case(0, 10)
