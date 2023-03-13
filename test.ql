array primes []
have prime := false
have num := 0

for have PossablePrimes := 2; PossablePrimes < 10; {
	prime := true
	for num := 2; num < PossablePrimes; {
		if PossablePrimes % num == 0{
			prime := false
		}
		num := num + 1
	}

	if (prime) {
		info(append(primes, PossablePrimes))
	}

	PossablePrimes := PossablePrimes + 1
}