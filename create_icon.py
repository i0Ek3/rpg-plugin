from PIL import Image, ImageDraw, ImageFont

# 创建一个基本图标
def create_icon(size, filename):
    image = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)

    # 画一个简单的锁图标
    draw.rectangle([size * 0.2, size * 0.5, size * 0.8, size * 0.9], fill="black")
    draw.rectangle([size * 0.35, size * 0.2, size * 0.65, size * 0.5], fill="black")
    draw.rectangle([size * 0.45, size * 0.05, size * 0.55, size * 0.2], fill="black")

    image.save(filename)

# 生成不同尺寸的图标
create_icon(16, 'icon16.png')
create_icon(48, 'icon48.png')
create_icon(128, 'icon128.png')
