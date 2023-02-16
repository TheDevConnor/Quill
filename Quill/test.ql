# Island Generation Algorithm (IGA) - Quill
# Get the size of the island from user input
have islandSize := input()

# Initialize an empty array for the island
array island []

# Initialize variables
have section := 2
have height := 0
have width := 0

# Loop over the height of the island
for height := 0; height < islandSize; {

	# Loop over the width of the island
	for width := 0; width < islandSize; {

		# Set the default section value to 2
		section := 2

		# Check if the current row is the top or bottom of the island
		if (height = 0) || (height = islandSize - 1) {

			# If the current section is not on the edge, set it to 1
			if (width != 0) || (width != islandSize - 1) {
				section := 1
			}
		}

		# Check if the current section is on the left or right edge of the island
		if (width = 0) || (width = islandSize - 1) {

			# If the current section is on a corner of the island, set it to 0
			if (height = 0) || (height = islandSize - 1) {
				section := 0
			} else {
				section := 1
			}
		}

		# Increment the width counter
		width := width + 1
	}

	# Add the current row of the island to the island array
	info(append(island, section))

	# Increment the height counter
	height := height + 1
}

