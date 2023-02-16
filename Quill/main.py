# isLandSize = int(input("What is the size of the land? "))

# for height in range(isLandSize):
#     print(height)
#     for length in range(isLandSize):
#         print(length)

islandSize = int(input("Size of island..."))
for height in range(islandSize):
    island = []
    for length in range(islandSize):
        section = 2
        if height == 0 or height == islandSize-1:
            if length != 0 or length != islandSize-1: 
                section = 1
        if length == 0 or length == islandSize-1:
            if height == 0 or height == islandSize-1: 
                section = 0
            else: section = 1
        island.append(section)
    print(island)