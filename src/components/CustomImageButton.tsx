import React, { ChangeEvent } from "react";

const CustomImageButton = () => {
  const handleCliick = () => {
    // const fileInput = document.getElementById("bro") as HTMLInputElement;
    // console.log(fileInput);
    // if (fileInput) {
    //   fileInput.click();
    // }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("heyyy");

    const file = e.target.files?.[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", async function () {
        const result = this.result?.toString();
        if (result) {
          const data = new FormData();
          data.append("file", result);
          data.append("upload_preset", "nonic-uplo4ds");
          data.append("cloud_name", "zend");
          try {
            const res = await fetch(
              "  https://api.cloudinary.com/v1_1/zend/image/upload",
              {
                method: "post",
                body: data
              }
            );

            const img = await res.json();
            // setCurrentImage(img.secure_url)
          } catch (error) {
            console.log(error);
          }
        }
      });
      reader.readAsDataURL(file);
    }
  };
  return (
    <label onClick={handleCliick}>
      🌱
      <input
        onChange={handleFileChange}
        type="file"
        id="bro"
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
      />
    </label>
  );
};

export default CustomImageButton;
