from PIL import PngImagePlugin, Image
import os

input_path = "courses/css467/secRet/b.png"
output_path = "courses/secRet/thisflag_with_flag.png"
flag_text = "KMUTTCTF{d13ae0d9f9a0aa831ef77b59e2251065}"

if not os.path.exists(input_path):
    print("[ERROR] ไม่พบไฟล์:", input_path)
else:
    try:
        img = Image.open(input_path)

        metadata = PngImagePlugin.PngInfo()
        metadata.add_text("Description", flag_text)

        img.save(output_path, "PNG", pnginfo=metadata)
        print("[OK] บันทึกสำเร็จ:", output_path)

        img_check = Image.open(output_path)
        hidden_flag = img_check.info.get("Description")
        if hidden_flag:
            print("Flag ที่ฝังไว้:", hidden_flag)
        else:
            print("[WARNING] ไม่พบ flag ใน metadata")
    except Exception as e:
        print("[ERROR] เกิดข้อผิดพลาด:", e)
