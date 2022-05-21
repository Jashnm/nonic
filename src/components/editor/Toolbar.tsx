import React, { ChangeEvent, useRef } from "react";
import { ToolbarButton } from "../core/ToolbarButton";
import { FaBold } from "@react-icons/all-files/fa/FaBold";
import { FaItalic } from "@react-icons/all-files/fa/FaItalic";
import { FaCode } from "@react-icons/all-files/fa/FaCode";
import { FaListOl } from "@react-icons/all-files/fa/FaListOl";
import { FaListUl } from "@react-icons/all-files/fa/FaListUl";
import { FaImage } from "@react-icons/all-files/fa/FaImage";
import { FaHeading } from "@react-icons/all-files/fa/FaHeading";
import { FaImages } from "@react-icons/all-files/fa/FaImages";
import { FaLink } from "@react-icons/all-files/fa/FaLink";

type IToolbarProps = {
  commandController: any;
  textController: any;
};

const Toolbar: React.FC<IToolbarProps> = ({
  commandController,
  textController
}) => {
  const CustomImageButton = () => {
    const uploadImgRef = useRef<HTMLInputElement>(null);
    function uploadImage() {
      if (uploadImgRef.current) {
        uploadImgRef.current.click();
      }
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      await commandController.executeCommand("image");

      const currState = textController.getState();

      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", async function () {
          const result = this.result?.toString();
          if (result) {
            const data = new FormData();
            data.append("file", result);
            data.append(
              "upload_preset",
              process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
            );
            data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_NAME!);
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
              const { start, end } = currState.selection;
              textController.setSelectionRange({ start, end });
              textController.replaceSelection(img.secure_url);
            } catch (error) {
              console.log(error);
            }
          }
        });
        reader.readAsDataURL(file);
      }
    };

    return (
      <>
        <input
          onChange={handleFileChange}
          type="file"
          ref={uploadImgRef}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        <ToolbarButton onClick={uploadImage}>
          <FaImages title="Upload Image" />
        </ToolbarButton>
      </>
    );
  };

  return (
    <div className="btn-group">
      <ToolbarButton
        className="rounded-bl-none"
        onClick={async () => {
          await commandController.executeCommand("bold");
        }}
      >
        <FaBold title="Bold" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("italic");
        }}
      >
        <FaItalic title="Italic" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("code");
        }}
      >
        <FaCode title="Code" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("head1");
        }}
      >
        <FaHeading title="Heading 1" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("head2");
        }}
      >
        <FaHeading title="Heading 2" size={12} />2
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("orderedList");
        }}
      >
        <FaListOl title="Ordered List" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("unorderedList");
        }}
      >
        <FaListUl title="Unordered List" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("link");
        }}
      >
        <FaLink title="Link" />
      </ToolbarButton>
      <ToolbarButton
        onClick={async () => {
          await commandController.executeCommand("image");
        }}
      >
        <FaImage title="Image by URL" />
      </ToolbarButton>
      {process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET && (
        <CustomImageButton />
      )}
    </div>
  );
};

export default Toolbar;
