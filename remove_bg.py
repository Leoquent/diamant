from PIL import Image

img = Image.open(r"public\diamantneulogo.png").convert("RGBA")
pixels = img.load()
width, height = img.size

threshold = 230

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        if r > threshold and g > threshold and b > threshold:
            pixels[x, y] = (r, g, b, 0)

img.save(r"src\assets\logo.png")
print(f"Gespeichert: {width}x{height}px")
